import pluginStylistic from '@stylistic/eslint-plugin';

export const configStylistic = [
	{
		plugins: {
			'@stylistic': pluginStylistic,
		},
	},
	{
		rules: {
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
			'@stylistic/multiline-ternary': ['error', 'always-multiline'],
			'@stylistic/padding-line-between-statements': [
				'error',
				{
					blankLine: 'always',
					prev: 'multiline-block-like',
					next: '*',
				},
			],
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
		},
	},
];
