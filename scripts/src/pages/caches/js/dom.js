/**
 * 弹出消息框
 * @param {string} content - 消息框内容
 */
function popupMessageBox(content) {
  const fragment = document.createDocumentFragment();
  const divEl = document.createElement("div");
  Object.assign(divEl.style, {
    position: "fixed",
    textAlign: "center",
    padding: "5px",
    border: "1px solid #206864",
    backgroundColor: "#f5f3f2",
    left: "50%",
    top: "15px",
    transform: "translate(-50%, 0)",
    color: "",
  });
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

export { popupMessageBox, fixFeedBackElementContent };
