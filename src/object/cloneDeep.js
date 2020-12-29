import { baseClone } from "./baseClone";

const CLONE_DEEP_FLAG = 1;
const CLONE_SYMBOLS_FLAG = 4;

export const cloneDeep = (value) => {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
};
