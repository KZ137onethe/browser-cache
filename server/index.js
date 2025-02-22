const http = require("http");
const path = require("path");
const fs = require("fs");
const {
  generateFileHash,
  formatToGMT,
  responseForReadFile,
} = require("./utils");

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
    case "/dictum":
      fullPath = path.join(__dirname, "../static/assets/txt/info.txt");
      responseForReadFile(fullPath, {
        req,
        res,
        callback: (data) => {
          console.log("请求路径为 /dictum");
          res.writeHead(200, {
            "Cache-Control": "max-age=10",
          });
          console.log(data);
          res.end(data);
        },
      });
    // 默认请求静态资源，使用的是协商缓存
    default:
      fullPath = path.join(__dirname, "../static", url);
      responseForReadFile(fullPath, {
        req,
        res,
        callback: (data) => {
          // console.log(`静态资源请求路径为 ${path.join("static", url)}`);
          const etag = generateFileHash(data, "content");
          const ifNoneMatch = req.headers["if-none-match"];
          // console.log("etag =>", etag, "ifNoneMatch => ", ifNoneMatch);

          if (ifNoneMatch && ifNoneMatch === etag) {
            res.writeHead(304, {
              ETag: etag,
            });
            res.end();
          } else {
            res.writeHead(200, {
              ETag: generateFileHash(data, "content"),
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
