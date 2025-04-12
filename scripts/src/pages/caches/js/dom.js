/**
 * 弹出消息框
 * @param {string} content - 消息框内容
 */
function popupMessageBox(content) {
  const fragment = document.createDocumentFragment();
  const divEl = document.createElement("div");
  Object.assign(divEl.style, {
    position: "absolute",
    textAlign: "center",
    padding: "5px 10px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    left: "50%",
    top: "15px",
    transform: "translate(-50%, 0)",
    boxShadow: "0 0 6px 1px #d4dde1",
    opacity: 1,
    color: "",
  });
  divEl.textContent = content;
  fragment.appendChild(divEl);

  const in_keyframes = new KeyframeEffect(
    divEl,
    [
      {
        opacity: 0,
        top: 0,
        transform: "translate(-50%, -100%)",
      },
      {
        opacity: 1,
        top: "15px",
        transform: "translate(-50%, 0)",
      },
    ],
    {
      duration: 100,
      easing: "ease-in",
    }
  );
  const in_animation = new Animation(in_keyframes, document.timeline);
  const out_keyframes = new KeyframeEffect(
    divEl,
    [
      {
        transform: "translate(-50%, 0)",
        opacity: 1,
      },
      {
        transform: "translate(-50%, -50%)",
        top: "7px",
      },
      {
        transform: "translate(-50%, -100%)",
        top: "0px",
      },
    ],
    {
      delay: 800,
      duration: 300,
    }
  );
  const out_animation = new Animation(out_keyframes, document.timeline);
  document.body.appendChild(fragment);
  in_animation.play();
  in_animation.addEventListener("finish", () => {
    out_animation.play();
  });

  out_animation.addEventListener("finish", () => {
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
