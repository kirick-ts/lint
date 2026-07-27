/** @type {import('oxlint').DummyRuleMap} */
export const oxlintPromiseRules = {
	'promise/always-return': 'off', // Reason: Some `then`s are just not meant to return anything
	'promise/avoid-new': 'off', // Reason: they suggest to replace `new Promise()` with `const { promise, resolve } = Promise.withResolvers()`?
	// I dont get the idea, what is the more cool way to wrap callbacks than `new Promise()`?
	// They play us as absolute fools
	'promise/catch-or-return': 'error',
	'promise/no-callback-in-promise': 'error',
	'promise/no-multiple-resolved': 'error',
	'promise/no-nesting': 'error',
	'promise/no-new-statics': 'error',
	'promise/no-promise-in-callback': 'error',
	// "promise/no-return-in-finally": "error", // nursery
	'promise/no-return-wrap': 'error',
	'promise/param-names': 'error',
	'promise/prefer-await-to-callbacks': 'off', // Reason: callbacks can not be replaced by promises.
	'promise/prefer-await-to-then': ['error', { strict: true }], // Reason: sometimes we want to use then() in utility functions or catch() when spinning promise detached from current stack. However, we should be aware of that moves, so I mark them as errors.
	'promise/prefer-catch': 'error',
	'promise/spec-only': 'error',
	'promise/valid-params': 'off', // handled by typescript
};
