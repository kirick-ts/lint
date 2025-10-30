import { parser, plugin } from 'typescript-eslint';

export const configTsEslint = [
	{
		languageOptions: { parser },
		plugins: { ts: plugin },
	},
];
