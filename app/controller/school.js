
'use strict';

const Controller = require('./base');
/**
 * @controller school 学校接口
 */
class SchoolController extends Controller {
    /**
     * @summary 获取所有学校标注点
     * @description 分页获取标注点
     * @router get /school/query
     * @request query integer pageIndex 页码 默认 1
     * @request query integer pageSize 单页数量 默认 10
     * @response 200 schoolResponse 请求成功
     */
    async query() {
        const { ctx, service } = this;
        let pageIndex = Number(ctx.query.pageIndex || 1);
        let pageSize = Number(ctx.query.pageSize || 10);
        this.success(await service.school.list(pageIndex, pageSize))
    }
    /**
     * @summary 更新用户/创建用户
     * @description 创建用户 更新用户传 _id 创建用户不传
     * @router post /school/update
     * @request body school *body
     * @response 200 response 更新成功
     */
    async update() {
        this.success(await this.ctx.service.school.update(this.ctx.params))
    }
    /**
     * @summary 删除标注点
     * @description 删除标注点
     * @router delete /school/destroy/{id}
     * @request path string *id
     * @response 200 response 删除成功
     */
    async destroy() {
        this.success(await this.ctx.service.school.destroy(this.ctx.params.id))
    }
    /**
     * @summary 上传文件
     * @description 上传文件
     * @router post /school/upload
     * @request formData file *file
     * @response 200 response 上传成功
     */
    async upload() {
        const { ctx, service } = this;
        const stream = await ctx.getFileStream();
        // const id = stream.fields.id;
        const origin = ctx.origin;
        this.success(await service.base.uploadImg(origin, stream))
    }
}

module.exports = SchoolController;
