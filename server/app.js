const express = require("express");
const bodyParser = require("body-parser");
const log4js = require("log4js");
const logger = require("./config/log4js");

const app = express();

// 导入路由
const cacheRouter = require("./routes/cache");
const pageRouter = require("./routes/page");

// 默认禁用etag
app.set("etag", false);
// 创建 application/json 解析
app.use(bodyParser.json());
// 使用 log4js 中间件记录 HTTP 请求日志
app.use(
  log4js.connectLogger(logger, {
    level: "auto", // 自动根据 HTTP 状态码设置日志级别
    format: ":method :url :status [:response-timems]", // 日志格式
  })
);

// 指定静态资源文件目录，这里使用的是协商缓存
app.use(
  express.static("views/index", {
    etag: false,
    // 虽然默认也是0，但是需要注意
    maxAge: 0,
  })
);
app.use(
  "/scripts",
  express.static("views/scripts", {
    etag: false,
    maxAge: 0,
  })
);

// 使用路由
app.use("/api/caches", cacheRouter);
app.use("/", pageRouter);

module.exports = app;
