import pluginUnicorn from 'eslint-plugin-unicorn';

export const configUnicorn = [
	pluginUnicorn.configs.recommended,
	{
		rules: {
			'unicorn/better-dom-traversing': 'off', // Reason: dear diary, I have not enough words to describe stupidity of these suggested fixes...
			'unicorn/consistent-class-member-order': 'off', // Reason: If you want to be enforced to use specific order of code members, use Pascal
			'unicorn/name-replacements': 'off', // Reason: I know better how i want to name my variables.
			'unicorn/no-break-in-nested-loop': 'off', // Reason: breaks are ok, even inside nested loops
			'unicorn/no-computed-property-existence-check': 'off', // Reason: I use `in` operator to narrow type. `Object.hasOwn()` returns just boolean and does not narrow type, so it can not be used as a replacement.
			'unicorn/no-global-object-property-assignment': 'off', // Handled by TypeScript.
			'unicorn/no-top-level-assignment-in-function': 'off', // Reason: oh my god, what if I WANT to create shared state, mhm?
			'unicorn/no-top-level-side-effects': 'off', // Reason: I want to use top-level side effects. It does not hurt.
			'unicorn/no-unreadable-for-of-expression': 'off', // Reason: Wasting time naming extra variables takes more time than reading the code.
			'unicorn/no-useless-recursion': 'off', // Reason: I love to use recursions with async functions. Change my mind
			'unicorn/prefer-await': 'off', // Reason: Some calls should not be awaited to avoid errors leaking to the current stack.
			'unicorn/prefer-continue': ['warn', { maximumStatements: 5 }], // Reason: the same as "prefer-early-return".
			'unicorn/prefer-early-return': ['warn', { maximumStatements: 5 }], // Reason: It is much clearer to stay in paradigm "if A, then do B" instead of "If not A, exit early; do B". However, long conditionals are hard to read and should be flagged by this rule.
			'unicorn/prefer-observer-apis': 'off', // Reason: Observer APIs are good, but listen to "resize" looks more readable.
			'unicorn/prefer-simple-condition-first': 'off', // Reason: It hurts DX much more than it helps with runtime performance.
		},
	},
];
