'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {

    /**
     * 检查token是否有效
     */
    get checked() {
        let token = this.ctx.header.token
        if (token) {
            if (!this.app.cache.tokens.includes(token)) {
                this.error('token失效', 201);
                return false;
            }
        } else {
            this.error('token失效', 201);
            return false;
        }
        return true;
    }

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
    /**
     * 
     * @param {*} errmsg 错误信息提示
     * @param {*} status 200 成功 201失效
     */
    error(errmsg, status = 200) {
        this.ctx.body = {
            status,
            success: false,
            errorMsg: errmsg,
        };
    }
}

module.exports = BaseController;
