/** @type {import('oxlint').DummyRuleMap} */
export const oxlintJsdocRules = {
	'jsdoc/check-property-names': 'error',
	'jsdoc/check-tag-names': 'error',
	'jsdoc/empty-tags': 'error',
	'jsdoc/no-defaults': 'error',
	'jsdoc/require-param': 'off', // Reason: it is just convenient to not enforce useless parameter descriptions when parameter meaning is clear from context
	'jsdoc/require-param-description': 'error',
	'jsdoc/require-param-name': 'error',
	'jsdoc/require-param-type': 'off', // Reason: types are defined in typescript code
	'jsdoc/require-property': 'error',
	'jsdoc/require-property-description': 'error',
	'jsdoc/require-property-name': 'error',
	'jsdoc/require-property-type': 'off', // Reason: types are defined in typescript code
	'jsdoc/require-returns': 'off', // Reason: the same as "require-param"; also, often returns are clear from function description
	'jsdoc/require-returns-description': 'error',
	'jsdoc/require-returns-type': 'off', // Reason: types are defined in typescript code
	'jsdoc/require-throws-type': 'error',
	'jsdoc/require-yields': 'warn', // Reason: I keep this rule on, because yields are rarely used and maybe they need to be documented?
};
