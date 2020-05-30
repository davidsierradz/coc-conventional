(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const coc_nvim_1 = __webpack_require__(1);
// import DemoList from './lists';
async function activate(context) {
    // workspace.showMessage(`coc-conventional works!!!`);
    context.subscriptions.push(
    // commands.registerCommand('coc-conventional.Command', async () => {
    //   workspace.showMessage(`coc-conventional Commands works!`);
    // }),
    // listManager.registerList(new DemoList(workspace.nvim)),
    coc_nvim_1.sources.createSource({
        name: 'coc-conventional-type',
        shortcut: 'CC Type',
        filetypes: ['gitcommit'],
        priority: 1,
        triggerPatterns: [],
        shouldComplete: async () => {
            let { nvim } = coc_nvim_1.workspace;
            let [, lnum, col] = await nvim.call('getpos', '.');
            return lnum === 1 && col === 1;
        },
        doComplete: async () => {
            const items = await getTypeCompletionItems();
            return items;
        },
    }), coc_nvim_1.sources.createSource({
        name: 'coc-conventional-lerna-scope',
        shortcut: 'CC Scope',
        priority: 1,
        triggerPatterns: [
            /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)\(\s*/,
        ],
        // shouldComplete: async () => {
        //   let { nvim } = workspace
        //   let [, lnum, col] = await nvim.call('getpos', '.')
        //   return lnum === 1 && col === 1
        // },
        doComplete: async () => {
            const items = await getScopeCompletionItems();
            return items;
        },
    }));
}
exports.activate = activate;
async function getTypeCompletionItems() {
    let matches = [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
    ];
    return {
        items: matches.map((m) => {
            return {
                word: m,
                abbr: m,
                filterText: m,
                menu: 'CC Type',
            };
        }),
    };
}
async function getScopeCompletionItems() {
    let matches = ['package1', 'package2'];
    return {
        items: matches.map((m) => {
            return {
                word: m,
                abbr: m,
                filterText: m,
                menu: 'CC Scope',
            };
        }),
    };
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("coc.nvim");

/***/ })
/******/ ])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvYy5udmltXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7QUNsRkEsMENBT2lCO0FBQ2pCLGtDQUFrQztBQUUzQixLQUFLLFVBQVUsUUFBUSxDQUFDLE9BQXlCO0lBQ3RELHNEQUFzRDtJQUV0RCxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUk7SUFDeEIscUVBQXFFO0lBQ3JFLCtEQUErRDtJQUMvRCxNQUFNO0lBRU4sMERBQTBEO0lBRTFELGtCQUFPLENBQUMsWUFBWSxDQUFDO1FBQ25CLElBQUksRUFBRSx1QkFBdUI7UUFDN0IsUUFBUSxFQUFFLFNBQVM7UUFDbkIsU0FBUyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQ3hCLFFBQVEsRUFBRSxDQUFDO1FBQ1gsZUFBZSxFQUFFLEVBQUU7UUFDbkIsY0FBYyxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQ3pCLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxvQkFBUztZQUN4QixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUM7WUFDbEQsT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLENBQUM7UUFDRCxVQUFVLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDckIsTUFBTSxLQUFLLEdBQUcsTUFBTSxzQkFBc0IsRUFBRTtZQUM1QyxPQUFPLEtBQUs7UUFDZCxDQUFDO0tBQ0YsQ0FBQyxFQUVGLGtCQUFPLENBQUMsWUFBWSxDQUFDO1FBQ25CLElBQUksRUFBRSw4QkFBOEI7UUFDcEMsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLENBQUM7UUFDWCxlQUFlLEVBQUU7WUFDZixzRUFBc0U7U0FDdkU7UUFDRCxnQ0FBZ0M7UUFDaEMsNkJBQTZCO1FBQzdCLHVEQUF1RDtRQUN2RCxtQ0FBbUM7UUFDbkMsS0FBSztRQUNMLFVBQVUsRUFBRSxLQUFLLElBQUksRUFBRTtZQUNyQixNQUFNLEtBQUssR0FBRyxNQUFNLHVCQUF1QixFQUFFO1lBQzdDLE9BQU8sS0FBSztRQUNkLENBQUM7S0FDRixDQUFDLENBa0JIO0FBQ0gsQ0FBQztBQTlERCw0QkE4REM7QUFFRCxLQUFLLFVBQVUsc0JBQXNCO0lBQ25DLElBQUksT0FBTyxHQUFHO1FBQ1osT0FBTztRQUNQLE9BQU87UUFDUCxJQUFJO1FBQ0osTUFBTTtRQUNOLE1BQU07UUFDTixLQUFLO1FBQ0wsTUFBTTtRQUNOLFVBQVU7UUFDVixRQUFRO1FBQ1IsT0FBTztRQUNQLE1BQU07S0FDUDtJQUNELE9BQU87UUFDTCxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3ZCLE9BQU87Z0JBQ0wsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsVUFBVSxFQUFFLENBQUM7Z0JBQ2IsSUFBSSxFQUFFLFNBQVM7YUFDaEI7UUFDSCxDQUFDLENBQUM7S0FDSDtBQUNILENBQUM7QUFFRCxLQUFLLFVBQVUsdUJBQXVCO0lBQ3BDLElBQUksT0FBTyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztJQUN0QyxPQUFPO1FBQ0wsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN2QixPQUFPO2dCQUNMLElBQUksRUFBRSxDQUFDO2dCQUNQLElBQUksRUFBRSxDQUFDO2dCQUNQLFVBQVUsRUFBRSxDQUFDO2dCQUNiLElBQUksRUFBRSxVQUFVO2FBQ2pCO1FBQ0gsQ0FBQyxDQUFDO0tBQ0g7QUFDSCxDQUFDOzs7Ozs7O0FDaEhELHFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW1wb3J0IHtcbiAgY29tbWFuZHMsXG4gIENvbXBsZXRlUmVzdWx0LFxuICBFeHRlbnNpb25Db250ZXh0LFxuICBsaXN0TWFuYWdlcixcbiAgc291cmNlcyxcbiAgd29ya3NwYWNlLFxufSBmcm9tICdjb2MubnZpbSdcbi8vIGltcG9ydCBEZW1vTGlzdCBmcm9tICcuL2xpc3RzJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFjdGl2YXRlKGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgLy8gd29ya3NwYWNlLnNob3dNZXNzYWdlKGBjb2MtY29udmVudGlvbmFsIHdvcmtzISEhYCk7XG5cbiAgY29udGV4dC5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgLy8gY29tbWFuZHMucmVnaXN0ZXJDb21tYW5kKCdjb2MtY29udmVudGlvbmFsLkNvbW1hbmQnLCBhc3luYyAoKSA9PiB7XG4gICAgLy8gICB3b3Jrc3BhY2Uuc2hvd01lc3NhZ2UoYGNvYy1jb252ZW50aW9uYWwgQ29tbWFuZHMgd29ya3MhYCk7XG4gICAgLy8gfSksXG5cbiAgICAvLyBsaXN0TWFuYWdlci5yZWdpc3Rlckxpc3QobmV3IERlbW9MaXN0KHdvcmtzcGFjZS5udmltKSksXG5cbiAgICBzb3VyY2VzLmNyZWF0ZVNvdXJjZSh7XG4gICAgICBuYW1lOiAnY29jLWNvbnZlbnRpb25hbC10eXBlJywgLy8gdW5pcXVlIGlkXG4gICAgICBzaG9ydGN1dDogJ0NDIFR5cGUnLFxuICAgICAgZmlsZXR5cGVzOiBbJ2dpdGNvbW1pdCddLFxuICAgICAgcHJpb3JpdHk6IDEsXG4gICAgICB0cmlnZ2VyUGF0dGVybnM6IFtdLCAvLyBSZWdFeHAgcGF0dGVyblxuICAgICAgc2hvdWxkQ29tcGxldGU6IGFzeW5jICgpID0+IHtcbiAgICAgICAgbGV0IHsgbnZpbSB9ID0gd29ya3NwYWNlXG4gICAgICAgIGxldCBbLCBsbnVtLCBjb2xdID0gYXdhaXQgbnZpbS5jYWxsKCdnZXRwb3MnLCAnLicpXG4gICAgICAgIHJldHVybiBsbnVtID09PSAxICYmIGNvbCA9PT0gMVxuICAgICAgfSxcbiAgICAgIGRvQ29tcGxldGU6IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBhd2FpdCBnZXRUeXBlQ29tcGxldGlvbkl0ZW1zKClcbiAgICAgICAgcmV0dXJuIGl0ZW1zXG4gICAgICB9LFxuICAgIH0pLFxuXG4gICAgc291cmNlcy5jcmVhdGVTb3VyY2Uoe1xuICAgICAgbmFtZTogJ2NvYy1jb252ZW50aW9uYWwtbGVybmEtc2NvcGUnLCAvLyB1bmlxdWUgaWRcbiAgICAgIHNob3J0Y3V0OiAnQ0MgU2NvcGUnLFxuICAgICAgcHJpb3JpdHk6IDEsXG4gICAgICB0cmlnZ2VyUGF0dGVybnM6IFtcbiAgICAgICAgL14oYnVpbGR8Y2hvcmV8Y2l8ZG9jc3xmZWF0fGZpeHxwZXJmfHJlZmFjdG9yfHJldmVydHxzdHlsZXx0ZXN0KVxcKFxccyovLFxuICAgICAgXSxcbiAgICAgIC8vIHNob3VsZENvbXBsZXRlOiBhc3luYyAoKSA9PiB7XG4gICAgICAvLyAgIGxldCB7IG52aW0gfSA9IHdvcmtzcGFjZVxuICAgICAgLy8gICBsZXQgWywgbG51bSwgY29sXSA9IGF3YWl0IG52aW0uY2FsbCgnZ2V0cG9zJywgJy4nKVxuICAgICAgLy8gICByZXR1cm4gbG51bSA9PT0gMSAmJiBjb2wgPT09IDFcbiAgICAgIC8vIH0sXG4gICAgICBkb0NvbXBsZXRlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gYXdhaXQgZ2V0U2NvcGVDb21wbGV0aW9uSXRlbXMoKVxuICAgICAgICByZXR1cm4gaXRlbXNcbiAgICAgIH0sXG4gICAgfSksXG5cbiAgICAvLyB3b3Jrc3BhY2UucmVnaXN0ZXJLZXltYXAoXG4gICAgLy8gICBbJ24nXSxcbiAgICAvLyAgICdjb2MtY29udmVudGlvbmFsLWtleW1hcCcsXG4gICAgLy8gICBhc3luYyAoKSA9PiB7XG4gICAgLy8gICAgIHdvcmtzcGFjZS5zaG93TWVzc2FnZShgcmVnaXN0ZXJLZXltYXBgKTtcbiAgICAvLyAgIH0sXG4gICAgLy8gICB7IHN5bmM6IGZhbHNlIH1cbiAgICAvLyApLFxuXG4gICAgLy8gd29ya3NwYWNlLnJlZ2lzdGVyQXV0b2NtZCh7XG4gICAgLy8gICBldmVudDogJ0luc2VydExlYXZlJyxcbiAgICAvLyAgIHJlcXVlc3Q6IHRydWUsXG4gICAgLy8gICBjYWxsYmFjazogKCkgPT4ge1xuICAgIC8vICAgICB3b3Jrc3BhY2Uuc2hvd01lc3NhZ2UoYHJlZ2lzdGVyQXV0b2NtZCBvbiBJbnNlcnRMZWF2ZWApO1xuICAgIC8vICAgfVxuICAgIC8vIH0pXG4gIClcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0VHlwZUNvbXBsZXRpb25JdGVtcygpOiBQcm9taXNlPENvbXBsZXRlUmVzdWx0PiB7XG4gIGxldCBtYXRjaGVzID0gW1xuICAgICdidWlsZCcsXG4gICAgJ2Nob3JlJyxcbiAgICAnY2knLFxuICAgICdkb2NzJyxcbiAgICAnZmVhdCcsXG4gICAgJ2ZpeCcsXG4gICAgJ3BlcmYnLFxuICAgICdyZWZhY3RvcicsXG4gICAgJ3JldmVydCcsXG4gICAgJ3N0eWxlJyxcbiAgICAndGVzdCcsXG4gIF1cbiAgcmV0dXJuIHtcbiAgICBpdGVtczogbWF0Y2hlcy5tYXAoKG0pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdvcmQ6IG0sXG4gICAgICAgIGFiYnI6IG0sXG4gICAgICAgIGZpbHRlclRleHQ6IG0sXG4gICAgICAgIG1lbnU6ICdDQyBUeXBlJyxcbiAgICAgIH1cbiAgICB9KSxcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRTY29wZUNvbXBsZXRpb25JdGVtcygpOiBQcm9taXNlPENvbXBsZXRlUmVzdWx0PiB7XG4gIGxldCBtYXRjaGVzID0gWydwYWNrYWdlMScsICdwYWNrYWdlMiddXG4gIHJldHVybiB7XG4gICAgaXRlbXM6IG1hdGNoZXMubWFwKChtKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3b3JkOiBtLFxuICAgICAgICBhYmJyOiBtLFxuICAgICAgICBmaWx0ZXJUZXh0OiBtLFxuICAgICAgICBtZW51OiAnQ0MgU2NvcGUnLFxuICAgICAgfVxuICAgIH0pLFxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb2MubnZpbVwiKTsiXSwic291cmNlUm9vdCI6IiJ9