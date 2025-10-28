import pluginUnicorn from 'eslint-plugin-unicorn';

export const configUnicorn = [
	pluginUnicorn.configs.recommended,
	{
		rules: {
			'unicorn/prefer-ternary': 'off',
			'unicorn/prevent-abbreviations': 'off',
		},
	},
];
