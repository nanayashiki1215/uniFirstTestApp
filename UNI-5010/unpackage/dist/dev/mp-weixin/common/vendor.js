(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!********************************************!*\
  !*** F:/EMS5010APP/UNI-5010/utils/http.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
function req(obj) {
  return new Promise(function (resolve, reject) {
    var global_url = '';
    // 获取自定义的code
    var code = uni.getStorageSync('auth-token');

    var server = uni.getStorageSync('server');

    if (server != null) {
      global_url = server;
    } else {
      global_url = 'http://116.236.149.165:18090';
    }

    var method = obj.method || "GET";
    var url = global_url + obj.url || "";
    var data = obj.data || {};
    var header = obj.header || {
      'Content-Type': obj.contentType || 'application/json',
      'auth-token': code };

    var success = obj.success; // 成功回调函数
    var fail = obj.fail; //表示失败后，要执行的回调函数
    uni.request({
      url: url,
      data: data,
      method: method,
      header: header,
      success: function success(res) {
        if (res.statusCode === 403 || res.statusCode === 401) {
          // 错误处理，返回登录页
          uni.reLaunch({ url: '/pages/index/index.vue' });
        } else if (res.statusCode === 200) {
          resolve(res);
        }
      },
      fail: function fail(err) {
        reject(err);
      } });

  });
}var _default =
req;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 178:
/*!*************************************************************************!*\
  !*** F:/EMS5010APP/UNI-5010/components/jyf-Parser/libs/MpHtmlParser.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               将 html 解析为适用于小程序 rich-text 的 DOM 结构
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               github地址：https://github.com/jin-yufeng/Parser
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               文档地址：https://jin-yufeng.github.io/Parser
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               author：JinYufeng
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              */
var CssHandler = __webpack_require__(/*! ./CssHandler.js */ 179);
var config = __webpack_require__(/*! ./config.js */ 180);
var emoji; // 需要使用 emoji 补丁包时将此行改为 const emoji = require("./emoji.js");

function isBlankChar(c) {
  if (c == undefined) return false;
  return c == ' ' || c == "\xA0" || c == '\t' || c == '\r' || c == '\n' || c == '\f';
};var
MpHtmlParser = /*#__PURE__*/function () {"use strict";
  function MpHtmlParser(data) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var cb = arguments.length > 2 ? arguments[2] : undefined;_classCallCheck(this, MpHtmlParser);
    this.cb = cb;
    this.CssHandler = new CssHandler(options.tagStyle);
    this.data = data;
    this.DOM = [];



    this._attrName = '';
    this._attrValue = '';
    this._attrs = {};
    this._domain = options.domain;
    this._protocol = options.domain ? options.domain.includes("://") ? this._domain.split("://")[0] : "http" :
    undefined;
    this._i = 0;
    this._sectionStart = 0;
    this._stateHandler = this.TextHandler;
    this._STACK = [];
    this._tagName = '';
    this._audioNum = 0;
    this._imgNum = 0;
    this._videoNum = 0;
    this._useAnchor = options.useAnchor;
    this._whiteSpace = false;
  }_createClass(MpHtmlParser, [{ key: "parse", value: function parse()
    {
      if (this.CssHandler) this.data = this.CssHandler.getStyle(this.data);
      for (; this._i < this.data.length; this._i++) {
        this._stateHandler(this.data[this._i]);}
      if (this._stateHandler == this.TextHandler) this.setText();
      while (this._STACK.length) {
        this.popNode(this._STACK.pop());}
























































      if (this.DOM.length) this.DOM[0].PoweredBy = "Parser";
      if (this.cb)
      this.cb(this.DOM);else
      return this.DOM;
    } }, { key: "TextHandler", value: function TextHandler(
    c) {
      if (c == '<') {
        var next = this.data[this._i + 1];
        if (next >= 'a' && next <= 'z' || next >= 'A' && next <= 'Z') {
          this.setText();
          this._stateHandler = this.TagNameHandler;
        } else if (next == '/') {
          this.setText();
          this._i++;
          next = this.data[this._i + 1];
          if (next >= 'a' && next <= 'z' || next >= 'A' && next <= 'Z') {
            this._sectionStart = this._i + 1;
            this._stateHandler = this.EndTagHandler;
          } else
          this._stateHandler = this.CommentHandler;
        } else if (next == '!') {
          this.setText();
          this._stateHandler = this.CommentHandler;
        }
      }
    } }, { key: "CommentHandler", value: function CommentHandler()
    {
      if (this.data.substring(this._i + 1, this._i + 3) == "--" || this.data.substring(this._i + 1, this._i + 7) ==
      "[CDATA[") {
        this._i = this.data.indexOf("-->", this._i + 1);
        if (this._i == -1) return this._i = this.data.length;else
        this._i = this._i + 2;
      } else {
        this._i = this.data.indexOf(">", this._i + 1);
        if (this._i == -1) return this._i = this.data.length;
      }
      this._sectionStart = this._i + 1;
      this._stateHandler = this.TextHandler;
    } }, { key: "TagNameHandler", value: function TagNameHandler(
    c) {
      if (isBlankChar(c)) {
        this._tagName = this.getSelection(true);
        if (this.checkClose()) this.setNode();else
        this._stateHandler = this.AttrNameHandler;
      } else if (this.checkClose()) {
        this._tagName = this.getSelection();
        this.setNode();
      }
    } }, { key: "AttrNameHandler", value: function AttrNameHandler(
    c) {
      if (isBlankChar(c)) {
        this._attrName = this.getSelection(true);
        if (this.data[this._i] == '=') {
          while (isBlankChar(this.data[++this._i])) {;}
          this._sectionStart = this._i;
          this._i--;
          this._stateHandler = this.AttrValueHandler;
        } else this.setAttr();
      } else if (c == '=') {
        this._attrName = this.getSelection();
        while (isBlankChar(this.data[++this._i])) {;}
        this._sectionStart = this._i;
        this._i--;
        this._stateHandler = this.AttrValueHandler;
      } else if (this.checkClose()) {
        this._attrName = this.getSelection();
        this.setAttr();
      }
    } }, { key: "AttrValueHandler", value: function AttrValueHandler(
    c) {
      if (c == '"' || c == "'") {
        this._sectionStart++;
        if ((this._i = this.data.indexOf(c, this._i + 1)) == -1) return this._i = this.data.length;
      } else
      for (; !isBlankChar(this.data[this._i] && this.data[this._i] != '/' && this.data[this._i] != '>'); this._i++) {;}
      this._attrValue = this.getSelection();
      while (this._attrValue.includes("&quot;")) {this._attrValue = this._attrValue.replace("&quot;", '');}
      this.setAttr();
    } }, { key: "EndTagHandler", value: function EndTagHandler(
    c) {
      if (isBlankChar(c) || c == '>' || c == '/') {
        var name = this.getSelection().toLowerCase();
        var flag = false;
        for (var i = this._STACK.length - 1; i >= 0; i--) {
          if (this._STACK[i].name == name) {
            flag = true;
            break;
          }}
        if (flag) {
          var node;
          while (flag) {
            node = this._STACK.pop();
            if (node.name == name) flag = false;
            this.popNode(node);
          }
        } else if (name == 'p' || name == "br") {
          var slibings = this._STACK.length ? this._STACK[this._STACK.length - 1].children : this.DOM;
          var node = {
            name: name,
            attrs: {},
            children: [] };

          slibings.push(node);
        }
        this._i = this.data.indexOf('>', this._i);
        if (this._i == -1) this._i = this.data.length;else
        this._stateHandler = this.TextHandler;
      }
    } }, { key: "checkClose", value: function checkClose()
    {
      if (this.data[this._i] == '>' || this.data[this._i] == '/' && this.data[this._i + 1] == '>')
      return true;
      return false;
    } }, { key: "getSelection", value: function getSelection(
    trim) {
      var str = this._sectionStart == this._i ? '' : this.data.substring(this._sectionStart, this._i);
      while (trim && isBlankChar(this.data[++this._i])) {;}
      if (trim) this._i--;
      this._sectionStart = this._i + 1;
      return str;
    } }, { key: "setAttr", value: function setAttr()
    {
      if (config.trustAttrs[this._attrName])
      this._attrs[this._attrName] = this._attrValue || "true";
      this._attrValue = '';
      while (isBlankChar(this.data[this._i])) {this._i++;}
      if (this.checkClose()) this.setNode();else
      this._stateHandler = this.AttrNameHandler;
    } }, { key: "setText", value: function setText()
    {
      var text = this.getSelection();
      if (text) {
        if (!this._whiteSpace) {
          // 移除空白符
          var flag = false,
          has = false,
          pos;
          for (var i = 0; i < text.length; i++) {
            if (isBlankChar(text[i])) {
              if (!flag) {
                pos = i;
                flag = true;
              }
            } else {
              has = true;
              if (flag) {
                if (i - pos > 1) text = text.substring(0, pos) + ' ' + text.substring(i);
                i = pos;
                flag = false;
              }
            }
          }
          if (flag) text = text.substring(0, pos) + ' ';
          if (!text || !has) return;
        }
        if (emoji) text = emoji.parseEmoji(text);
        // 检查实体
































        var i = text.indexOf('&'),
        j,decode;
        while (i != -1 && i < text.length) {
          j = text.indexOf(';', i);
          if (j - i >= 2 && j - i <= 7) {
            var entity = text.substring(i + 1, j);

            if (!entity.includes("sp") && !entity.includes("lt") && !entity.includes("gt")) {
              decode = true;
              break;
            }




          }
          i = text.indexOf('&', i + 1);
        }
        var slibings = this._STACK.length ? this._STACK[this._STACK.length - 1].children : this.DOM;
        if (slibings.length && slibings[slibings.length - 1].type == "text") {
          slibings[slibings.length - 1].text += text;
          if (decode) slibings[slibings.length - 1].decode = true;
        } else
        slibings.push({
          type: "text",
          text: text,
          decode: decode });

      }
    } }, { key: "bubbling", value: function bubbling(
    node) {
      for (var i = this._STACK.length - 1; i >= 0; i--) {
        if (config.trustTags[this._STACK[i].name] !== 0)
        this._STACK[i].continue = true;else

        return this._STACK[i].name;
      }
    } }, { key: "setNode", value: function setNode()
    {
      var slibings = this._STACK.length ? this._STACK[this._STACK.length - 1].children : this.DOM;
      var node = {
        name: this._tagName.toLowerCase(),
        attrs: this._attrs,
        children: [] };

      config.LabelAttrsHandler(node, this);
      this._attrs = {};
      if (this.data[this._i] == '>') {
        if (!config.selfClosingTags[this._tagName]) {
          if (config.ignoreTags[node.name]) {
            // 处理要被移除的标签
            while (this._i < this.data.length) {
              this._i = this.data.indexOf("</", this._i);
              if (this._i == -1) return this._i = this.data.length;
              this._i += 2;
              this._sectionStart = this._i;
              while (!isBlankChar(this.data[this._i]) && this.data[this._i] != '>' && this.data[this._i] != '/') {this._i++;}
              if (this.data.substring(this._sectionStart, this._i).toLowerCase() == node.name) {
                this._i = this.data.indexOf('>', this._i);
                if (this._i == -1) this._i = this.data.length;else
                this._sectionStart = this._i + 1;
                this._stateHandler = this.TextHandler;
                break;
              }
            }
            return;
          } else this._STACK.push(node);
          if (node.name == "pre") {
            this._whiteSapce = true;
            node.pre = true;
            // 高亮处理接口
            if (config.highlight) {
              this._sectionStart = this._i + 1;
              this._i = this.data.indexOf("</pre", this._sectionStart);
              this.data = this.data.substring(0, this._sectionStart) + config.highlight(this.data.substring(this._sectionStart,
              this._i), node.attrs) + this.data.substring(this._i);
              this._i = this._sectionStart - 1;
            }
          }
        }
      } else this._i++;
      this._sectionStart = this._i + 1;
      this._stateHandler = this.TextHandler;
      if (!config.ignoreTags[node.name]) {
        // 检查空白符是否有效
        var styles = node.attrs.style ? node.attrs.style.toLowerCase().split(';') : [];
        for (var i = 0; i < styles.length; i++) {
          if (styles[i].includes("white-space") && styles[i].includes("pre")) {
            this._whiteSpace = true;
            node.pre = true;
            break;
          }}
        slibings.push(node);
      }
    } }, { key: "popNode", value: function popNode(
    node) {
      // 替换一些标签名
      if (config.blockTags[node.name]) node.name = 'div';else
      if (!config.trustTags.hasOwnProperty(node.name)) node.name = 'span';
      // 空白符处理
      if (node.pre) {
        this._whiteSpace = false;
        delete node.pre;
        for (var i = 0; i < this._STACK.length; i++) {
          if (this._STACK[i].pre)
          this._whiteSpace = true;}
      }
      // 处理表格的边框
      if (node.name == 'table') {var






        setBorder = function setBorder(elem) {
          if (elem.name == 'th' || elem.name == 'td') {
            if (node.attrs.border)
            elem.attrs.style = (elem.attrs.style || '') + ";border:" + node.attrs.border + "px solid gray;";
            if (node.attrs.hasOwnProperty("cellpadding"))
            elem.attrs.style = (elem.attrs.style || '') + ";padding:" + node.attrs.cellpadding + "px";
            return;
          }
          if (elem.type == 'text') return;
          for (var i = 0; i < elem.children.length; i++) {
            setBorder(elem.children[i]);}
        };node.attrs.style = node.attrs.style || '';if (node.attrs.border) node.attrs.style += ";border:" + node.attrs.border + "px solid gray;";if (node.attrs.hasOwnProperty("cellspacing")) node.attrs.style += ";border-spacing:" + node.attrs.cellspacing + "px";
        if (node.attrs.border || node.attrs.hasOwnProperty("cellpadding"))
        for (var i = 0; i < node.children.length; i++) {
          setBorder(node.children[i]);}
      }
      // 合并一些不必要的层，减小节点深度
      if (node.children.length == 1 && node.name == "div" && node.children[0].name == "div") {
        var child = node.children[0];
        node.attrs.style = node.attrs.style || '';
        child.attrs.style = child.attrs.style || '';
        if (node.attrs.style.includes("padding") && (node.attrs.style.includes("margin") || child.attrs.style.includes(
        "margin")) && node.attrs.style.includes("display") && child.attrs.style.includes("display") && !(node.attrs.id &&
        node.attrs.id) && !(node.attrs.class && child.attrs.class)) {
          if (child.attrs.style.includes("padding"))
          child.attrs.style = "box-sizing:border-box;" + child.attrs.style;
          node.attrs.style = node.attrs.style + ";" + child.attrs.style;
          node.attrs.id = (child.attrs.id || '') + (node.attrs.id || '');
          node.attrs.class = (child.attrs.class || '') + (node.attrs.class || '');
          node.children = child.children;
        }
      }
      // 多层样式处理
      if (this.CssHandler.pop)
      this.CssHandler.pop(node);
    } }]);return MpHtmlParser;}();
