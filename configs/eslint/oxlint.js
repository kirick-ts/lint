export const configOxlint = [
	// eslint
	{
		rules: {
			'for-direction': 'off',
			'no-async-promise-executor': 'off',
			'no-await-in-loop': 'off',
			'no-caller': 'off',
			'no-console': 'off',
			'no-unused-vars': 'off',
		},
	},
	// unicorn
	{
		rules: {},
	},
	// tseslint
	{
		rules: {
			'@typescript-eslint/no-unused-vars': 'off',
		},
	},
];
