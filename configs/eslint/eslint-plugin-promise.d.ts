declare module 'eslint-plugin-promise' {
	import type { ESLint, Linter } from 'eslint';

	const pluginPromise: ESLint.Plugin & {
		configs: {
			recommended: Linter.LegacyConfig;
			'flat/recommended': Linter.Config;
		};
	};

	export = pluginPromise;
}