;
module.exports = {
  parseHtml: function parseHtml(data, options) {return new Promise(function (resolve) {return new MpHtmlParser(data, options, resolve).parse();});},
  parseHtmlSync: function parseHtmlSync(data, options) {return new MpHtmlParser(data, options).parse();} };

/***/ }),

/***/ 179:
/*!***********************************************************************!*\
  !*** F:/EMS5010APP/UNI-5010/components/jyf-Parser/libs/CssHandler.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         解析和匹配 Css 的选择器
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         github地址：https://github.com/jin-yufeng/Parser
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         文档地址：https://jin-yufeng.github.io/Parser
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         author：JinYufeng
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */
var config = __webpack_require__(/*! ./config.js */ 180);var
CssHandler = /*#__PURE__*/function () {"use strict";
  function CssHandler(tagStyle) {_classCallCheck(this, CssHandler);_defineProperty(this, "parseCss",











    function (css) {return new CssParser(css, {}, true).parse();});this.styles = tagStyle;}_createClass(CssHandler, [{ key: "getStyle", value: function getStyle(data) {var style = '';data = data.replace(/<style[\s\S]*?>([\s\S]*?)<\/style[\s\S]*?>/g, function () {style += arguments[1];return '';});this.styles = new CssParser(style, this.styles).parse();return data;} }, { key: "match", value: function match(
    name, attrs) {
      var matched = (this.styles[name] || '') + ';';
      if (attrs.class) {
        var classes = attrs.class.split(' ');
        for (var i = 0; i < classes.length; i++) {
          matched += (this.styles['.' + classes[i]] || '') + ';';}
      }
      if (attrs.id)
      matched += (this.styles['#' + attrs.id] || '') + ';';
      return matched == ';' ? '' : matched;
    } }]);return CssHandler;}();

