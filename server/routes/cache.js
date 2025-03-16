const path = require("path");
const fs = require("fs");
const express = require("express");
const router = express.Router();

const { generateFileHash } = require("../utils/index");

const basePath = path.join(__dirname, "../temp/cache");

// 强制缓存测试接口 - 获取蔬菜emoji
router.get("/emoji", function (req, res) {
  const fullPath = path.join(basePath, "emoji.txt");
  fs.readFile(fullPath, "utf-8", (err, data) => {
    if (!err) {
      res.setHeader("Cache-Control", "max-age=60");
      res.send(data);
    }
  });
});

// 协商缓存测试接口 - 获取名言
router.get("/dictum", (req, res) => {
  const fullPath = path.join(basePath, "/dictum.txt");
  fs.readFile(fullPath, "utf-8", (err, data) => {
    if (!err) {
      const etag = generateFileHash(data, "content");
      const ifNoneMatch = req.headers["if-none-match"];
      if (ifNoneMatch && ifNoneMatch === etag) {
        res.writeHead(304, {
          ETag: etag,
        });
      } else {
        res.writeHead(200, {
          ETag: etag,
        });
        res.end(data);
      }
    }
  });
});

// 协商缓存测试接口 - 修改名言
router.put("/dictum", (req, res) => {
  const fullPath = path.join(basePath, "/dictum.txt");
  const putType = req.headers["x-put-type"];
  const { data: content } = req.body;
  fs.writeFile(
    fullPath,
    content,
    {
      flag: putType === "cover" ? "w" : putType === "append" ? "a" : undefined,
      encoding: "utf-8",
    },
    (err) => {
      if (!err) {
        res.writeHead(204, {
          "cache-control": "public",
        });
        res.end();
      }
    }
  );
});

// 强制缓存+协商缓存测试接口 - 获取一句话
router.get("/sentence", (req, res) => {
  const fullPath = path.join(basePath, "/sentence.txt");
  fs.readFile(fullPath, "utf-8", (err, data) => {
    if (!err) {
      const etag = generateFileHash(data, "content");
      const ifNoneMatch = req.headers["if-none-match"];
      const headers = {
        "Cache-Control": "max-age=3600",
        ETag: generateFileHash(data, "content"),
      };
      if (ifNoneMatch && ifNoneMatch === etag) {
        res.writeHead(304, headers);
        res.end();
      } else {
        res.writeHead(200, headers);
        res.end(data);
      }
    }
  });
});

// 强制缓存+协商缓存测试接口 - 修改一句话
router.put("/sentence", (req, res) => {
  const fullPath = path.join(basePath, "/sentence.txt");
  const putType = req.headers["x-put-type"];
  const { data: content } = req.body;
  fs.writeFile(
    fullPath,
    content,
    {
      flag: putType === "cover" ? "w" : putType === "append" ? "a" : undefined,
      encoding: "utf-8",
    },
    (err) => {
      if (!err) {
        res.writeHead(204, {
          "cache-control": "max-age=3600",
        });
        res.end();
      }
    }
  );
});

module.exports = router;
