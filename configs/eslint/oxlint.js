export const configOxlint = [
	// eslint
	{
		rules: {
			'class-methods-use-this': 'off',
			'default-case': 'off',
			'for-direction': 'off',
			'no-alert': 'off',
			'no-async-promise-executor': 'off',
			'no-await-in-loop': 'off',
			'no-bitwise': 'off',
			'no-caller': 'off',
			'no-console': 'off',
			'no-constant-condition': 'off',
			'no-empty-function': 'off',
			'no-fallthrough': 'off',
			'no-restricted-globals': 'off',
			'no-restricted-properties': 'off',
			'no-restricted-syntax': 'off',
			'no-unused-vars': 'off',
			'no-useless-call': 'off',
		},
	},
	// promise
	{
		rules: {
			'promise/always-return': 'off',
			'promise/no-nesting': 'off',
		},
	},
	// tseslint
	{
		rules: {
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-floating-promises': 'off', // FIXME: wait for oxlint to enable type-aware linting by default
			'@typescript-eslint/no-misused-promises': 'off', // FIXME: wait for oxlint to enable type-aware linting by default
			'@typescript-eslint/no-restricted-types': 'off',
			'@typescript-eslint/no-unnecessary-type-assertion': 'off', // FIXME: wait for oxlint to enable type-aware linting by default
			'@typescript-eslint/no-unsafe-function-type': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-wrapper-object-types': 'off',
		},
	},
	// unicorn
	{
		rules: {
			'unicorn/no-empty-file': 'off',
			'unicorn/no-nested-ternary': 'off',
			'unicorn/prefer-array-find': 'off',
			'unicorn/prefer-set-has': 'off',
			'unicorn/prefer-top-level-await': 'off',
		},
	},
];