module.exports = CssHandler;

function isBlankChar(c) {
  return c == ' ' || c == "\xA0" || c == '\t' || c == '\r' || c == '\n' || c == '\f';
};var
CssParser = /*#__PURE__*/function () {"use strict";
  function CssParser(data) {var tagStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var api = arguments.length > 2 ? arguments[2] : undefined;_classCallCheck(this, CssParser);
    this.data = data;
    this.res = api ? tagStyle : this.merge(tagStyle);
    this._floor = 0;
    this._i = 0;
    this._list = [];
    this._comma = false;
    this._sectionStart = 0;
    this._stateHandler = this.SpaceHandler;
  }_createClass(CssParser, [{ key: "merge", value: function merge(
    tagStyle) {
      var res = JSON.parse(JSON.stringify(config.userAgentStyles));
      for (var key in tagStyle) {
        res[key] = (res[key] || '') + tagStyle[key];}
      return res;
    } }, { key: "parse", value: function parse()
    {
      for (; this._i < this.data.length; this._i++) {
        this._stateHandler(this.data[this._i]);}
      return this.res;
    } }, { key: "SpaceHandler", value: function SpaceHandler(
    c) {
      if (c == '.' || c == '#' || c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z') {
        this._sectionStart = this._i;
        this._stateHandler = this.StyleNameHandler;
      } else if (c == '/' && this.data[this._i + 1] == '*')
      this.CommentHandler();else
      if (!isBlankChar(c) && c != ';')
      this._stateHandler = this.IgnoreHandler;
    } }, { key: "CommentHandler", value: function CommentHandler()
    {
      this._i = this.data.indexOf("*/", this._i);
      if (this._i == -1) this._i = this.data.length;
      this._i++;
      this._stateHandler = this.SpaceHandler;
    } }, { key: "IgnoreHandler", value: function IgnoreHandler(
    c) {
      if (c == '{') this._floor++;else
      if (c == '}' && --this._floor <= 0) {
        this._list = [];
        this._stateHandler = this.SpaceHandler;
      }
    } }, { key: "StyleNameHandler", value: function StyleNameHandler(
    c) {
      if (isBlankChar(c)) {
        this._list.push(this.data.substring(this._sectionStart, this._i));
        this._stateHandler = this.NameSpaceHandler;
      } else if (c == '{') {
        this._list.push(this.data.substring(this._sectionStart, this._i));
        this._floor = 1;
        this._sectionStart = this._i + 1;
        this.ContentHandler();
      } else if (c == ',') {
        this._list.push(this.data.substring(this._sectionStart, this._i));
        this._sectionStart = this._i + 1;
        this._comma = true;
      } else if (!(c >= 'a' && c <= 'z') && !(c >= 'A' && c <= 'Z') && !(c >= '0' && c <= '9') && c != '.' && c != '#' &&
      c != '-' && c != '_')
      this._stateHandler = this.IgnoreHandler;
    } }, { key: "NameSpaceHandler", value: function NameSpaceHandler(
    c) {
      if (c == '{') {
        this._floor = 1;
        this._sectionStart = this._i + 1;
        this.ContentHandler();
      } else if (c == ',') {
        this._comma = true;
        this._sectionStart = this._i + 1;
        this._stateHandler = this.StyleNameHandler;
      } else if (!isBlankChar(c)) {
        if (this._comma) {
          this._stateHandler = this.StyleNameHandler;
          this._sectionStart = this._i;
          this._i--;
          this._comma = false;
        } else this._stateHandler = this.IgnoreHandler;
      }
    } }, { key: "ContentHandler", value: function ContentHandler()
    {
      this._i = this.data.indexOf('}', this._i);
      if (this._i == -1) this._i = this.data.length;
      // 去除空白符
      var flag = false,
      pos,content = this.data.substring(this._sectionStart, this._i);
      for (var i = 0; i < content.length; i++) {
        if (isBlankChar(content[i])) {
          if (!flag) {
            pos = i;
            flag = true;
          }
        } else {
          if (flag) {
            if (pos == 0) content = content.substring(i);else
            if (i - pos > 1) content = content.substring(0, pos) + ' ' + content.substring(i);
            i = pos;
            flag = false;
          }
        }
      }
      if (flag) content = content.substring(0, pos);
      for (var i = 0; i < this._list.length; i++) {
        this.res[this._list[i]] = (this.res[this._list[i]] || '') + content;}
      this._list = [];
      this._stateHandler = this.SpaceHandler;
    } }]);return CssParser;}();

