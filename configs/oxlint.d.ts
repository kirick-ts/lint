import { DummyRuleMap, OxlintConfig } from 'oxlint';

export const plugins: Exclude<OxlintConfig['plugins'], undefined>;
export const rules: DummyRuleMap;
