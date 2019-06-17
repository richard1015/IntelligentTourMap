# IntelligentTourMap

前台  https://school.zhuzhida.vip
后台管理  http://schoolmgr.zhuzhida.vip
API文档地址 https://school.zhuzhida.vip/swagger-ui.html

智能导览图
功能说明：
1.目标导航
2.根据经纬度计算 自动播放
3.后台API 提供
3.1 文件上传 token验证
3.2 登录接口 
3.3 获取学校相关接口 （增删改查）token验证
3.4 获取标点相关接口 （增删改查）token验证
3.5 获取用户相关接口 （增删改查）token验证
4.后台WebSocket 日志 实时推送  token验证
5.swaager文档插件集成

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
│   │   ├── base.js  基类
│   │   ├── common.js 通用类
│   │   ├── home.js 
│   │   ├── school.js
│   │   └── user.js
│   ├── public
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
│   │   └── resources
│   ├── router.js
│   ├── service
│   │   ├── base.js
│   │   ├── school.js
│   │   └── user.js
│   └── view
│       ├── location.html
│       └── map.html
├── app.js
├── appveyor.yml
├── config
│   ├── config.default.js
│   └── plugin.js
├── jsconfig.json
├── logs
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