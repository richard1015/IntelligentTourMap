
'use strict';

const Controller = require('./base');
class SchoolController extends Controller {
    async index() {
        this.success(await this.ctx.service.school.list())
    }
    async update() {
        this.success(await this.ctx.service.school.update(this.ctx.params))
    }
    async destroy() {
        this.success(await this.ctx.service.school.destroy(this.ctx.params.id))
    }
}

module.exports = SchoolController;
