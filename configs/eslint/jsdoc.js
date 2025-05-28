import pluginJsdoc from 'eslint-plugin-jsdoc';

export const configJsdoc = [
	pluginJsdoc.configs['flat/recommended-typescript'],
	{
		rules: {
			'jsdoc/check-tag-names': 'error',
			'jsdoc/require-jsdoc': 'error',
		},
	},
	// typescript
	// {
	// 	files: ['**/*.ts'],
	// 	rules: {
	// 		'jsdoc/require-param-type': 'off',
	// 		'jsdoc/require-returns-type': 'off',
	// 	},
	// },
	// exceptions
	{
		files: ['test/', '**/*.test.*'],
		rules: {
			'jsdoc/require-jsdoc': 'warn',
		},
	},
];
