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

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const coc_nvim_1 = __webpack_require__(1);
const resolve_from_1 = __importDefault(__webpack_require__(2));
const requireFunc =  true ? require : undefined;
async function activate(context) {
    const config = coc_nvim_1.workspace.getConfiguration('coc-conventional');
    const status = config.get('enabled', true);
    if (!status) {
        return;
    }
    let document = await coc_nvim_1.workspace.document;
    let conventionalConfigPath = resolve_from_1.default.silent(coc_nvim_1.Uri.parse(document.uri).fsPath, '@commitlint/config-conventional');
    if (conventionalConfigPath == undefined) {
        coc_nvim_1.workspace.showMessage('Cannot find @commitlint/config-conventional!');
        return;
    }
    let conventionalConfig = requireFunc(conventionalConfigPath);
    async function getTypeCompletionItems() {
        let matches = [];
        if (conventionalConfig.rules['type-enum'][2]) {
            matches = conventionalConfig.rules['type-enum'][2];
        }
        else {
            matches = [
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
        }
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
    context.subscriptions.push(coc_nvim_1.sources.createSource({
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
    }));
    if (config.get('enableLernaScopes', false)) {
        let lernaPath = resolve_from_1.default.silent(coc_nvim_1.Uri.parse(document.uri).fsPath, '@lerna/project');
        if (lernaPath == undefined) {
            coc_nvim_1.workspace.showMessage('Cannot find @lerna/project!');
            return;
        }
        let lernaModule = requireFunc(lernaPath);
        const pkgs = (await lernaModule.getPackages())
            .map((pkg) => pkg.name)
            .map((name) => name.charAt(0) === '@' ? name.split('/')[1] : name);
        async function getScopeCompletionItems() {
            let matches = [];
            if (pkgs) {
                matches = pkgs;
            }
            else {
                matches = [];
            }
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
        context.subscriptions.push(coc_nvim_1.sources.createSource({
            name: 'coc-conventional-lerna-scope',
            shortcut: 'CC Scope',
            priority: 1,
            triggerCharacters: ['('],
            triggerPatterns: [/^.*\(/],
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
}
exports.activate = activate;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("coc.nvim");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const path = __webpack_require__(3);
const Module = __webpack_require__(4);
const fs = __webpack_require__(5);

const resolveFrom = (fromDirectory, moduleId, silent) => {
	if (typeof fromDirectory !== 'string') {
		throw new TypeError(`Expected \`fromDir\` to be of type \`string\`, got \`${typeof fromDirectory}\``);
	}

	if (typeof moduleId !== 'string') {
		throw new TypeError(`Expected \`moduleId\` to be of type \`string\`, got \`${typeof moduleId}\``);
	}

	try {
		fromDirectory = fs.realpathSync(fromDirectory);
	} catch (error) {
		if (error.code === 'ENOENT') {
			fromDirectory = path.resolve(fromDirectory);
		} else if (silent) {
			return;
		} else {
			throw error;
		}
	}

	const fromFile = path.join(fromDirectory, 'noop.js');

	const resolveFileName = () => Module._resolveFilename(moduleId, {
		id: fromFile,
		filename: fromFile,
		paths: Module._nodeModulePaths(fromDirectory)
	});

	if (silent) {
		try {
			return resolveFileName();
		} catch (error) {
			return;
		}
	}

	return resolveFileName();
};

module.exports = (fromDirectory, moduleId) => resolveFrom(fromDirectory, moduleId);
module.exports.silent = (fromDirectory, moduleId) => resolveFrom(fromDirectory, moduleId, true);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("module");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ })
/******/ ])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvYy5udmltXCIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtZnJvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9kdWxlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7OztBQ2xGQSwwQ0FNaUI7QUFDakIsK0RBQXNDO0FBT3RDLE1BQU0sV0FBVyxHQUNmLEtBQXlDLENBQUMsQ0FBQyxDQUFDLE9BQXVCLENBQUMsQ0FBQyxDQUFDLFNBQU87QUFFeEUsS0FBSyxVQUFVLFFBQVEsQ0FBQyxPQUF5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Z0JBQzdDLE9BQU8sS0FBSztZQUNkLENBQUM7U0FDRixDQUFDLENBQ0g7S0FDRjtBQUNILENBQUM7QUEvSEQsNEJBK0hDOzs7Ozs7O0FDaEpELHFDOzs7Ozs7O0FDQWE7QUFDYixhQUFhLG1CQUFPLENBQUMsQ0FBTTtBQUMzQixlQUFlLG1CQUFPLENBQUMsQ0FBUTtBQUMvQixXQUFXLG1CQUFPLENBQUMsQ0FBSTs7QUFFdkI7QUFDQTtBQUNBLDhFQUE4RSxxQkFBcUI7QUFDbkc7O0FBRUE7QUFDQSwrRUFBK0UsZ0JBQWdCO0FBQy9GOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDOUNBLGlDOzs7Ozs7QUNBQSxtQzs7Ozs7O0FDQUEsK0IiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJpbXBvcnQge1xuICBDb21wbGV0ZVJlc3VsdCxcbiAgRXh0ZW5zaW9uQ29udGV4dCxcbiAgc291cmNlcyxcbiAgd29ya3NwYWNlLFxuICBVcmksXG59IGZyb20gJ2NvYy5udmltJ1xuaW1wb3J0IHJlc29sdmVGcm9tIGZyb20gJ3Jlc29sdmUtZnJvbSdcblxuaW50ZXJmYWNlIExlcm5hUGFja2FnZSB7XG4gIG5hbWU6IHN0cmluZ1xufVxuZGVjbGFyZSB2YXIgX193ZWJwYWNrX3JlcXVpcmVfXzogYW55XG5kZWNsYXJlIHZhciBfX25vbl93ZWJwYWNrX3JlcXVpcmVfXzogYW55XG5jb25zdCByZXF1aXJlRnVuYyA9XG4gIHR5cGVvZiBfX3dlYnBhY2tfcmVxdWlyZV9fID09PSAnZnVuY3Rpb24nID8gX19ub25fd2VicGFja19yZXF1aXJlX18gOiByZXF1aXJlXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhY3RpdmF0ZShjb250ZXh0OiBFeHRlbnNpb25Db250ZXh0KTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGNvbmZpZyA9IHdvcmtzcGFjZS5nZXRDb25maWd1cmF0aW9uKCdjb2MtY29udmVudGlvbmFsJylcbiAgY29uc3Qgc3RhdHVzID0gY29uZmlnLmdldDxib29sZWFuPignZW5hYmxlZCcsIHRydWUpXG4gIGlmICghc3RhdHVzKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBsZXQgZG9jdW1lbnQgPSBhd2FpdCB3b3Jrc3BhY2UuZG9jdW1lbnRcbiAgbGV0IGNvbnZlbnRpb25hbENvbmZpZ1BhdGggPSByZXNvbHZlRnJvbS5zaWxlbnQoXG4gICAgVXJpLnBhcnNlKGRvY3VtZW50LnVyaSkuZnNQYXRoLFxuICAgICdAY29tbWl0bGludC9jb25maWctY29udmVudGlvbmFsJyxcbiAgKVxuICBpZiAoY29udmVudGlvbmFsQ29uZmlnUGF0aCA9PSB1bmRlZmluZWQpIHtcbiAgICB3b3Jrc3BhY2Uuc2hvd01lc3NhZ2UoJ0Nhbm5vdCBmaW5kIEBjb21taXRsaW50L2NvbmZpZy1jb252ZW50aW9uYWwhJylcbiAgICByZXR1cm5cbiAgfVxuXG4gIGxldCBjb252ZW50aW9uYWxDb25maWcgPSByZXF1aXJlRnVuYyhjb252ZW50aW9uYWxDb25maWdQYXRoKVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGdldFR5cGVDb21wbGV0aW9uSXRlbXMoKTogUHJvbWlzZTxDb21wbGV0ZVJlc3VsdD4ge1xuICAgIGxldCBtYXRjaGVzOiBBcnJheTxzdHJpbmc+ID0gW11cbiAgICBpZiAoY29udmVudGlvbmFsQ29uZmlnLnJ1bGVzWyd0eXBlLWVudW0nXVsyXSkge1xuICAgICAgbWF0Y2hlcyA9IGNvbnZlbnRpb25hbENvbmZpZy5ydWxlc1sndHlwZS1lbnVtJ11bMl1cbiAgICB9IGVsc2Uge1xuICAgICAgbWF0Y2hlcyA9IFtcbiAgICAgICAgJ2J1aWxkJyxcbiAgICAgICAgJ2Nob3JlJyxcbiAgICAgICAgJ2NpJyxcbiAgICAgICAgJ2RvY3MnLFxuICAgICAgICAnZmVhdCcsXG4gICAgICAgICdmaXgnLFxuICAgICAgICAncGVyZicsXG4gICAgICAgICdyZWZhY3RvcicsXG4gICAgICAgICdyZXZlcnQnLFxuICAgICAgICAnc3R5bGUnLFxuICAgICAgICAndGVzdCcsXG4gICAgICBdXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW1zOiBtYXRjaGVzLm1hcCgobSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHdvcmQ6IG0sXG4gICAgICAgICAgYWJicjogbSxcbiAgICAgICAgICBmaWx0ZXJUZXh0OiBtLFxuICAgICAgICAgIG1lbnU6ICdDQyBUeXBlJyxcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgfVxuICB9XG5cbiAgY29udGV4dC5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgc291cmNlcy5jcmVhdGVTb3VyY2Uoe1xuICAgICAgbmFtZTogJ2NvYy1jb252ZW50aW9uYWwtdHlwZScsXG4gICAgICBzaG9ydGN1dDogJ0NDIFR5cGUnLFxuICAgICAgZmlsZXR5cGVzOiBbJ2dpdGNvbW1pdCddLFxuICAgICAgcHJpb3JpdHk6IDEsXG4gICAgICB0cmlnZ2VyUGF0dGVybnM6IFtdLFxuICAgICAgc2hvdWxkQ29tcGxldGU6IGFzeW5jICgpID0+IHtcbiAgICAgICAgbGV0IHsgbnZpbSB9ID0gd29ya3NwYWNlXG4gICAgICAgIGxldCBbLCBsbnVtLCBjb2xdID0gYXdhaXQgbnZpbS5jYWxsKCdnZXRwb3MnLCAnLicpXG4gICAgICAgIHJldHVybiBsbnVtID09PSAxICYmIGNvbCA9PT0gMVxuICAgICAgfSxcbiAgICAgIGRvQ29tcGxldGU6IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBhd2FpdCBnZXRUeXBlQ29tcGxldGlvbkl0ZW1zKClcbiAgICAgICAgcmV0dXJuIGl0ZW1zXG4gICAgICB9LFxuICAgIH0pLFxuICApXG5cbiAgaWYgKGNvbmZpZy5nZXQ8Ym9vbGVhbj4oJ2VuYWJsZUxlcm5hU2NvcGVzJywgZmFsc2UpKSB7XG4gICAgbGV0IGxlcm5hUGF0aCA9IHJlc29sdmVGcm9tLnNpbGVudChcbiAgICAgIFVyaS5wYXJzZShkb2N1bWVudC51cmkpLmZzUGF0aCxcbiAgICAgICdAbGVybmEvcHJvamVjdCcsXG4gICAgKVxuXG4gICAgaWYgKGxlcm5hUGF0aCA9PSB1bmRlZmluZWQpIHtcbiAgICAgIHdvcmtzcGFjZS5zaG93TWVzc2FnZSgnQ2Fubm90IGZpbmQgQGxlcm5hL3Byb2plY3QhJylcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBsZXJuYU1vZHVsZSA9IHJlcXVpcmVGdW5jKGxlcm5hUGF0aClcblxuICAgIGNvbnN0IHBrZ3MgPSAoYXdhaXQgbGVybmFNb2R1bGUuZ2V0UGFja2FnZXMoKSlcbiAgICAgIC5tYXAoKHBrZzogTGVybmFQYWNrYWdlKSA9PiBwa2cubmFtZSlcbiAgICAgIC5tYXAoKG5hbWU6IHN0cmluZykgPT5cbiAgICAgICAgbmFtZS5jaGFyQXQoMCkgPT09ICdAJyA/IG5hbWUuc3BsaXQoJy8nKVsxXSA6IG5hbWUsXG4gICAgICApXG5cbiAgICBhc3luYyBmdW5jdGlvbiBnZXRTY29wZUNvbXBsZXRpb25JdGVtcygpOiBQcm9taXNlPENvbXBsZXRlUmVzdWx0PiB7XG4gICAgICBsZXQgbWF0Y2hlczogQXJyYXk8c3RyaW5nPiA9IFtdXG4gICAgICBpZiAocGtncykge1xuICAgICAgICBtYXRjaGVzID0gcGtnc1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWF0Y2hlcyA9IFtdXG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpdGVtczogbWF0Y2hlcy5tYXAoKG0pID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd29yZDogbSxcbiAgICAgICAgICAgIGFiYnI6IG0sXG4gICAgICAgICAgICBmaWx0ZXJUZXh0OiBtLFxuICAgICAgICAgICAgbWVudTogJ0NDIFNjb3BlJyxcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnRleHQuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgc291cmNlcy5jcmVhdGVTb3VyY2Uoe1xuICAgICAgICBuYW1lOiAnY29jLWNvbnZlbnRpb25hbC1sZXJuYS1zY29wZScsXG4gICAgICAgIHNob3J0Y3V0OiAnQ0MgU2NvcGUnLFxuICAgICAgICBwcmlvcml0eTogMSxcbiAgICAgICAgdHJpZ2dlckNoYXJhY3RlcnM6IFsnKCddLFxuICAgICAgICB0cmlnZ2VyUGF0dGVybnM6IFsvXi4qXFwoL10sXG4gICAgICAgIC8vIHNob3VsZENvbXBsZXRlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIC8vICAgbGV0IHsgbnZpbSB9ID0gd29ya3NwYWNlXG4gICAgICAgIC8vICAgbGV0IFssIGxudW0sIGNvbF0gPSBhd2FpdCBudmltLmNhbGwoJ2dldHBvcycsICcuJylcbiAgICAgICAgLy8gICByZXR1cm4gbG51bSA9PT0gMSAmJiBjb2wgPT09IDFcbiAgICAgICAgLy8gfSxcbiAgICAgICAgZG9Db21wbGV0ZTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGl0ZW1zID0gYXdhaXQgZ2V0U2NvcGVDb21wbGV0aW9uSXRlbXMoKVxuICAgICAgICAgIHJldHVybiBpdGVtc1xuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgKVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb2MubnZpbVwiKTsiLCIndXNlIHN0cmljdCc7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgTW9kdWxlID0gcmVxdWlyZSgnbW9kdWxlJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmNvbnN0IHJlc29sdmVGcm9tID0gKGZyb21EaXJlY3RvcnksIG1vZHVsZUlkLCBzaWxlbnQpID0+IHtcblx0aWYgKHR5cGVvZiBmcm9tRGlyZWN0b3J5ICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIFxcYGZyb21EaXJcXGAgdG8gYmUgb2YgdHlwZSBcXGBzdHJpbmdcXGAsIGdvdCBcXGAke3R5cGVvZiBmcm9tRGlyZWN0b3J5fVxcYGApO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGVJZCAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBcXGBtb2R1bGVJZFxcYCB0byBiZSBvZiB0eXBlIFxcYHN0cmluZ1xcYCwgZ290IFxcYCR7dHlwZW9mIG1vZHVsZUlkfVxcYGApO1xuXHR9XG5cblx0dHJ5IHtcblx0XHRmcm9tRGlyZWN0b3J5ID0gZnMucmVhbHBhdGhTeW5jKGZyb21EaXJlY3RvcnkpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChlcnJvci5jb2RlID09PSAnRU5PRU5UJykge1xuXHRcdFx0ZnJvbURpcmVjdG9yeSA9IHBhdGgucmVzb2x2ZShmcm9tRGlyZWN0b3J5KTtcblx0XHR9IGVsc2UgaWYgKHNpbGVudCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aHJvdyBlcnJvcjtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBmcm9tRmlsZSA9IHBhdGguam9pbihmcm9tRGlyZWN0b3J5LCAnbm9vcC5qcycpO1xuXG5cdGNvbnN0IHJlc29sdmVGaWxlTmFtZSA9ICgpID0+IE1vZHVsZS5fcmVzb2x2ZUZpbGVuYW1lKG1vZHVsZUlkLCB7XG5cdFx0aWQ6IGZyb21GaWxlLFxuXHRcdGZpbGVuYW1lOiBmcm9tRmlsZSxcblx0XHRwYXRoczogTW9kdWxlLl9ub2RlTW9kdWxlUGF0aHMoZnJvbURpcmVjdG9yeSlcblx0fSk7XG5cblx0aWYgKHNpbGVudCkge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gcmVzb2x2ZUZpbGVOYW1lKCk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzb2x2ZUZpbGVOYW1lKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmcm9tRGlyZWN0b3J5LCBtb2R1bGVJZCkgPT4gcmVzb2x2ZUZyb20oZnJvbURpcmVjdG9yeSwgbW9kdWxlSWQpO1xubW9kdWxlLmV4cG9ydHMuc2lsZW50ID0gKGZyb21EaXJlY3RvcnksIG1vZHVsZUlkKSA9PiByZXNvbHZlRnJvbShmcm9tRGlyZWN0b3J5LCBtb2R1bGVJZCwgdHJ1ZSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vZHVsZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9