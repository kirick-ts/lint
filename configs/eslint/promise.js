/// <reference types="./eslint-plugin-promise" />

import pluginPromise from 'eslint-plugin-promise';

export const configPromise = [
	pluginPromise.configs['flat/recommended'],
	{
		files: ['**/*.{,m,c}ts'],
		rules: {
			'promise/no-return-in-finally': 'error',
		},
	},
];
