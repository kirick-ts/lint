import { configCommon } from './configs/eslint/common.js';
import { configNode } from './configs/eslint/node.js';

export default [...configCommon, ...configNode];
