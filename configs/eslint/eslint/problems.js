export const configEslintProblems = [
	{
		rules: {
			'array-callback-return': [
				'error',
				{
					allowImplicit: true,
				},
			],
			'constructor-super': 'error',
			'for-direction': 'error', // Oxlint
			'getter-return': 'error',
			'no-async-promise-executor': 'error', // Oxlint
			'no-await-in-loop': 'error',
			'no-class-assign': 'error',
			'no-compare-neg-zero': 'error',
			'no-cond-assign': 'error',
			'no-const-assign': 'error',
			'no-constant-binary-expression': 'error',
			'no-constant-condition': 'error',
			'no-constructor-return': 'error',
			'no-control-regex': 'error',
			'no-debugger': 'error',
			'no-dupe-args': 'error',
			'no-dupe-class-members': 'error',
			'no-dupe-else-if': 'error',
			'no-dupe-keys': 'error',
			'no-duplicate-case': 'error',
			'no-duplicate-imports': 'error',
			'no-empty-character-class': 'error',
			'no-empty-pattern': 'error',
			'no-ex-assign': 'error',
			'no-fallthrough': 'error',
			'no-func-assign': 'error',
			'no-import-assign': 'error',
			'no-inner-declarations': 'error',
			'no-invalid-regexp': 'error',
			'no-irregular-whitespace': 'error',
			'no-loss-of-precision': 'error',
			'no-misleading-character-class': 'error',
			'no-new-native-nonconstructor': 'error',
			'no-obj-calls': 'error',
			'no-promise-executor-return': 'error',
			'no-prototype-builtins': 'error',
			'no-self-assign': [
				'error',
				{
					props: true,
				},
			],
			'no-self-compare': 'error',
			'no-setter-return': 'error',
			'no-sparse-arrays': 'error',
			'no-template-curly-in-string': 'error',
			'no-this-before-super': 'error',
			// 'no-undef': 'off', // handled by TypeScript
			'no-unexpected-multiline': 'error',
			'no-unmodified-loop-condition': 'error',
			'no-unreachable': 'error',
			'no-unreachable-loop': 'error',
			'no-unsafe-finally': 'error',
			'no-unsafe-negation': [
				'error',
				{
					enforceForOrderingRelations: true,
				},
			],
			'no-unsafe-optional-chaining': [
				'error',
				{
					disallowArithmeticOperators: true,
				},
			],
			'no-unused-private-class-members': 'warn',
			'no-unused-vars': 'warn', // Oxlint
			// 'no-use-before-define': 'off', // ???
			'no-useless-assignment': 'warn',
			'no-useless-backreference': 'error',
			'require-atomic-updates': 'error',
			'use-isnan': 'error',
			'valid-typeof': [
				'error',
				{
					requireStringLiterals: false,
				},
			],
		},
	},
];
