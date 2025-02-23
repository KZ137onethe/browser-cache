const log4js = require("log4js");
const path = require("path");

log4js.configure({
  appenders: {
    cheese: {
      type: "file",
      daysToKeep: 5, // 删除5天前的日志
      filename: path.join(__dirname, "./logs/cheese.log"),
      keepFileExt: false,
      compress: true,
    },
  },
  categories: {
    default: { appenders: ["cheese"], level: "debug" },
  },
});

module.exports = function getLogger(category) {
  return log4js.getLogger(category);
};
