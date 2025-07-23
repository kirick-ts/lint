import pluginStylistic from '@stylistic/eslint-plugin';

export const configStylistic = [
	{
		plugins: {
			'@stylistic': pluginStylistic,
		},
	},
	{
		rules: {
			// '@stylistic/array-bracket-newline': 'off', // biome formatter
			// '@stylistic/array-bracket-spacing': 'off', // biome formatter
			// '@stylistic/array-element-newline': 'off', // biome formatter
			'@stylistic/arrow-parens': ['error', 'always'],
			'@stylistic/arrow-spacing': [
				'error',
				{
					before: true,
					after: true,
				},
			],
			'@stylistic/block-spacing': ['error', 'always'],
			// '@stylistic/brace-style': 'off', // biome formatter
			'@stylistic/comma-dangle': ['error', 'always-multiline'],
			'@stylistic/comma-spacing': [
				'error',
				{
					before: false,
					after: true,
				},
			],
			'@stylistic/comma-style': ['error', 'last'],
			'@stylistic/computed-property-spacing': ['error', 'never'],
			'@stylistic/dot-location': ['error', 'property'],
			'@stylistic/eol-last': ['error', 'always'],
			'@stylistic/function-call-argument-newline': [
				'error',
				'consistent', // bug?
			],
			'@stylistic/function-call-spacing': ['error', 'never'],
			// '@stylistic/function-paren-newline': 'off', // biome formatter
			// '@stylistic/generator-star-spacing': 'off', // biome formatter
			// '@stylistic/implicit-arrow-linebreak': 'off', // biome formatter
			// '@stylistic/indent': 'off', // biome formatter
			'@stylistic/key-spacing': [
				'error',
				{
					beforeColon: false,
					afterColon: true,
					mode: 'strict',
				},
			],
			'@stylistic/keyword-spacing': [
				'error',
				{
					before: true,
					after: true,
				},
			],
			'@stylistic/line-comment-position': 'off',
			'@stylistic/linebreak-style': [
				'error', // disallow using windows with codebase lol
				'unix',
			],
			'@stylistic/lines-around-comment': 'off',
			'@stylistic/lines-between-class-members': [
				'error',
				{
					enforce: [
						{
							blankLine: 'always',
							prev: '*',
							next: 'method',
						},
						{
							blankLine: 'always',
							prev: 'method',
							next: 'field',
						},
						{
							blankLine: 'never',
							prev: 'field',
							next: 'field',
						},
					],
				},
			],
			'@stylistic/max-len': [
				'warn',
				{
					code: 200,
					tabWidth: 0,
					ignoreComments: true,
					ignoreUrls: true,
					// ignorePattern: String.raw`^\s*'?[^']+'?:\s*`,
				},
			],
			'@stylistic/max-statements-per-line': [
				'error',
				{
					max: 1,
				},
			],
			'@stylistic/multiline-comment-style': 'off',
			'@stylistic/multiline-ternary': ['error', 'always-multiline'],
			'@stylistic/new-parens': ['error', 'always'],
			// '@stylistic/newline-per-chained-call': 'off', // biome formatter
			// '@stylistic/no-confusing-arrow': 'off', // biome formatter
			// '@stylistic/no-extra-parens': 'off', // biome formatter
			'@stylistic/no-extra-semi': 'error',
			'@stylistic/no-floating-decimal': 'error',
			// '@stylistic/no-mixed-operators': 'off', // biome formatter
			// '@stylistic/no-mixed-spaces-and-tabs': 'off', // biome formatter
			'@stylistic/no-multi-spaces': [
				'error',
				{
					exceptions: {
						ImportDeclaration: true,
						Property: false,
					},
				},
			],
			'@stylistic/no-multiple-empty-lines': [
				'error',
				{
					max: 1,
				},
			],
			'@stylistic/no-tabs': 'off',
			'@stylistic/no-trailing-spaces': 'warn',
			'@stylistic/no-whitespace-before-property': 'error',
			'@stylistic/nonblock-statement-body-position': 'error',
			// '@stylistic/object-curly-newline': 'off', // biome formatter
			'@stylistic/object-curly-spacing': [
				'error',
				'always',
				{
					arraysInObjects: true,
					objectsInObjects: true,
				},
			],
			// '@stylistic/object-property-newline': 'error', // biome formatter
			'@stylistic/one-var-declaration-per-line': 'error',
			// '@stylistic/operator-linebreak': 'off', // biome formatter
			'@stylistic/padded-blocks': [
				'error',
				'never',
				{
					allowSingleLineBlocks: true,
				},
			],
			'@stylistic/padding-line-between-statements': [
				'error',
				{
					blankLine: 'always',
					prev: 'multiline-block-like',
					next: '*',
				},
				{
					blankLine: 'never',
					prev: 'multiline-block-like',
					next: 'break',
				},
				// {
				// 	blankLine: 'never',
				// 	prev: 'case',
				// 	next: 'case',
				// },
				// {
				// 	blankLine: 'never',
				// 	prev: 'block',
				// 	next: 'break',
				// },
				// {
				// 	blankLine: 'always',
				// 	prev: ['case', 'default'],
				// 	next: '*',
				// },
			],
			// '@stylistic/quote-props': [ // Duplicated keys are handled by TypeScript
			// 	'error',
			// 	'as-needed',
			// 	{
			// 		numbers: true,
			// 	},
			// ],
			'@stylistic/quotes': [
				'error',
				'single',
				{
					avoidEscape: true,
				},
			],
			'@stylistic/rest-spread-spacing': ['error', 'never'],
			'@stylistic/semi': ['error', 'always'],
			'@stylistic/semi-spacing': [
				'error',
				{
					before: false,
					after: true,
				},
			],
			'@stylistic/semi-style': ['error', 'last'],
			'@stylistic/space-before-blocks': ['error', 'always'],
			'@stylistic/space-before-function-paren': [
				'error',
				{
					anonymous: 'always',
					named: 'never',
					asyncArrow: 'always',
				},
			],
			// '@stylistic/space-in-parens': 'off', // biome formatter
			'@stylistic/space-infix-ops': 'error',
			'@stylistic/space-unary-ops': 'error',
			'@stylistic/spaced-comment': [
				'error',
				'always',
				{
					line: {
						exceptions: ['-', '+', '*'],
						markers: ['!', '/', '=>'],
					},
					block: {
						exceptions: ['-', '+', '*'],
						markers: ['!', '*'],
						balanced: true,
					},
				},
			],
			'@stylistic/switch-colon-spacing': [
				'error',
				{
					after: true,
					before: false,
				},
			],
			'@stylistic/template-curly-spacing': ['error', 'never'],
			'@stylistic/template-tag-spacing': ['error', 'never'],
			'@stylistic/wrap-iife': [
				'error',
				'inside',
				{
					functionPrototypeMethods: true,
				},
			],
			'@stylistic/wrap-regex': 'off',
			'@stylistic/yield-star-spacing': ['error', 'both'],
		},
	},
	{
		files: ['**/*.ts'],
		rules: {
			// '@stylistic/member-delimiter-style': 'off', // biome formatter
			'@stylistic/type-annotation-spacing': 'error',
			'@stylistic/type-generic-spacing': 'error',
			'@stylistic/type-named-tuple-spacing': 'error',
		},
	},
];
