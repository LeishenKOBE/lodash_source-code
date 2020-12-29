(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.shi = factory());
}(this, (function () { 'use strict';

  /**
   * @description:
   * @param {*} array 原数组
   * @param {*} start 开始
   * @param {*} end 结尾
   * @return {*}
   */
  var slice = function slice(array, start, end) {
    var length = array == null ? 0 : array.length;

    if (!length) {
      return [];
    }

    start = start == null ? 0 : start;
    end = end === undefined ? length : end;

    if (start < 0) {
      start = -start > length ? 0 : length + start;
    }

    end = end > length ? length : end;

    if (end < 0) {
      end += length;
    }

    length = start > end ? 0 : end - start >>> 0;
    start >>>= 0;
    var index = -1;
    var result = new Array(length);

    while (++index < length) {
      result[index] = array[index + start];
    }

    return result;
  };

  var chunk = function chunk(array, size) {
    size = Math.max(size, 0);
    var length = array === null ? 0 : array.length;

    if (!length || size < 1) {
      return [];
    }

    var index = 0;
    var resIndex = 0;
    var result = new Array(Math.ceil(length / size));

    while (index < length) {
      result[resIndex++] = slice(array, index, index += size);
    }

    return result;
  };

  // 此方法是去除虚假值
  var compact = function compact(array) {
    var resIndex = 0;
    var result = [];

    if (array === null) {
      return result;
    }

    for (var value in array) {
      if (value) {
        result[resIndex++] = value;
      }
    }

    return result;
  };

  var obj = {
    slice: slice,
    chunk: chunk,
    compact: compact
  };

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var isObjectLike = function isObjectLike(value) {
    return _typeof(value) === "object" && value !== null;
  };

  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var toString = objectProto.toString;
  var symToStringTag = typeof Symbol !== "undefined" ? Symbol.toStringTag : undefined;
  var baseGetTag = function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? "[object Undefined]" : "[object Null]";
    }

    if (!(symToStringTag && symToStringTag in Object(value))) {
      return toString.call(value);
    }

    var isOwn = hasOwnProperty.call(value, symToStringTag);
    var tag = value[symToStringTag];
    var unmasked = false;

    try {
      value[symToStringTag] = undefined;
      unmasked = true;
    } catch (e) {}

    var result = toString.call(value);

    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }

    return result;
  };

  var dataViewTag = "[object DataView]";
  var mapTag = "[object Map]";
  var objectTag = "[object Object]";
  var promiseTag = "[object Promise]";
  var setTag = "[object Set]";
  var weakMapTag = "[object WeakMap]";
  var dataViewCtorString = "".concat(DataView);
  var mapCtorString = "".concat(Map);
  var promiseCtorString = "".concat(Promise);
  var setCtorString = "".concat(Set);
  var weakMapCtorString = "".concat(WeakMap);
  var getTag = baseGetTag;

  if (DataView && getTag(new DataView(new ArrayBuffer(1))) !== dataViewTag || getTag(new Map()) !== mapTag || getTag(Promise.resolve()) !== promiseTag || getTag(new Set()) !== setTag || getTag(new WeakSet()) !== weakMapTag) {
    getTag = function getTag(value) {
      var result = baseGetTag(value);
      var Ctor = result === objectTag ? value.constructor : undefined;
      var ctorString = Ctor ? "".concat(Ctor) : "";

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

  var getTag$1 = getTag;

  var common = {
    isObjectLike: isObjectLike,
    getTag: getTag$1
  };

  var obj$1 = {};
  Object.assign(obj$1, common, obj);
  console.log(obj$1.getTag({}));

  return obj$1;

})));