/***/ }),

/***/ 18:
/*!*****************************************!*\
  !*** F:/EMS5010APP/UNI-5010/api/api.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.login = login;var _http = _interopRequireDefault(__webpack_require__(/*! @/utils/http.js */ 11));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function login(data) {
  return (0, _http.default)({
    url: '/login',
    method: 'post',
    contentType: 'application/x-www-form-urlencoded',
    data: data });

}

/***/ }),

/***/ 180:
/*!*******************************************************************!*\
  !*** F:/EMS5010APP/UNI-5010/components/jyf-Parser/libs/config.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* 配置文件 */
// 信任的属性列表，不在列表中的属性将被移除
var trustAttrs = {
  align: true,
  alt: true,
  "app-id": true,
  appId: true,




  author: true,
  autoplay: true,
  border: true,
  cellpadding: true,
  cellspacing: true,
  class: true,
  color: true,
  colspan: true,
  controls: true,
  "data-src": true,
  dir: true,
  face: true,
  height: true,
  href: true,
  id: true,
  ignore: true,
  loop: true,
  muted: true,
  name: true,
  path: true,
  poster: true,
  rowspan: true,
  size: true,
  span: true,
  src: true,
  start: true,
  style: true,
  type: true,

  "unit-id": true,
  unitId: true,

  width: true };

