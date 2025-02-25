import { getCacheControlContent } from "./parse.js";
import { popupMessageBox, fixFeedBackElementContent } from "./dom.js";

// 强制缓存测试
(function (doc) {
  const test1 = doc.querySelector("#test-1");
  const reqBtn = test1.querySelector("button#request-dictum");
  const feedBackEl = test1.querySelector("div.feed-back");
  let timeSpan = "";

  fixFeedBackElementContent(feedBackEl, { cache: false });

  // 强制缓存时间, 是否能对maxAge赋值, 页面记录强制缓存时间的计时器
  let maxAge = undefined,
    flag = false,
    timer = null;

  reqBtn.addEventListener("click", function () {
    fetch("/emoji", {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    })
      .then((response) => {
        if (response.ok) {
          if (!flag) {
            maxAge = getCacheControlContent(response.headers)["max-age"];
            timeSpan = fixFeedBackElementContent(feedBackEl, { cache: true });
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
              fixFeedBackElementContent(feedBackEl, { cache: false });
              maxAge = undefined;
              timeSpan = "";
              flag = false;
            }
          }, 100);
        }
        popupMessageBox(data);
      })
      .catch((error) => {
        console.log("请求失败 =>", error);
      });
  });
})(document);

// 强制缓存+协商缓存测试
(function (doc) {
  const test1 = doc.querySelector("#test-3");
  const reqBtn = test1.querySelector("button#request-sentence");
  const feedBackEl = test1.querySelector("div.feed-back");
  let timeSpan = "";

  fixFeedBackElementContent(feedBackEl, { cache: false });

  // 强制缓存时间, 是否能对maxAge赋值, 页面记录强制缓存时间的计时器
  let maxAge = undefined,
    flag = false,
    timer = null;

  reqBtn.addEventListener("click", function () {
    fetch("/sentence", {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    })
      .then((response) => {
        if (response.ok) {
          if (!flag) {
            maxAge = getCacheControlContent(response.headers)["max-age"];
            timeSpan = fixFeedBackElementContent(feedBackEl, { cache: true });
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
              fixFeedBackElementContent(feedBackEl, { cache: false });
              maxAge = undefined;
              timeSpan = "";
              flag = false;
            }
          }, 100);
        }
        popupMessageBox(data);
      })
      .catch((error) => {
        console.log("请求失败 =>", error);
      });
  });
})(document);
