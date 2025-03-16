/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index/js/dom.js":
/*!*************************!*\
  !*** ./index/js/dom.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fixFeedBackElementContent: () => (/* binding */ fixFeedBackElementContent),
/* harmony export */   popupMessageBox: () => (/* binding */ popupMessageBox)
/* harmony export */ });
/**
 * 弹出消息框
 * @param {string} content - 消息框内容
 */
function popupMessageBox(content) {
  const fragment = document.createDocumentFragment();
  const divEl = document.createElement("div");
  divEl.style.position = "fixed";
  divEl.style.textAlign = "center";
  divEl.style.padding = "5px";
  divEl.style.border = "1px solid #206864";
  divEl.style.backgroundColor = "#f5f3f2";
  divEl.style.left = "50%";
  divEl.style.top = "15px";
  divEl.style.transform = "translate(-50%, 0)";
  divEl.style.color = "";
  divEl.textContent = content;
  fragment.appendChild(divEl);

  const keyframes = new KeyframeEffect(
    divEl,
    [
      {
        transform: "translate(-50%, 0)",
        opacity: 1,
      },
      {
        transform: "translate(-50%, -50%)",
        top: "7px",
        opacity: 0.8,
      },
      {
        transform: "translate(-50%, -100%)",
        top: "0px",
        opacity: 0,
      },
    ],
    {
      duration: 1000,
    }
  );
  const animation = new Animation(keyframes, document.timeline);
  document.documentElement.appendChild(fragment);
  animation.play();
  animation.addEventListener("finish", () => {
    // 动画完成，移除该dom元素
    divEl.remove();
  });
}

/**
 *
 * @param {HTMLDivElement} el - 挂载的dom元素
 * @param {object} opts 配置对象
 * @param {boolean} opts.cache - 是否存在浏览器磁盘缓存
 */
function fixFeedBackElementContent(el, opts = { cache: true }) {
  // 清空el中所有的内容
  el.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const span = document.createElement("span");
  let color = "";
  try {
    if (opts.cache) {
      const span1 = span.cloneNode(false),
        operationSpan = span.cloneNode(false),
        span2 = span.cloneNode(false);

      span1.textContent = "浏览器磁盘缓存内容倒计时:";
      span2.textContent = "s";
      fragment.append(span1, operationSpan, span2);
      color = "red";
      return operationSpan;
    } else {
      const tipSpan = span.cloneNode(false);
      tipSpan.textContent = "该请求当前没有浏览器的磁盘缓存";
      fragment.appendChild(tipSpan);
      color = "green";
    }
  } finally {
    el.appendChild(fragment);
    el.style.outlineWidth = "1px";
    el.style.color = color;
  }
}




/***/ }),

/***/ "./index/js/parse.js":
/*!***************************!*\
  !*** ./index/js/parse.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCacheControlContent: () => (/* binding */ getCacheControlContent)
/* harmony export */ });
/**
 * 转化响应标头中的CacheControl为对象
 * @param {Headers} headers - Headers对象
 * @returns object
 * @example { 'max-age': 100, public: true }
 */
