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
			// Priority B: Strongly Recommended
			'vue/component-definition-name-casing': ['error', 'kebab-case'],
			'vue/first-attribute-linebreak': 'off',
			'vue/html-closing-bracket-spacing': 'off',
			'vue/html-indent': 'off',
			'vue/html-quotes': 'off',
			'vue/html-self-closing': 'off',
			'vue/max-attributes-per-line': 'off',
			'vue/multiline-html-element-content-newline': 'off',
			'vue/prop-name-casing': ['error', 'snake_case'],
			'vue/singleline-html-element-content-newline': 'off',
		},
	},
];
