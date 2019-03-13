'use strict';

const Controller = require('./base');

class UserController extends Controller {
    async index() {
        this.success(await this.ctx.service.user.list())
    }
    async update() {
        this.success(await this.ctx.service.user.update(this.ctx.params))
    }
    async destroy() {
        this.success(await this.ctx.service.user.destroy(this.ctx.params.id))
    }
}

module.exports = UserController;