// 信任的标签列表，1 表示可以用 trees 组件模拟并继续递归显示
var trustTags = {
  a: 0,
  abbr: 1,
  ad: 0,
  audio: 0,
  b: 1,
  blockquote: 1,
  br: 0,
  code: 1,
  col: 0,
  colgroup: 0,
  dd: 1,
  del: 1,
  dl: 1,
  dt: 1,
  div: 1,
  em: 1,
  fieldset: 0,
  h1: 0,
  h2: 0,
  h3: 0,
  h4: 0,
  h5: 0,
  h6: 0,
  hr: 0,
  i: 1,
  img: 1,
  ins: 1,
  label: 1,
  legend: 0,
  li: 1,
  ol: 1,
  p: 1,
  q: 1,
  source: 0,
  span: 1,
  strong: 1,
  sub: 0,
  sup: 0,
  table: 0,
  tbody: 0,
  td: 0,
  tfoot: 0,
  th: 0,
  thead: 0,
  tr: 0,
  title: 0,
  u: 1,
  ul: 1,
  video: 1 };

// 块级标签，将被转为 div
var blockTags = {
  address: true,
  article: true,
  aside: true,
  body: true,
  center: true,
  cite: true,
  footer: true,
  header: true,
  html: true,
  nav: true,
  pre: true,
  section: true };

