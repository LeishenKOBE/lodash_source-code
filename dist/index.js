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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
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

  var HASH_UNDEFINED = '__lodash_hash_undefined__';
  var Hash = /*#__PURE__*/function () {
    function Hash(entries) {
      _classCallCheck(this, Hash);

      var index = -1;
      var length = entries == null ? 0 : entries.length;
      this.clear();

      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    _createClass(Hash, [{
      key: "clear",
      value: function clear() {
        this.__data__ = Object.create(null);
        this.size = 0;
      }
    }, {
      key: "delete",
      value: function _delete(key) {
        var result = this.has(key) && delete this.__data__[key];
        this.size -= result ? 1 : 0;
        return result;
      }
    }, {
      key: "get",
      value: function get(key) {
        var data = this.__data__;
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }
    }, {
      key: "has",
      value: function has(key) {
        var data = this.__data__;
        return data[key] !== undefined;
      }
    }, {
      key: "set",
      value: function set(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = value === undefined ? HASH_UNDEFINED : value;
        return this;
      }
    }]);

    return Hash;
  }();

  var eq = function eq(value, other) {
    return value === other || value !== value && other !== other; // 后半句用来判断NaN的
  };

  var assocIndexOf = function assocIndexOf(array, key) {
    var length = array.length;

    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }

    return -1;
  };

  var ListCache = /*#__PURE__*/function () {
    function ListCache(entries) {
      _classCallCheck(this, ListCache);

      var index = -1;
      var length = entries == null ? 0 : entries.length;
      this.clear();

      while (index++ < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    _createClass(ListCache, [{
      key: "clear",
      value: function clear() {
        this.__data__ = [];
        this.size = 0;
      }
    }, {
      key: "delete",
      value: function _delete(key) {
        var data = this.__data__;
        var index = assocIndexOf(data, key);

        if (index < 0) {
          return false;
        }

        var lastIndex = data.length - 1;

        if (index === lastIndex) {
          data.pop();
        } else {
          data.splice(index, 1);
        }

        --this.size;
        return true;
      }
    }, {
      key: "get",
      value: function get(key) {
        var data = this.__data__;
        var index = assocIndexOf(data, key);
        return index < 0 ? undefined : data[index][1];
      }
    }, {
      key: "has",
      value: function has(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
    }, {
      key: "set",
      value: function set(key, value) {
        var data = this.__data__;
        var index = assocIndexOf(data, key);

        if (index < 0) {
          ++this.size;
          data.push([key, value]);
        } else {
          data[key][1] = value;
        }

        return this;
      }
    }]);

    return ListCache;
  }();

  function getMapData(_ref, key) {
    var __data__ = _ref.__data__;
    var data = __data__;
    return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
  }

  function isKeyable(value) {
    var type = _typeof(value);

    return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
  }

  var MapCache = /*#__PURE__*/function () {
    function MapCache(entries) {
      _classCallCheck(this, MapCache);

      var index = -1;
      var length = entries === null ? 0 : entries.length;
      this.clear();

      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    _createClass(MapCache, [{
      key: "clear",
      value: function clear() {
        this.size = 0;
        this.__data__ = {
          hash: new Hash(),
          map: new (Map || ListCache)(),
          string: new Hash()
        };
      }
    }, {
      key: "delete",
      value: function _delete(key) {
        var result = getMapData(this, key)['delete'](key);
        this.size -= result ? 1 : 0;
        return result;
      }
    }, {
      key: "get",
      value: function get(key) {
        return getMapData(this, key).get(key);
      }
    }, {
      key: "has",
      value: function has(key) {
        return getMapData(this, key).has(key);
      }
    }, {
      key: "set",
      value: function set(key, value) {
        var data = getMapData(this, key);
        var size = data.size;
        data.set(key, value);
        this.size += data.size === size ? 0 : 1;
        return this;
      }
    }]);

    return MapCache;
  }();

  var LARGE_ARRAY_SIZE = 200;
  var Stack = /*#__PURE__*/function () {
    function Stack(entries) {
      _classCallCheck(this, Stack);

      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }

    _createClass(Stack, [{
      key: "clear",
      value: function clear() {
        this.__data__ = new ListCache();
        this.size = 0;
      }
    }, {
      key: "delete",
      value: function _delete(key) {
        var data = this.__data__;
        var result = data['delete'][key];
        this.size = data.size;
        return result;
      }
    }, {
      key: "get",
      value: function get(key) {
        return this.__data__.get(key);
      }
    }, {
      key: "has",
      value: function has(key) {
        return this.__data__.has(key);
      }
    }, {
      key: "set",
      value: function set(key, value) {
        var data = this.__data__;

        if (data instanceof ListCache) {
          var pairs = data.__data__;

          if (pairs.length < LARGE_ARRAY_SIZE - 1) {
            pairs.push([key, value]);
            this.size = ++data.size;
            return this;
          }

          data = this.__data__ = new MapCache(pairs);
        }
      }
    }]);

    return Stack;
  }();

  var common = {
    isObjectLike: isObjectLike,
    getTag: getTag$1,
    Hash: Hash,
    eq: eq,
    assocIndexOf: assocIndexOf,
    ListCache: ListCache,
    Stack: Stack,
    MapCache: MapCache
  };

  var obj$1 = {};
  Object.assign(obj$1, common, obj);
  console.log(obj$1);

  return obj$1;

})));
