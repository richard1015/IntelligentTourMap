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

    error(errmsg) {
        this.ctx.body = {
            success: false,
            errorMsg: errmsg,
        };
    }
}

module.exports = BaseController;
