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
			'vue/html-closing-bracket-newline': 'off',
			'vue/html-closing-bracket-spacing': 'off',
			'vue/html-indent': 'off',
			'vue/html-quotes': 'off',
			'vue/html-self-closing': 'off',
			'vue/max-attributes-per-line': 'off',
			'vue/multiline-html-element-content-newline': 'off',
			'vue/no-multi-spaces': 'off',
			'vue/no-spaces-around-equal-signs-in-attribute': 'off',
			'vue/mustache-interpolation-spacing': 'off',
			'vue/prop-name-casing': ['error', 'snake_case'],
			'vue/singleline-html-element-content-newline': 'off',
			// Priority C: Recommended
			'vue/attributes-order': 'warn',
			'vue/block-order': [
				'error',
				{
					order: ['template', 'script', 'style'],
				},
			],
			// Uncategorized
			'vue/block-lang': [
				'error',
				{
					script: {
						lang: 'ts',
					},
				},
			],
			'vue/component-api-style': ['error', ['script-setup']],
			'vue/define-emits-declaration': ['error', 'type-based'],
			'vue/define-props-declaration': ['error', 'type-based'],
			'vue/next-tick-style': ['error', 'promise'],
		},
	},
	// external rules
	{
		files: ['**/*.vue'],
		rules: {
			// import components alongside with named exports
			'unicorn/no-named-default': 'off',
		},
	},
];
