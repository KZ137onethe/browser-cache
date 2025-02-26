const log4js = require("log4js");

log4js.configure({
  appenders: {
    cheese: {
      type: "dateFile",
      filename: "./logs/logs.log",
      pattern: "yyyy-MM-dd", // 日志模式
      keepFileExt: true, // 保存文件时文件会根据 pattern 携带额外的扩展名，开启后文件名为 logs.2022-05-23.log 而不是 logs.log
      alwaysIncludePattern: true, // 在当前日志文件的名称中包含模式，默认会将模式添加到文件末尾，如：logs.log.2022-05-23，开启 keepFileExt 后保存为 all-the-logs.2022-05-23.log
      daysToKeep: 14, // 日志保留时长，单位为天
      backups: 10, // 保留的旧日志文件数量
    },
  },
  categories: {
    default: { appenders: ["cheese"], level: "debug" },
  },
});

// 导出日志实例
const logger = log4js.getLogger();
module.exports = logger;
