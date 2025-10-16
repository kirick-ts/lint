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
			'no-unused-vars': 'off',
			'no-useless-call': 'off',
		},
	},
	// unicorn
	{
		rules: {
			'unicorn/no-empty-file': 'off',
			'unicorn/prefer-array-find': 'off',
			'unicorn/prefer-set-has': 'off',
		},
	},
	// tseslint
	{
		rules: {
			'@typescript-eslint/no-unused-vars': 'off',
		},
	},
];
