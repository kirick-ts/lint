export const configEslintSuggestions = [
	{
		rules: {
			'accessor-pairs': [
				'error',
				{
					enforceForClassMembers: true,
				},
			],
			'arrow-body-style': [
				'error',
				'as-needed',
				{
					requireReturnForObjectLiteral: true,
				},
			],
			'block-scoped-var': 'error',
			// 'camelcase': 'off',
			// 'capitalized-comments': 'off',
			'class-methods-use-this': 'warn',
			complexity: 'warn',
			// 'consistent-return': 'off',
			// 'consistent-this': 'off',
			curly: 'error',
			'default-case': 'error',
			'default-case-last': 'error',
			'default-param-last': 'error',
			'dot-notation': 'error',
			eqeqeq: 'error',
			'func-name-matching': [
				'error',
				{
					considerPropertyDescriptor: true,
				},
			],
			'func-names': ['error', 'never'],
			'func-style': [
				'error',
				'declaration',
				// {
				// 	allowArrowFunctions: true,
				// },
			],
			'grouped-accessor-pairs': ['error', 'getBeforeSet'],
			'guard-for-in': 'error',
			// 'id-denylist': 'off',
			// 'id-length': 'off',
			// 'id-match': 'off',
			// 'init-declarations': 'off',
			'logical-assignment-operators': [
				'error',
				'always',
				{
					enforceForIfStatements: true,
				},
			],
			// 'max-classes-per-file': 'off',
			'max-depth': 'warn',
			'max-lines': [
				'warn',
				{
					max: 300,
					skipBlankLines: true,
					skipComments: true,
				},
			],
			'max-lines-per-function': [
				'warn',
				{
					max: 100,
					skipBlankLines: true,
					skipComments: true,
					IIFEs: true,
				},
			],
			'max-nested-callbacks': ['error', 4],
			'max-params': [
				'warn',
				{
					max: 4,
				},
			],
			'max-statements': ['warn', 35],
			'new-cap': [
				'error',
				{
					newIsCap: true,
					capIsNew: true,
					properties: false,
				},
			],
			'no-alert': 'error',
			'no-array-constructor': 'error',
			'no-bitwise': 'error',
			'no-caller': 'error',
			'no-case-declarations': 'error',
			'no-console': 'warn',
			// 'no-continue': 'off',
			'no-delete-var': 'error',
			// 'no-div-regex': 'off',
			'no-else-return': [
				'error',
				{
					allowElseIf: false,
				},
			],
			'no-empty': [
				'error',
				{
					allowEmptyCatch: true,
				},
			],
			'no-empty-function': 'warn',
			'no-empty-static-block': 'error',
			'no-eq-null': 'error',
			'no-eval': 'error',
			'no-extend-native': 'error',
			'no-extra-bind': 'error',
			'no-extra-boolean-cast': 'error',
			'no-extra-label': 'error',
			'no-global-assign': 'error',
			'no-implicit-coercion': 'error',
			'no-implicit-globals': 'error',
			'no-implied-eval': 'error',
			// 'no-inline-comments': 'off',
			'no-invalid-this': 'error',
			'no-iterator': 'error',
			'no-label-var': 'error',
			'no-labels': 'error',
			'no-lone-blocks': 'error',
			'no-lonely-if': 'error',
			'no-loop-func': 'error',
			// 'no-magic-numbers': 'off',
			'no-multi-assign': 'error',
			'no-multi-str': 'error',
			'no-negated-condition': 'error',
			// 'no-nested-ternary': 'off',
			'no-new': 'error',
			'no-new-func': 'error',
			'no-new-wrappers': 'error',
			'no-nonoctal-decimal-escape': 'error',
			'no-object-constructor': 'error',
			'no-octal': 'error',
			'no-octal-escape': 'error',
			// 'no-param-reassign': 'off',
			// 'no-plusplus': 'off',
			'no-proto': 'error',
			'no-redeclare': 'error',
			'no-regex-spaces': 'error',
			'no-restricted-exports': [
				'error',
				{
					restrictDefaultExports: {
						direct: true,
						named: true,
						defaultFrom: true,
						namedFrom: true,
						namespaceFrom: true,
					},
				},
			],
			'no-restricted-globals': [
				'error',
				'event',
				// TODO: Enable this in 2025.
				// {
				// 	name: 'Buffer',
				// 	message: 'Use Uint8Array instead. See: https://sindresorhus.com/blog/goodbye-nodejs-buffer',
				// },
				{
					name: 'atob',
					message:
						'This API is deprecated. Use https://github.com/sindresorhus/uint8array-extras instead.',
				},
				{
					name: 'btoa',
					message:
						'This API is deprecated. Use https://github.com/sindresorhus/uint8array-extras instead.',
				},
			],
			'no-restricted-imports': [
				'error',
				'domain',
				'freelist',
				'smalloc',
				'punycode',
				'sys',
				'querystring',
				'colors',
				// TODO: Enable this in 2025.
				// {
				// 	name: 'buffer',
				// 	message: 'Use Uint8Array instead. See: https://sindresorhus.com/blog/goodbye-nodejs-buffer',
				// },
				// {
				// 	name: 'node:buffer',
				// 	message: 'Use Uint8Array instead. See: https://sindresorhus.com/blog/goodbye-nodejs-buffer',
				// },
			],
			// 'no-restricted-properties': 'off',
			// 'no-restricted-syntax': 'off',
			'no-return-assign': ['error', 'always'],
			'no-script-url': 'error',
			'no-sequences': 'error',
			'no-shadow': 'warn', // TODO: Look into enabling this.
			'no-shadow-restricted-names': 'error',
			// 'no-ternary': 'off',
			'no-throw-literal': 'error',
			'no-undef-init': 'error',
			// 'no-undefined': 'off',
			// 'no-underscore-dangle': 'off', // TODO: Look into enabling this.
			'no-unneeded-ternary': 'error',
			'no-unused-expressions': [
				'error',
				{
					enforceForJSX: true,
				},
			],
			'no-unused-labels': 'error',
			// 'no-useless-call': 'off', // oxlint
			'no-useless-catch': 'error',
			'no-useless-computed-key': [
				'error',
				{
					enforceForClassMembers: true,
				},
			],
			'no-useless-concat': 'error',
			'no-useless-constructor': 'error',
			'no-useless-escape': 'error',
			'no-useless-rename': 'error',
			'no-useless-return': 'error',
			'no-var': 'error',
			'no-void': 'error',
			'no-warning-comments': 'warn',
			'no-with': 'error',
			'object-shorthand': [
				'error',
				'always',
				{
					avoidExplicitReturnArrows: true,
				},
			],
			'one-var': ['error', 'never'],
			'operator-assignment': ['error', 'always'],
			'prefer-arrow-callback': [
				'error',
				{
					allowNamedFunctions: true,
				},
			],
			'prefer-const': [
				'error',
				{
					destructuring: 'all',
				},
			],
			'prefer-destructuring': [
				'error',
				{
					// `array` is disabled because it forces destructuring on
					// stupid stuff like `foo.bar = process.argv[2];`
					VariableDeclarator: {
						array: false,
						object: true,
					},
					AssignmentExpression: {
						array: false,
						// Disabled because object assignment destructuring requires parens wrapping:
						// `let foo; ({foo} = object);`
						object: false,
					},
				},
				{
					enforceForRenamedProperties: false,
				},
			],
			'prefer-exponentiation-operator': 'error',
			// FIXME:
			// Disabled for now as Firefox doesn't support named capture groups
			// 'prefer-named-capture-group': 'error',
			'prefer-numeric-literals': 'error',
			'prefer-object-has-own': 'error',
			'prefer-object-spread': 'error',
			'prefer-promise-reject-errors': [
				'error',
				{
					allowEmptyReject: true,
				},
			],
			'prefer-regex-literals': [
				'error',
				{
					disallowRedundantWrapping: true,
				},
			],
			'prefer-rest-params': 'error',
			'prefer-spread': 'error',
			'prefer-template': 'off',
			radix: ['warn', 'as-needed'],
			'require-await': 'error',
			// FIXME:
			// XO maintainer disabled it because ESLint 7.24.0 doesn't have a fixer.
			// But ESLint 9 has a fixer, so I give it a try.
			// UPDATE: I dont want to use this rule for now.
			// 'require-unicode-regexp': 'error',
			'require-yield': 'error',
			// 'sort-imports': 'off',
			// 'sort-keys': 'off',
			// 'sort-vars': 'off',
			// 'strict': 'off',
			'symbol-description': 'error',
			// 'vars-on-top': 'off',
			yoda: 'error',
		},
	},
];
