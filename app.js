/* eslint-disable strict */
module.exports = app => {

  app.beforeStart(async () => {
    // 设置自定义 服务、参数等  ，例如 注入缓存readis 等等
    app.logger.info('app beforeStart... begin');
    // check 网络通信
    // 保证应用启动监听端口前数据已经准备好了
    // 后续数据的更新由定时任务自动触发
    app.logger.info('app mongodb... begin');
    // Connection URL
    const MongoClient = require('mongodb').MongoClient;
    app.getMongodb = () => {
      return new Promise((resolve, reject) => {
        console.log(app)
        MongoClient.connect(app.config.mongodbUrl, function (err, client) {
          if (err) throw reject(err);
          const db = client.db(app.config.mongodbName);
          resolve({ db, client });
        });
      })
    }
    // 后续数据的更新由定时任务自动触发
    app.logger.info('app cache token reset ');
    // 缓存数据
    app.cache = { tokens: [] };
    // websocket缓存链接
    app.wsClients = new Set();
  });

  app.once('server', server => {
    // websocket
    app.logger.info('web socket started');

    var WebSocketServer = require('ws').Server;
    var wss = new WebSocketServer({ port: 3344 });
    wss.on('connection', function connection(ws, req) {
      ws.on('message', function incoming(message) {
        const ip = req.connection.remoteAddress;
        app.logger.info(ip + 'received: %s', message);
        if (!app.cache.tokens.includes(message)) {
          app.logger.info('失效token' + message + '已强制关闭该链接！')
          ws.send('权限不足,请重新登录后台系统！');
          ws.close();
        } else {
          app.logger.info(message + '已连接！')
          ws.send('已成功连接服务器！');
          app.wsClients.add(ws)
        }
      });
      ws.on('close', function (code, reason) {
        this.close();
        app.wsClients.delete(this)
        app.logger.info('socket 断开')
      })
    });
    setInterval(() => {
      app.logger.info('当前缓存tokens' + app.cache.tokens);
      app.logger.info('当前后台实时日志在线人数' + app.wsClients.size);
    }, 1000 * 60 * 10);
  });
  app.on('error', (err, ctx) => {
    // report error
  });
  app.on('request', ctx => {
    // log receive request
    // ctx.logger.info('request starttime...', ctx.starttime);
    // ctx.logger.info('request querystring ===', ctx.querystring);
    app.wsClients.forEach(ws => {
      try {
        ws.send(JSON.stringify(ctx));
      } catch (error) {
        ws.close();
        app.wsClients.delete(ws)
      }
    });
  });
  app.on('response', ctx => {
    // ctx.starttime is set by framework
    const used = Date.now() - ctx.starttime;
    // log total cost
    // ctx.logger.info('response endtime...', Date.now());
    ctx.logger.info('response time...', used);
  });
};
