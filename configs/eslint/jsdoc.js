import pluginJsdoc from 'eslint-plugin-jsdoc';

export const configJsdoc = [
	pluginJsdoc.configs['flat/recommended-typescript'],
	{
		rules: {
			'jsdoc/check-param-names': 'error',
			'jsdoc/check-tag-names': 'error',
			'jsdoc/require-jsdoc': 'error',
		},
	},
	// javascript
	{
		files: ['**/*.{,m,c}js'],
		rules: {
			'jsdoc/no-types': 'off',
		},
	},
	// typescript
	{
		files: ['**/*.{,m,c}ts'],
		rules: {
			'jsdoc/no-types': 'warn',
			// 'jsdoc/require-param-type': 'off',
			// 'jsdoc/require-returns-type': 'off',
			'jsdoc/require-yields-type': 'off',
		},
	},
	// exceptions
	{
		files: ['test/', '**/*.test.*'],
		rules: {
			'jsdoc/require-jsdoc': 'warn',
		},
	},
];
