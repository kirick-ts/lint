// @ts-expect-error No declaration given.
import pluginPromise from 'eslint-plugin-promise';

export const configPromise = [
	pluginPromise.configs['flat/recommended'],
	{
		files: ['**/*.ts'],
		rules: {
			'promise/no-return-in-finally': 'error',
		},
	},
];
