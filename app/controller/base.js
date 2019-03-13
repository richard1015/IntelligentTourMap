'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
    success(data) {
        this.ctx.body = {
            success: true,
            data,
        };
    }

    notFound(msg) {
        msg = msg || 'not found';
        this.ctx.throw(404, msg);
    }
}

module.exports = BaseController;
