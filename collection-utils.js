/*!
 * @license collection-utils.js Copyright(c) 2016 sasa+1
 * https://github.com/sasaplus1-prototype/collection-utils.js
 * Released under the MIT license.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["collectionUtils"] = factory();
	else
		root["collectionUtils"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var typeCheck = __webpack_require__(1);

	var isArray = typeCheck.isArray,
	    isFunction = typeCheck.isFunction,
	    isObjectLike = typeCheck.isObjectLike;

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var keys = (Object.keys) ?
	  function keys(collection) {
	    return Object.keys(collection);
	  } :
	  function keys(collection) {
	    var resultKeys, key;

	    if (!isObjectLike(collection) && !isFunction(collection)) {
	      throw new TypeError('collection must be an Object');
	    }

	    resultKeys = [];

	    for (key in collection) {
	      hasOwnProperty.call(collection, key) && resultKeys.push(key);
	    }

	    return resultKeys;
	  };

	function mapValues(collection, iteratee) {
	  var collectionKeys, resultCollection, i, len;

	  collectionKeys = keys(collection);
	  resultCollection = (isArray(collection)) ? [] : {};

	  for (i = 0, len = collectionKeys.length; i < len; ++i) {
	    resultCollection[collectionKeys[i]] =
	      iteratee(collection[collectionKeys[i]], collectionKeys[i]);
	  }

	  return resultCollection;
	}

	function reduce(collection, iteratee, initialValue) {
	  var collectionKeys, result, i, len;

	  if (!isFunction(iteratee)) {
	    throw new TypeError('iteratee must be a Function');
	  }

	  collectionKeys = keys(collection);
	  len = collectionKeys.length;

	  if (arguments.length > 2) {
	    // use initialValue if passed
	    result = initialValue;
	    i = 0;
	  } else {
	    // first item use as initialValue
	    if (len <= 0) {
	      throw new Error('collection must be has element');
	    }

	    result = collection[collectionKeys[0]];
	    i = 1;
	  }

	  while (i < len) {
	    result = iteratee(result, collection[collectionKeys[i]], i, collection);
	    ++i;
	  }

	  return result;
	}

	function includes(collection, target) {
	  var collectionKeys = keys(collection),
	      i, len, current;

	  for (i = 0, len = collectionKeys.length; i < len; ++i) {
	    current = collection[collectionKeys[i]];

	    if (current === target || (current !== current && target !== target)) {
	      return true;
	    }
	  }

	  return false;
	}

	function some(collection, iteratee, thisObject) {
	  var collectionKeys = keys(collection),
	      context, i, len;

	  if (!isFunction(iteratee)) {
	    throw new TypeError('iteratee must be a Function');
	  }

	  context = (arguments.length > 2) ? thisObject : void 0;

	  for (i = 0, len = collectionKeys.length; i < len; ++i) {
	    if (iteratee.call(context, collection[collectionKeys[i]], i, collection)) {
	      return true;
	    }
	  }

	  return false;
	}

	function every(collection, iteratee, thisObject) {
	  var collectionKeys = keys(collection),
	      context, i, len;

	  if (!isFunction(iteratee)) {
	    throw new TypeError('iteratee must be a Function');
	  }

	  context = (arguments.length > 2) ? thisObject : void 0;

	  for (i = 0, len = collectionKeys.length; i < len; ++i) {
	    if (!iteratee.call(context, collection[collectionKeys[i]], i, collection)) {
	      return false;
	    }
	  }

	  return true;
	}

	function zip() {
	  var arrays = arguments,
	      longestArray, result, items,
	      elIndex, elLen, arIndex, arLen;

	  if (!every(arrays, isArray)) {
	    throw new TypeError('arrays must be an Array');
	  }

	  longestArray = reduce(arrays, function(prev, curr) {
	    return (curr.length > prev.length) ? curr : prev;
	  });

	  result = [];

	  // loop for element in array
	  for (elIndex = 0, elLen = longestArray.length; elIndex < elLen; ++elIndex) {
	    items = [];

	    // loop for arrays
	    for (arIndex = 0, arLen = arrays.length; arIndex < arLen; ++arIndex) {
	      items.push(arrays[arIndex][elIndex]);
	    }

	    result.push(items);
	  }

	  return result;
	}

	function flow() {
	  var functions = arguments;

	  if (!every(functions, isFunction)) {
	    throw new TypeError('functions must be Function');
	  }

	  return function(arg) {
	    return reduce(functions, function(result, fn) {
	      return fn(result);
	    }, arg);
	  };
	}

	module.exports = {
	  keys: keys,
	  mapValues: mapValues,
	  reduce: reduce,
	  includes: includes,
	  some: some,
	  every: every,
	  zip: zip,
	  flow: flow
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var toString = Object.prototype.toString;

	var isArray = (Array.isArray) ?
	  function isArray(value) {
	    return Array.isArray(value);
	  } :
	  function isArray(value) {
	    return (isObjectLike(value) && toString.call(value) === '[object Array]');
	  };

	function isFunction(value) {
	  return (
	    typeof value === 'function' || toString.call(value) === '[object Function]'
	  );
	}

	function isObjectLike(value) {
	  return (value !== null && typeof value === 'object');
	}

	function isObject(value) {
	  return (isObjectLike(value) && toString.call(value) === '[object Object]');
	}

	function isRegExp(value) {
	  return (toString.call(value) === '[object RegExp]');
	}

	function isString(value) {
	  return (
	    typeof value === 'string' ||
	      (isObjectLike(value) && toString.call(value) === '[object String]')
	  );
	}

	module.exports = {
	  isArray: isArray,
	  isFunction: isFunction,
	  isObjectLike: isObjectLike,
	  isObject: isObject,
	  isRegExp: isRegExp,
	  isString: isString
	};


/***/ }
/******/ ])
});
;