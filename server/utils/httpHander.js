const fs = require("fs");
const path = require("path");

/**
 * @param {string} _data
 */
function cb(_data) {}

/**
 * 响应对读取文件做的一些处理 - 错误处理，自动根据文件格式来设置response的响应类型
 * @param {string} fullPath - 文件路径
 * @param {object} opts - 配置对象
 * @param {http.ServerResponse} opts.res - response
 * @param {null | string} opts.format - 读取文件时的转换格式，null为默认
 * @param {cb} opts.callback - 读取文件成功后的回调函数
 */
function responseForReadFile(fullPath, opts = { res, format: null, callback }) {
  const { res, format, callback } = opts;
  fs.readFile(fullPath, format, function (err, data) {
    if (err) {
      res.statusCode = 404;
      res.end("Not Found!");
    } else {
      setContentTypeForResponse(fullPath, { res });
      callback(data);
    }
  });
}

/**
 * 返回不同的文件前设置对应的内容类型
 * @param {string} fullPath - 文件路径
 * @param {object} opt - 配置
 * @param {http.ServerResponse} opt.res
 */
function setContentTypeForResponse(fullPath, opt = { res }) {
  const suffix = path.extname(fullPath);
  const { res } = opt;
  switch (suffix) {
    case ".svg":
      res.setHeader("Content-Type", "image/svg+xml");
      break;
    case ".js":
      res.setHeader("Content-Type", "application/javascript");
      break;
    case ".html":
      res.setHeader("Content-Type", "text/html");
      break;
    case ".css":
      res.setHeader("Content-Type", "text/css, charset=utf-8");
      break;
    case ".png":
      res.setHeader("Content-Type", "image/png");
      break;
    case ".txt":
      res.setHeader("Content-Type", "text/plain");
      break;
    default:
      undefined;
  }
}

/**
 * 针对接口的请求方法做一些处理
 * @param {"GET" | "POST" | "PUT"} methods - 请求方法
 * @param {Function} callback - 回调函数
 */
function requestForMethod(methods, callback) {
  switch (methods) {
    case "GET":
      return callback();
    case "POST":
      return callback();
    case "PUT":
      return callback();
    default:
      undefined;
  }
}

module.exports = {
  responseForReadFile,
  setContentTypeForResponse,
  requestForMethod,
};