// 被移除的标签
var ignoreTags = {
  area: true,
  base: true,
  basefont: true,
  canvas: true,
  circle: true,
  command: true,
  ellipse: true,
  embed: true,
  frame: true,
  head: true,
  iframe: true,
  input: true,
  isindex: true,
  keygen: true,
  line: true,
  link: true,
  map: true,
  meta: true,
  param: true,
  path: true,
  polygon: true,
  polyline: true,
  rect: true,
  script: true,
  source: true,
  textarea: true,
  track: true,
  use: true,
  wbr: true };

// 自闭合标签
var selfClosingTags = {
  area: true,
  base: true,
  basefont: true,
  br: true,
  col: true,
  circle: true,
  ellipse: true,
  embed: true,
  frame: true,
  hr: true,
  img: true,
  input: true,
  isindex: true,
  keygen: true,
  line: true,
  link: true,
  meta: true,
  param: true,
  path: true,
  polygon: true,
  polyline: true,
  rect: true,
  source: true,
  track: true,
  use: true,
  wbr: true };

// 默认的标签样式
var userAgentStyles = {
  a: "display:inline;color:#366092;word-break:break-all;",
  address: "font-style:italic;",
  blockquote: "background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px;",
  center: "text-align:center;",
  cite: "font-style:italic;",
  code: "padding:0 1px 0 1px;margin-left:2px;margin-right:2px;background-color:#f8f8f8;border-radius:3px;",
  dd: "margin-left:40px;",
  img: "max-width:100%;",
  mark: "display:inline;background-color:yellow;",
  pre: "font-family:monospace;white-space:pre;overflow:scroll;",
  s: "display:inline;text-decoration:line-through;",
  u: "display:inline;text-decoration:underline;" };

