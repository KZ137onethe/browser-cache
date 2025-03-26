# 浏览器缓存

### 介绍

务必使用pnpm包管理器

后端：`express` 搭建

前端：`webpack5` + 原生JavaScript

文档：[链接](https://o0ke9xr7eb.feishu.cn/docx/HYsXdGv6ToSaZTxiMdyc1aZinX4)

#### 目录

本仓库是个monorepo架构

```bash
├─ .prettierrc                        // 格式化文件
├─ package.json                       // 仓库声明
├─ pnpm-workspace.yaml                // 子包管理
├─ scripts                            // 前端
│  ├─ src                             // 前端-源代码目录
│  │  └─ pages                        // 前端-源代码目录-页面
│  └─ webpack.config.js               // webpack5配置文件，用与打包前端文件
└─ server                             // 后端
   ├─ app.js                          // 后端-该项目的主应用文件
   ├─ bin                             // 后端-通常用于存放可执行文件或启动脚本
   │  └─ www                          //
   ├─ config                          // 后端-存放配置文件，如日志配置
   ├─ routes                          // 后端-服务端路由定义
   │  ├─ cache.js                     //
   │  └─ page.js                      //
   ├─ temp                            // 后端-临时文件目录
   └─ utils                           // 后端-实用工具函数
```

### 使用须知

1. 进行前端静态资源打包，执行`pnpm scripts:bundle`，它会监听前端静态资源的变化重新打包
2. 启动服务器，执行`pnpm start`，运行本地服务器
