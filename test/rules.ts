// oxlint-disable no-console

import fs from 'node:fs';
import { $ } from 'bun';
import * as v from 'valibot';

const GITHUB_FILE_PREFIX = 'crates/oxc_linter/src/rules/';
const SEVERITY_CODE = [
	null,
	'\u001B[1m\u001B[37m\u001B[43m WARN \u001B[0m',
	'\u001B[1m\u001B[37m\u001B[41m ERR  \u001B[0m',
];

const filter = process.argv[2]?.startsWith('--') ? undefined : process.argv[2];
const show_all = process.argv.includes('--all');
const show_unsupported = process.argv.includes('--unsupported');

const version = JSON.parse(fs.readFileSync('./package.json', 'utf8'))
	.peerDependencies.oxlint;
const github_response = await fetch(
	`https://api.github.com/repos/oxc-project/oxc/git/trees/oxlint_v${version}?recursive=1`,
	{
		headers: {
			Authorization:
				typeof process.env.GITHUB_TOKEN === 'string'
					? `Bearer ${process.env.GITHUB_TOKEN}`
					: '',
		},
		// cache: 'force-cache',
	},
);

const rules_supported = v.parse(
	v.pipe(
		v.object({
			tree: v.array(
				v.pipe(
					v.object({
						path: v.string(),
					}),
				),
			),
		}),
		v.transform((value) => {
			const rules = new Set<string>();

			for (const { path } of value.tree) {
				if (
					path.startsWith(GITHUB_FILE_PREFIX)
					&& (path.endsWith('.rs') || path.endsWith('/mod.rs'))
				) {
					const [namespace, rule] = path
						.slice(GITHUB_FILE_PREFIX.length)
						.replace(/\.rs$/u, '')
						.replaceAll('_', '-')
						.split('/');

					rules.add(`${namespace}/${rule}`);
				}
			}

			return rules;
		}),
	),
	await github_response.json(),
);

// console.log(rules_supported);

function ruleToOxlint(rule: string): string {
	if (rule.includes('/') !== true) {
		return `eslint/${rule}`;
	}

	if (rule.startsWith('@typescript-eslint/')) {
		return rule.replace('@typescript-eslint/', 'typescript/');
	}

	if (rule.startsWith('n/')) {
		return rule.replace('n/', 'node/');
	}

	return rule;
}

const rules = v.parse(
	v.pipe(
		v.object({
			rules: v.record(
				v.string(),
				v.tuple([v.picklist([0, 1, 2]), v.optional(v.unknown())]),
			),
		}),
		v.transform((value) => value.rules),
		v.transform((value) =>
			Object.entries(value)
				.map(([rule, [severity, params]]) => {
					const oxlint_rule = ruleToOxlint(rule);
					return {
						severity,
						rule,
						oxlint_rule,
						params,
					};
				})
				.sort((a, b) => a.oxlint_rule.localeCompare(b.oxlint_rule)),
		),
		v.transform((value) => value.filter(({ severity }) => severity !== 0)),
		v.transform((value) => {
			if (typeof filter === 'string') {
				return value.filter(({ oxlint_rule }) =>
					oxlint_rule.startsWith(`${filter}/`),
				);
			}

			return value;
		}),
	),
	await $`bunx eslint --print-config ${import.meta.file}`.json(),
);

let counter = 0;
const unsupported_rules_by_categories = new Map<string, number>();
for (const rule of rules) {
	const category = rule.oxlint_rule.split('/')[0];
	if (!unsupported_rules_by_categories.has(category)) {
		unsupported_rules_by_categories.set(category, 0);
	}

	if (rules_supported.has(rule.oxlint_rule) !== true) {
		unsupported_rules_by_categories.set(
			category,
			(unsupported_rules_by_categories.get(category) ?? 0) + 1,
		);
	}

	if (show_all || rules_supported.has(rule.oxlint_rule) !== show_unsupported) {
		counter++;
		console.log(
			SEVERITY_CODE[rule.severity],
			rules_supported.has(rule.oxlint_rule)
				? `\u001B]8;;https://oxc.rs/docs/guide/usage/linter/rules/${rule.oxlint_rule}.html\u0007(link)\u001B]8;;\u0007`
				: 'unsup!',
			rule.oxlint_rule,
			rule.params ? JSON.stringify(rule.params) : '',
		);
	}
}

const message_parts = [`\n${counter}`];
if (typeof filter === 'string') {
	message_parts.push(`"${filter}"`);
}

message_parts.push('rules');

if (show_all) {
	message_parts.push('exists.');
} else {
	message_parts.push('can');

	if (show_unsupported) {
		message_parts.push('NOT');
	}

	message_parts.push('be ported to oxlint.');
}

console.log(message_parts.join(' '));
console.log();

console.log('Number of non-supported ESLint rules by category:');
console.table(
	Object.fromEntries(
		[...unsupported_rules_by_categories.entries()].toSorted(
			(a, b) => b[1] - a[1],
		),
	),
);
