const http = require("http");
const path = require("path");
const log = require("./log4js")("default");
const { generateFileHash, responseForReadFile } = require("./utils");

const app = http.createServer(function (req, res) {
  const url = req.url;
  let fullPath;

  switch (url) {
    // 请求的是主页
    case "/":
      fullPath = path.join(__dirname, "../static/html/index.html");
      responseForReadFile(fullPath, {
        req,
        res,
        callback: (data) => {
          res.setHeader("Content-Type", "text/html");
          res.end(data);
        },
      });
      break;
    // 获取一句名言，使用的是强制缓存
    case "/dictum":
      fullPath = path.join(__dirname, "../static/assets/txt/dictum.txt");
      responseForReadFile(fullPath, {
        req,
        res,
        format: "utf-8",
        callback: (data) => {
          log.debug("请求路径 => '/dictum'");
          res.writeHead(200, {
            "Cache-Control": "max-age=10",
            "Content-Type": "text/plain",
          });
          res.end(data);
        },
      });
      break;
    // 获取一句话，使用的是强制缓存和协商缓存的结合
    case "/sentence":
      fullPath = path.join(__dirname, "../static/assets/txt/sentence.txt");
      responseForReadFile(fullPath, {
        req,
        res,
        format: "utf-8",
        callback: (data) => {
          log.debug("请求路径为 '/sentence'");
          const etag = generateFileHash(data, "content");
          const ifNoneMatch = req.headers["if-none-match"];
          const headers = {
            "Cache-Control": "max-age=12",
            ETag: generateFileHash(data, "content"),
            "Content-Type": "text/plain",
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
    // 默认请求静态资源，使用的是协商缓存
    default:
      fullPath = path.join(__dirname, "../static", url);
      // 获取fullPath的后缀名
      const suffix = path.extname(fullPath);
      if (suffix === ".js") {
        res.setHeader("Content-Type", "application/javascript");
      } else if (suffix === ".svg") {
        res.setHeader("Content-Type", "image/svg+xml");
      }
      responseForReadFile(fullPath, {
        req,
        res,
        callback: (data) => {
          log.debug(`静态资源请求路径 => ${url}`);
          const etag = generateFileHash(data, "content");
          const ifNoneMatch = req.headers["if-none-match"];
          log.debug("etag =>", etag, "ifNoneMatch => ", ifNoneMatch);
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
  }
});

app.listen(3000, () => {
  console.log("服务启动在 http://localhost:3000 !");
});
