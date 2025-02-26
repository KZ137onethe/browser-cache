import { getCacheControlContent } from "./parse.js";
import { popupMessageBox, fixFeedBackElementContent } from "./dom.js";

// 强制缓存测试
(function (doc) {
  const test1ContentEl = doc.querySelector("#test-1 > .content");
  const reqBtn = test1ContentEl.querySelector(".request > button#fruit");
  const feedBackEl = test1ContentEl.querySelector(".feed-back");
  let timeSpan = "";

  fixFeedBackElementContent(feedBackEl, { cache: false });

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
        popupMessageBox(data);
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
      .then((data) => {
        popupMessageBox(data);
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

  fixFeedBackElementContent(feedBackEl, { cache: false });

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
      .then((data) => {
        popupMessageBox(data);
        inputEl.value = "";
      })
  );
})(document);
