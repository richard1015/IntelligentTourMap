'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        await this.ctx.render('map');
    }
    async logs() {
        if (this.ctx.query.info) {
            let loginfo = JSON.parse(this.ctx.query.info);
            loginfo.referer = this.ctx.headers.referer;
            this.ctx.logger.error(loginfo)
        }
    }
}

module.exports = HomeController;
