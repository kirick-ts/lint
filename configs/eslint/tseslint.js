import tseslint from 'typescript-eslint';

export const configTsEslint = [
	...tseslint.configs.recommended,
	{
		files: ['**/*.ts'],
		rules: {
			'@typescript-eslint/max-params': ['warn', { max: 4 }],
			'@typescript-eslint/no-invalid-this': 'error',
			'@typescript-eslint/prefer-nullish-coalescing': 'off', // high cost to run
		},
	},
	// disable type-aware linting on JS files
	{
		files: ['**/*.js'],
		rules: tseslint.configs.disableTypeChecked.rules,
	},
];
