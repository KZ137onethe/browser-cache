const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

const basePath = path.join(__dirname, "../views");


router.get("/", (req, res) => {
  const fullPath = path.join(basePath, "./index/index.html");
  fs.readFile(fullPath, function (err, data) {
    if (err) {
      res.statusCode = 404;
      res.send("Not Found");
    } else {
      res.setHeader("Content-Type", "text/html");
      res.send(data);
    }
  });
});

module.exports = router;
