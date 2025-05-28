import pluginVue from 'eslint-plugin-vue';

export const configVue = [
	...pluginVue.configs['flat/recommended'],
	{
		files: ['**/*.vue'],
		languageOptions: {
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
		},
		rules: {
			'no-useless-assignment': 'off',
			'vue/component-definition-name-casing': ['error', 'kebab-case'],
			'vue/html-indent': ['error', 'tab'],
			'vue/html-self-closing': 'off',
			'vue/max-attributes-per-line': [
				'error',
				{
					singleline: {
						max: 2,
					},
					multiline: {
						max: 1,
					},
				},
			],
		},
	},
];
