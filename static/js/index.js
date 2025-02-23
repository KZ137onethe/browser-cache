import { getCacheControlContent } from "./utils.js";

// 强制缓存测试
(function (doc) {
  const test1 = doc.querySelector("div.test-1");
  const sendBtn = test1.querySelector("button#send");
  const feedBackContent = test1.querySelector("span.feed-back");

  // 强制缓存时间, 是否能对maxAge赋值, 页面记录强制缓存时间的计时器
  let maxAge = undefined,
    flag = false,
    timer = null;

  sendBtn.addEventListener("click", function () {
    fetch("http://localhost:3000/dictum", {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    })
      .then((response) => {
        if (response.ok) {
          if (!flag) {
            maxAge = getCacheControlContent(response.headers)["max-age"];
            flag = true;
          }
          return response.text();
        }
      })
      .then((data) => {
        if (!feedBackContent.innerHTML && maxAge) {
          feedBackContent.innerHTML = maxAge;
          timer = setInterval(() => {
            feedBackContent.innerHTML = --maxAge;
            if (maxAge <= 0) {
              clearInterval(timer);
              feedBackContent.innerHTML = "";
              maxAge = undefined;
              flag = false;
            }
          }, 1000);
        }
        alert(data);
      })
      .catch((error) => {
        console.log("请求失败 =>", error);
      });
  });
})(document);

// 强制缓存+协商缓存测试
(function (doc) {
  const test2 = doc.querySelector("div.test-2");
  const sendBtn = test2.querySelector("button#send");
  const feedBackContent = test2.querySelector("span.feed-back");

  // 强制缓存时间, 是否能对maxAge赋值, 页面记录强制缓存时间的计时器
  let maxAge = undefined,
    flag = false,
    timer = null;

  sendBtn.addEventListener("click", function () {
    fetch("http://localhost:3000/sentence", {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    })
      .then((response) => {
        if (response.ok) {
          if (!flag) {
            maxAge = getCacheControlContent(response.headers)["max-age"];
            flag = true;
          }
          return response.text();
        }
      })
      .then((data) => {
        if (!feedBackContent.innerHTML && maxAge) {
          feedBackContent.innerHTML = maxAge;
          timer = setInterval(() => {
            feedBackContent.innerHTML = --maxAge;
            if (maxAge <= 0) {
              clearInterval(timer);
              feedBackContent.innerHTML = "";
              maxAge = undefined;
              flag = false;
            }
          }, 1000);
        }
        alert(data);
      })
      .catch((error) => {
        console.log("请求失败 =>", error);
      });
  });
})(document);
