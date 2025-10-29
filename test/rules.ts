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

const github_response = await fetch(
	`https://api.github.com/repos/oxc-project/oxc/git/trees/oxlint_v1.24.0?recursive=1`,
	{
		headers: {
			Authorization:
				typeof process.env.GITHUB_TOKEN === 'string'
					? `Bearer ${process.env.GITHUB_TOKEN}`
					: '',
		},
		cache: 'force-cache',
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
				if (path.startsWith(GITHUB_FILE_PREFIX) && path.endsWith('.rs')) {
					rules.add(
						path.slice(GITHUB_FILE_PREFIX.length, -3).replaceAll('_', '-'),
					);
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
		// v.transform((value) =>
		// 	value.filter(({ rule }) => rules_supported.has(ruleToOxlint(rule))),
		// ),
		v.transform((value) =>
			show_all
				? value
				: value.filter(
						({ oxlint_rule }) =>
							rules_supported.has(oxlint_rule) !== show_unsupported,
					),
		),
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

for (const element of rules) {
	// oxlint-disable-next-line no-console
	console.log(
		SEVERITY_CODE[element.severity],
		rules_supported.has(element.oxlint_rule)
			? `\u001B]8;;https://oxc.rs/docs/guide/usage/linter/rules/${element.oxlint_rule}.html\u0007(link)\u001B]8;;\u0007`
			: 'unsup!',
		element.oxlint_rule,
		element.params ? JSON.stringify(element.params) : '',
	);
}

const message_parts = [`\n${rules.length}`];
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

// oxlint-disable-next-line no-console
console.log(message_parts.join(' '));