var SDKVersion = wx.getSystemInfoSync().SDKVersion;
var versionHigherThan = function versionHigherThan() {var version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var v1 = SDKVersion.split('.');
  var v2 = version.split('.');
  var len = Math.max(v1.length, v2.length);
  while (v1.length < len) {
    v1.push('0');}
  while (v2.length < len) {
    v2.push('0');}
  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i]);
    var num2 = parseInt(v2[i]);
    if (num1 > num2) return true;
    if (num1 < num2) return false;
  }
  return true;
};

// 版本兼容
if (versionHigherThan("2.7.1")) {
  trustTags.bdi = 0;
  trustTags.bdo = 0;
  trustTags.caption = 0;
  trustTags.rt = 0;
  trustTags.ruby = 0;
  ignoreTags.rp = true;
  trustTags.big = 1;
  trustTags.small = 1;
  trustTags.pre = 0;
  delete blockTags.pre;
} else {
  blockTags.caption = true;
  userAgentStyles.big = "display:inline;font-size:1.2em;";
  userAgentStyles.small = "display:inline;font-size:0.8em;";
}

module.exports = {
  // 高亮处理函数
  highlight: null,
  // 处理标签的属性，需要通过组件递归方式显示的标签需要调用 Parser.bubbling()
  LabelAttrsHandler: function LabelAttrsHandler(node, Parser) {
    node.attrs.style = node.attrs.style || '';
    switch (node.name) {
      case "div":
      case 'p':
        if (node.attrs.align) {
          node.attrs.style = "text-align:" + node.attrs.align + ';' + node.attrs.style;
          delete node.attrs.align;
        }
        break;
      case "img":
        if (node.attrs["data-src"]) {
          node.attrs.src = node.attrs.src || node.attrs["data-src"];
          delete node.attrs["data-src"];
        }



        if (node.attrs.src) {
          if (!node.attrs.ignore) {
            node.attrs.i = (Parser._imgNum++).toString();
            if (Parser.bubbling() == 'a') node.attrs.ignore = "true"; // 图片在链接中不可预览
          }
          if (Parser._domain && node.attrs.src[0] == '/') {
            if (node.attrs.src[1] == '/') node.attrs.src = Parser._protocol + ":" + node.attrs.src;else
            node.attrs.src = Parser._domain + node.attrs.src;
          }
        }
        break;
      case 'a':
      case "ad":
        Parser.bubbling();
        break;
      case "font":
        if (node.attrs.color) {
          node.attrs.style = "color:" + node.attrs.color + ';' + node.attrs.style;
          delete node.attrs.color;
        }
        if (node.attrs.face) {
          node.attrs.style = "font-family:" + node.attrs.face + ';' + node.attrs.style;
          delete node.attrs.face;
        }
        if (node.attrs.size) {
          var size = parseInt(node.attrs.size);
          if (size < 1) size = 1;else
          if (size > 7) size = 7;
          var map = [10, 13, 16, 18, 24, 32, 48];
          node.attrs.style = "font-size:" + map[size - 1] + "px;" + node.attrs.style;
          delete node.attrs.size;
        }
        break;
      case "video":
      case "audio":
        if (node.attrs.id) Parser['_' + node.name + "Num"]++;else
        node.attrs.id = node.name + ++Parser['_' + node.name + "Num"];
        if (node.name == "video") {
          node.attrs.style = node.attrs.style || '';
          if (node.attrs.width) {
            node.attrs.style = "width:" + parseFloat(node.attrs.width) + (node.attrs.height.includes('%') ? '%' : "px") +
            ';' + node.attrs.style;
            delete node.attrs.width;
          }
          if (node.attrs.height) {
            node.attrs.style = "height:" + parseFloat(node.attrs.height) + (node.attrs.height.includes('%') ? '%' : "px") +
            ';' + node.attrs.style;
            delete node.attrs.height;
          }
          if (Parser._videoNum > 3) node.lazyLoad = true;
        }
        node.attrs.source = [];
        if (node.attrs.src) node.attrs.source.push(node.attrs.src);
        if (!node.attrs.controls && !node.attrs.autoplay)
        console.warn("存在没有controls属性的 " + node.name + " 标签，可能导致无法播放", node);
        Parser.bubbling();
        break;
      case "source":
        var parent = Parser._STACK[Parser._STACK.length - 1];
        if (parent && (parent.name == "video" || parent.name == "audio")) {
          parent.attrs.source.push(node.attrs.src);
          if (!parent.attrs.src) parent.attrs.src = node.attrs.src;
        }
        break;}

    node.attrs.style = Parser.CssHandler.match(node.name, node.attrs, node) + node.attrs.style;
    if (Parser._domain && node.attrs.style.includes("url"))
    node.attrs.style = node.attrs.style.replace(/url\s*\(['"\s]*(\S*?)['"\s]*\)/, function () {
      var src = arguments[1];
      if (src && src[0] == '/') {
        if (src[1] == '/') return "url(" + Parser._protocol + ':' + src + ')';else
        return "url(" + Parser._domain + src + ')';
      } else return arguments[0];
    });
    if (!node.attrs.style) delete node.attrs.style;
    if (Parser._useAnchor && node.attrs.id) Parser.bubbling();
  },
  trustAttrs: trustAttrs,
  trustTags: trustTags,
  blockTags: blockTags,
  ignoreTags: ignoreTags,
  selfClosingTags: selfClosingTags,
  userAgentStyles: userAgentStyles,
  versionHigherThan: versionHigherThan };

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var rawBindings = vm.__secret_vfa_state__ && vm.__secret_vfa_state__.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }
  
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 27:
/*!************************************************!*\
  !*** F:/EMS5010APP/UNI-5010/image/swiper1.jpg ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/image/swiper1.jpg";

/***/ }),

/***/ 28:
/*!************************************************!*\
  !*** F:/EMS5010APP/UNI-5010/image/swiper2.jpg ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/image/swiper2.jpg";

/***/ }),

/***/ 29:
/*!*******************************************!*\
  !*** F:/EMS5010APP/UNI-5010/image/s3.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!*******************************************!*\
  !*** F:/EMS5010APP/UNI-5010/image/s2.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 31:
/*!*******************************************!*\
  !*** F:/EMS5010APP/UNI-5010/image/s1.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 32:
/*!*******************************************!*\
  !*** F:/EMS5010APP/UNI-5010/image/s4.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 33:
/*!*******************************************!*\
  !*** F:/EMS5010APP/UNI-5010/image/s5.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 4:
/*!*****************************************!*\
  !*** F:/EMS5010APP/UNI-5010/pages.json ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map