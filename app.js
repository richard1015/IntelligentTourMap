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
        MongoClient.connect(app.config.mongodbUrl, function (err, client) {
          if (err) throw reject(err);
          const db = client.db(app.config.mongodbName);
          resolve({db,client});
        });
      })
    }
  });

  app.once('server', server => {
    // websocket
  });
  app.on('error', (err, ctx) => {
    // report error
  });
  app.on('request', ctx => {
    // log receive request
    ctx.logger.info('request starttime...', ctx.starttime);
    ctx.logger.info('request querystring ===', ctx.querystring);
  });
  app.on('response', ctx => {
    // ctx.starttime is set by framework
    const used = Date.now() - ctx.starttime;
    // log total cost
    ctx.logger.info('response endtime...', Date.now());
    ctx.logger.info('response time...', used);
  });
};
