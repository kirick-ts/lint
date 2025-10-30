import { configCommon } from './configs/eslint/common.js';
import { configNode } from './configs/eslint/node.js';
import { configVue } from './configs/eslint/vue.js';

export default [...configCommon, ...configNode, ...configVue];
