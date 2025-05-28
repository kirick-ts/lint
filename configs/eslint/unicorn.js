import pluginUnicorn from 'eslint-plugin-unicorn';

export const configUnicorn = [
	pluginUnicorn.configs.recommended,
	{
		rules: {
			'unicorn/no-anonymous-default-export': 'off',
			'unicorn/no-null': 'off',
			'unicorn/numeric-separators-style': [
				'warn',
				{
					onlyIfContainsSeparator: true,
				},
			],
			'unicorn/prefer-ternary': 'off',
			'unicorn/prevent-abbreviations': 'off',
			'unicorn/switch-case-braces': ['warn', 'avoid'],
		},
	},
	{
		files: ['**/*.ts'],
		rules: {
			'unicorn/no-useless-undefined': 'off',
		},
	},
];
