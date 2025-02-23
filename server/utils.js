const crypto = require("crypto");
const fs = require("fs");

// 对文件生成唯一的hash值
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

// 将日期字符串转换为GMT格式
function formatToGMT(dateString) {
  // 将输入字符串分割为年、月、日、时、分、秒
  const parts = dateString.split(/[- :]/);
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // 月份从 0 开始
  const day = parseInt(parts[2], 10);
  const hour = parseInt(parts[3], 10);
  const minute = parseInt(parts[4], 10);
  const second = parseInt(parts[5], 10);

  // 创建 UTC 时间的 Date 对象
  const date = new Date(Date.UTC(year, month, day, hour, minute, second));

  // 直接调用 toUTCString() 生成目标格式
  return date.toUTCString();
}

function responseForReadFile(
  path,
  opts = { req, res, format: null, callback }
) {
  const { res, format, callback } = opts;
  fs.readFile(path, format, function (err, data) {
    if (err) {
      res.statusCode = 500;
      res.end(err.message);
    } else {
      callback(data);
    }
  });
}

module.exports = {
  generateFileHash,
  formatToGMT,
  responseForReadFile,
};
