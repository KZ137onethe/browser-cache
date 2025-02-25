const http = require("http");
const path = require("path");
const log = require("./log4js")("default");
const { generateFileHash, getFileLastModifiedTime } = require("./utils/format");
const { responseForReadFile } = require("./utils/httpHander");

const app = http.createServer(function (req, res) {
  const url = req.url;
  let fullPath;

  switch (url) {
    // 请求的是主页
    case "/":
      fullPath = path.join(__dirname, "../static/html/index.html");
      responseForReadFile(fullPath, {
        res,
        callback: (data) => {
          res.setHeader("Cache-Control", "no-store");
          res.end(data);
        },
      });
      break;
    // 获取 emoji，使用的是强制缓存
    case "/emoji":
      fullPath = path.join(__dirname, "../static/assets/txt/emoji.txt");
      responseForReadFile(fullPath, {
        res,
        format: "utf-8",
        callback: (data) => {
          log.debug("请求路径 => '/emoji'");
          res.writeHead(200, {
            "Cache-Control": "max-age=10",
          });
          res.end(data);
        },
      });
      break;
    // 获取 每日一言，使用的是协商缓存
    case "/dictum":
      fullPath = path.join(__dirname, "../static/assets/txt/dictum.txt");
      responseForReadFile(fullPath, {
        res,
        format: "utf-8",
        callback: (data) => {
          log.debug("请求路径 => '/dictum'");
          const etag = generateFileHash(data, "content");
          const ifNoneMatch = req.headers["if-none-match"];
          if (ifNoneMatch && ifNoneMatch === etag) {
            res.writeHead(304, {
              ETag: etag,
            });
            res.end();
          } else {
            res.writeHead(200, {
              ETag: etag,
            });
            res.end(data);
          }
        },
      });
      break;
    // 获取一句话，使用的是强制缓存和协商缓存的结合
    case "/sentence":
      fullPath = path.join(__dirname, "../static/assets/txt/sentence.txt");
      responseForReadFile(fullPath, {
        res,
        format: "utf-8",
        callback: (data) => {
          log.debug("请求路径为 '/sentence'");
          const etag = generateFileHash(data, "content");
          const ifNoneMatch = req.headers["if-none-match"];
          const headers = {
            "Cache-Control": "max-age=12",
            ETag: generateFileHash(data, "content"),
          };
          if (ifNoneMatch && ifNoneMatch === etag) {
            res.writeHead(304, headers);
            res.end();
          } else {
            res.writeHead(200, headers);
            res.end(data);
          }
        },
      });
      break;
    // 默认请求静态资源和脚本资源，使用的是协商缓存
    default:
      fullPath = path.join(__dirname, "../static", url);
      responseForReadFile(fullPath, {
        res,
        callback: (data) => {
          log.debug(`静态资源请求路径 => ${url}`);
          const lastModified = getFileLastModifiedTime(fullPath);
          const ifModifiedSince = req.headers["if-modified-since"];
          res.setHeader("Last-Modified", lastModified);
          // 浏览器需要明确知道资源可缓存，才会在后续请求中发送 If-Modified-Since
          res.setHeader("Cache-Control", "public, max-age=0");
          if (ifModifiedSince && ifModifiedSince === lastModified) {
            res.statusCode = 304;
            res.end();
          } else {
            res.statusCode = 200;
            res.end(data);
          }
        },
      });
  }
});

app.listen(3000, () => {
  console.log("服务启动在 http://localhost:3000 !");
});
