# IntelligentTourMap 智能导览图

项目地址 https://github.com/richard1015/IntelligentTourMap

技术栈 eggjs、MongoDB、swagger、websocket、Amap

演示地址：
- 前台  https://school.zhuzhida.vip
- API文档地址 https://school.zhuzhida.vip/swagger-ui.html

- 后台管理  http://schoolmgr.zhuzhida.vip
- 后台管理源码 > https://github.com/richard1015/IntelligentTourMapManager

## 功能说明

- 1.目标导航
- 2.根据经纬度计算 自动播放
- 3.后台API 提供
- 3.1 文件上传 token验证
- 3.2 登录接口
- 3.3 获取学校相关接口 （增删改查）token验证
- 3.4 获取标点相关接口 （增删改查）token验证
- 3.5 获取用户相关接口 （增删改查）token验证
- 4.后台WebSocket 日志 实时推送  token验证
- 5.swaager文档插件集成

## 功能截图

![](https://user-gold-cdn.xitu.io/2019/6/18/16b69d110dae11a7?w=829&h=2240&f=png&s=184018)
![](https://user-gold-cdn.xitu.io/2019/6/18/16b69d14eb0e5e05?w=389&h=684&f=png&s=192561)
![](https://user-gold-cdn.xitu.io/2019/6/18/16b69d1600335a2a?w=386&h=685&f=png&s=123761)
![](https://user-gold-cdn.xitu.io/2019/6/18/16b69d17307a8655?w=389&h=684&f=png&s=222285)
## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7002/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org


### doc tree

```bash
├── README.md 说明文件
├── app
│   ├── contract swagger文档model类
│   │   └── model.js
│   ├── controller 控制器
│   │   ├── base.js  基类 token检查逻辑  通用返回标识符逻辑
│   │   ├── common.js 通用类
│   │   ├── home.js 默认首页逻辑
│   │   ├── school.js  院校相关逻辑
│   │   ├── spot.js  标点相关逻辑
│   │   └── user.js 用户相关逻辑
│   ├── public 静态资源存放处
│   │   ├── css
│   │   │   └── reset.css
│   │   ├── images
│   │   │   ├── offAuto.png
│   │   │   ├── onAuto.png
│   │   │   ├── play1.gif
│   │   │   ├── play2.png
│   │   │   └── play3.png
│   │   ├── lib
│   │   │   ├── jquery-3.3.1.js
│   │   │   ├── layer_mobile
│   │   │   │   ├── layer.js
│   │   │   │   └── need
│   │   │   │       └── layer.css
│   │   │   └── rem.js
│   │   └── resources 上传文件 存放处
│   ├── router.js 项目路由
│   ├── service
│   │   ├── base.js 基类 MongoDB增删改查封装底层
│   │   ├── school.js 院校数据处理逻辑
│   │   ├── spot.js 标点数据处理逻辑
│   │   └── user.js 后台用户数据处理逻辑
│   └── view
│       └── map.html 后台展示首页
├── app.js 项目初始逻辑 MongoDB检测机制，websocket日志推送启动
├── appveyor.yml
├── config
│   ├── config.default.js 项目配置文件
│   └── plugin.js 插件配置
├── jsconfig.json
├── logs 日志文件
│   └── IntelligentTourMap
│       ├── IntelligentTourMap-web.log
│       ├── common-error.log
│       ├── egg-agent.log
│       ├── egg-schedule.log
│       └── egg-web.log
├── package-lock.json
├── package.json
├── run
│   ├── agent_config.json
│   ├── agent_config_meta.json
│   ├── agent_timing_31076.json
│   ├── application_config.json
│   ├── application_config_meta.json
│   ├── application_timing_31085.json
│   └── router.json
├── test
│   └── app
│       └── controller
│           └── home.test.js
└── typings
    ├── app
    │   ├── controller
    │   │   └── index.d.ts
    │   ├── index.d.ts
    │   └── service
    │       └── index.d.ts
    └── config
        ├── index.d.ts
        └── plugin.d.ts
```