import pluginNode from 'eslint-plugin-n';

export const configNode = [
	{
		plugins: { n: pluginNode },
	},
	{
		rules: {
			// 'n/callback-return': 'off',
			'n/exports-style': ['error', 'exports'],
			'n/file-extension-in-import': ['error', 'always'],
			'n/global-require': 'error',
			'n/handle-callback-err': 'error',
			'n/hashbang': 'off',
			'n/no-callback-literal': 'error',
			'n/no-deprecated-api': 'error',
			'n/no-exports-assign': 'error',
			'n/no-extraneous-import': 'error',
			'n/no-extraneous-require': 'error',
			// 'n/no-missing-import': 'off', // handled by TypeScript
			// 'n/no-missing-require': 'off', // handled by TypeScript
			'n/no-mixed-requires': 'off',
			'n/no-new-require': 'error',
			'n/no-path-concat': 'error',
			// 'n/no-process-env': 'off',
			'n/no-process-exit': 'error',
			// 'n/no-restricted-import': 'off',
			// 'n/no-restricted-require': 'off',
			'n/no-sync': 'error',
			'n/no-unpublished-bin': 'error',
			'n/no-unpublished-import': [
				'error',
				{
					ignoreTypeImport: true,
				},
			],
			'n/no-unpublished-require': 'error',
			'n/no-unsupported-features/es-builtins': 'error',
			'n/no-unsupported-features/es-syntax': 'error',
			'n/no-unsupported-features/node-builtins': 'error',
			'n/prefer-global/buffer': 'error',
			'n/prefer-global/console': 'error',
			'n/prefer-global/process': 'error',
			'n/prefer-global/text-decoder': 'error',
			'n/prefer-global/text-encoder': 'error',
			'n/prefer-global/url-search-params': 'error',
			'n/prefer-global/url': 'error',
			'n/prefer-node-protocol': 'off',
			'n/prefer-promises/dns': 'error',
			'n/prefer-promises/fs': 'error',
			'n/process-exit-as-throw': 'error',
		},
	},
];