function getCacheControlContent(headers) {
  const data = {};
  const headersArr = headers
    .get("Cache-Control")
    .split(",")
    .map((item) => item.split("="));
  headersArr.forEach((item) => {
    const [key, val] = item;
    if (val !== undefined) {
      data[key] = val;
    } else {
      data[key] = true;
    }
  });
  return data;
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./index/js/index.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse.js */ "./index/js/parse.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ "./index/js/dom.js");



// 强制缓存测试
(function (doc) {
  const test1ContentEl = doc.querySelector("#test-1 > .content");
  const reqBtn = test1ContentEl.querySelector(".request > button#fruit");
  const feedBackEl = test1ContentEl.querySelector(".feed-back");
  let timeSpan = "";

  (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.fixFeedBackElementContent)(feedBackEl, { cache: false });

  // 强制缓存时间, 是否能对maxAge赋值, 页面记录强制缓存时间的计时器
  let maxAge = undefined,
    flag = false,
    timer = null;

  reqBtn.addEventListener("click", function () {
    fetch("/api/caches/emoji", {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    })
      .then((response) => {
        if (response.ok) {
          if (!flag) {
            maxAge = (0,_parse_js__WEBPACK_IMPORTED_MODULE_0__.getCacheControlContent)(response.headers)["max-age"];
            timeSpan = (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.fixFeedBackElementContent)(feedBackEl, { cache: true });
            timeSpan.textContent = maxAge;
            flag = true;
          }
          return response.text();
        }
      })
      .then((data) => {
        if (timeSpan && timeSpan.textContent !== 0 && !timer) {
          timer = setInterval(() => {
            timeSpan.textContent = (timeSpan.textContent - 0.1).toFixed(1);
            if (timeSpan.textContent <= 0) {
              clearInterval(timer);
              timer = null;
              (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.fixFeedBackElementContent)(feedBackEl, { cache: false });
              maxAge = undefined;
              timeSpan = "";
              flag = false;
            }
          }, 100);
        }
        (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.popupMessageBox)(data);
      })
      .catch((error) => {
        console.log("请求失败 =>", error);
      });
  });
})(document);

// 协商缓存测试
(function (doc) {
  const test2ContentEl = doc.querySelector("#test-2 > .content");
  // 发送请求
  const reqBtn = test2ContentEl.querySelector(".request > button#dictum");
  reqBtn.addEventListener("click", function () {
    fetch("/api/caches/dictum", {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
      })
      .then((data) => {
        (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.popupMessageBox)(data);
      })
      .catch((error) => {
        console.log("请求失败 =>", error);
      });
  });

  // 修改该请求的服务器资源
  const modifyEl = test2ContentEl.querySelector(".modify");
  const selectEl = modifyEl.querySelector("select");
  const inputEl = modifyEl.querySelector("input");
  const submitBtnEl = modifyEl.querySelector("button.submit");

  let putType = "cover";
  let inputText = "";
  selectEl.addEventListener("input", (e) => {
    putType = e.target.value;
  });
  inputEl.addEventListener("input", (e) => {
    inputText = e.target.value;
  });
  submitBtnEl.addEventListener("click", () =>
    fetch("/api/caches/dictum", {
      method: "PUT",
      headers: {
        "X-Put-Type": putType,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: inputText,
      }),
    })
      .then((reponse) => {
        if (reponse.ok) {
          return reponse.text();
        }
      })
      .then(() => {
        (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.popupMessageBox)("修改成功");
        inputEl.value = "";
      })
  );
})(document);

// 强制缓存+协商缓存测试
(function (doc) {
  const test3ContentEl = doc.querySelector("#test-3 > .content");
  // 强缓测试
  const reqBtn = test3ContentEl.querySelector(".request > button#sentence");
  const feedBackEl = test3ContentEl.querySelector(".feed-back");
  let timeSpan = "";

  (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.fixFeedBackElementContent)(feedBackEl, { cache: false });

  // 强制缓存时间, 是否能对maxAge赋值, 页面记录强制缓存时间的计时器
  let maxAge = undefined,
    flag = false,
    timer = null;

  reqBtn.addEventListener("click", function () {
    fetch("/api/caches/sentence", {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    })
      .then((response) => {
        if (response.ok) {
          if (!flag) {
            maxAge = (0,_parse_js__WEBPACK_IMPORTED_MODULE_0__.getCacheControlContent)(response.headers)["max-age"];
            timeSpan = (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.fixFeedBackElementContent)(feedBackEl, { cache: true });
            timeSpan.textContent = maxAge;
            flag = true;
          }
          return response.text();
        }
      })
      .then((data) => {
        if (timeSpan && timeSpan.textContent !== 0 && !timer) {
          timer = setInterval(() => {
            timeSpan.textContent = (timeSpan.textContent - 0.1).toFixed(1);
            if (timeSpan.textContent <= 0) {
              clearInterval(timer);
              timer = null;
              (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.fixFeedBackElementContent)(feedBackEl, { cache: false });
              maxAge = undefined;
              timeSpan = "";
              flag = false;
            }
          }, 100);
        }
        (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.popupMessageBox)(data);
      })
      .catch((error) => {
        console.log("请求失败 =>", error);
      });
  });

  // 协商缓存测试
  // 修改该请求的服务器资源
  const modifyEl = test3ContentEl.querySelector(".modify");
  const selectEl = modifyEl.querySelector("select");
  const inputEl = modifyEl.querySelector("input");
  const submitBtnEl = modifyEl.querySelector("button.submit");

  let putType = "cover";
  let inputText = "";
  selectEl.addEventListener("input", (e) => {
    putType = e.target.value;
  });
  inputEl.addEventListener("input", (e) => {
    inputText = e.target.value;
  });
  submitBtnEl.addEventListener("click", () =>
    fetch("/api/caches/sentence", {
      method: "PUT",
      headers: {
        "X-Put-Type": putType,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: inputText,
      }),
    })
      .then((reponse) => {
        if (reponse.ok) {
          return reponse.text();
        }
      })
      .then(() => {
        (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.popupMessageBox)("修改成功");
        inputEl.value = "";
      })
  );
})(document);

})();

/******/ })()
;
//# sourceMappingURL=index.c9c55.js.map