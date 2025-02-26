const log4js = require("log4js");

log4js.configure({
  appenders: {
    cheese: {
      type: "file",
      daysToKeep: 5, // 删除5天前的日志
      filename: "logs/cheese.log",
      compress: true, // 合并
      backups: 3, // 保留的旧日志文件数量
    },
  },
  categories: {
    default: { appenders: ["cheese"], level: "debug" },
  },
});

// 导出日志实例
const logger = log4js.getLogger();
module.exports = logger;
