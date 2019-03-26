
'use strict';

const Controller = require('./base');
/**
 * @controller school 学校接口
 */
class SchoolController extends Controller {
    /**
     * @summary 获取所有学校
     * @description 分页获取所有学校
     * @router get /school/query
     * @request query string keyword 模糊搜索name
     * @request query integer pageIndex 页码 默认 1
     * @request query integer pageSize 单页数量 默认 10
     * @response 200 schoolResponse 请求成功
     */
    async query() {
        const { ctx, service } = this;
        let pageIndex = Number(ctx.query.pageIndex || 1);
        let pageSize = Number(ctx.query.pageSize || 10);
        let keyword = ctx.query.keyword || "";
        this.success(await service.school.list(pageIndex, pageSize, { name: { $regex: new RegExp(keyword, 'i') } }))
    }
    /**
     * @summary 更新/创建
     * @description 创建 更新传 _id 创建不传_id
     * @router post /school/update
     * @request body school *body
     * @response 200 response 更新成功
     */
    async update() {
        this.success(await this.ctx.service.school.update(this.ctx.request.body))
    }
    /**
     * @summary 删除
     * @description 删除
     * @router delete /school/destroy/{id}
     * @request path string *id
     * @response 200 response 删除成功
     */
    async destroy() {
        this.success(await this.ctx.service.school.destroy(this.ctx.params.id))
    }
}

module.exports = SchoolController;
