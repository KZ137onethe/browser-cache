# 浏览器缓存

### 介绍

该项目是express服务端渲染网页的一个项目。主要探索浏览器相关的事情。

考虑到前端页面在该项目中不好管理和编写，之后会将前端单独起一个React子仓库，而且不再使用服务端渲染的架构（没有必要，刚开始因为简单就用了服务端渲染）

#### 目录

```bash
├─ app.js                  // 该项目的主应用文件
├─ bin                     // 通常用于存放可执行文件或启动脚本
│  └─ www                  //
├─ config                  // 存放配置文件，如日志配置
├─ public                  //  静态资源目录
├─ routes                  // 服务端路由定义
├─ temp                    // 临时文件目录
│  └─ cache                // 
├─ utils                   // 实用工具函数
└─ views                   // 视图文件，如HTML模板
```

#### 文档

[链接](https://o0ke9xr7eb.feishu.cn/docx/HYsXdGv6ToSaZTxiMdyc1aZinX4)

