import { baseGetTag } from "./baseGetTag";

const dataViewTag = "[object DataView]";
const mapTag = "[object Map]";
const objectTag = "[object Object]";
const promiseTag = "[object Promise]";
const setTag = "[object Set]";
const weakMapTag = "[object WeakMap]";

const dataViewCtorString = `${DataView}`;
const mapCtorString = `${Map}`;
const promiseCtorString = `${Promise}`;
const setCtorString = `${Set}`;
const weakMapCtorString = `${WeakMap}`;

let getTag = baseGetTag;

if (
  (DataView && getTag(new DataView(new ArrayBuffer(1))) !== dataViewTag) ||
  getTag(new Map()) !== mapTag ||
  getTag(Promise.resolve()) !== promiseTag ||
  getTag(new Set()) !== setTag ||
  getTag(new WeakSet()) !== weakMapTag
) {
  getTag = (value) => {
    const result = baseGetTag(value);
    const Ctor = result === objectTag ? value.constructor : undefined;
    const ctorString = Ctor ? `${Ctor}` : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;
        case mapCtorString:
          return mapTag;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag;
        case weakMapCtorString:
          return WeakMapTag;
      }
    }
  };
}
export default getTag;
