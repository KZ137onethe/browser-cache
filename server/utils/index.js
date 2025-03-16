const crypto = require("crypto");
const fs = require("fs");

/**
 * 对文件生成唯一的hash值
 * @param {string} val - 内容
 * @param {"file" | "content"} type - 内容的类型，file代表文件，content代表文件解析后的内容
 * @returns string
 */
function generateFileHash(val, type = "file") {
  let data;
  const hash = crypto.createHash("sha1");
  switch (type) {
    case "file":
      data = fs.readFileSync(val);
      break;
    case "content":
      data = val;
      break;
    default:
      undefined;
  }
  hash.update(data);
  return `${hash.digest("hex")}`;
}

/**
 * 获取文件最后的修改时间
 * @param {string} filePath
 * @returns string
 */
function getFileLastModifiedTime(filePath) {
  const stats = fs.statSync(filePath);
  return stats.mtime.toUTCString();
}

module.exports = {
  generateFileHash,
  getFileLastModifiedTime,
};
