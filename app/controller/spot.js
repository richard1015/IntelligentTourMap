
'use strict';

const Controller = require('./base');
/**
 * @controller spot 获取所有标注点接口
 */
class SpotController extends Controller {
    /**
     * @summary 根据学校id获取相应标注点
     * @description 分页获取标注点
     * @router get /spot/query
     * @request query string pid 学校id
     * @request query string keyword 模糊搜索name
     * @request query integer pageIndex 页码 默认 1
     * @request query integer pageSize 单页数量 默认 10
     * @response 200 spotResponse 请求成功
     */
    async query() {
        const { ctx, service } = this;
        let pageIndex = Number(ctx.query.pageIndex || 1);
        let pageSize = Number(ctx.query.pageSize || 10);
        let pid = ctx.query.pid;
        let keyword = ctx.query.keyword || "";
        if (!pid) {
            this.error('请传入pid')
            return;
        }
        this.success(await service.spot.list(pageIndex, pageSize, { pid, name: { $regex: new RegExp(keyword, 'i') } }))
    }
    /**
     * @summary 更新/创建
     * @description 创建 更新传 _id 创建不传_id
     * @router post /spot/update
     * @request body spot *body
     * @request header string *token
     * @response 200 response 更新成功
     */
    async update() {
        //token验证
        if (!this.checked) return;
        this.success(await this.ctx.service.spot.update(this.ctx.request.body))
    }
    /**
     * @summary 删除
     * @description 删除
     * @router delete /spot/destroy/{id}
     * @request path string *id
     * @request header string *token
     * @response 200 response 删除成功
     */
    async destroy() {
        //token验证
        if (!this.checked) return;
        this.success(await this.ctx.service.spot.destroy(this.ctx.params.id))
    }
    /**
    * @summary 标点播放点击量增加
    * @description 
    * @router get /spot/visit/{id}
    * @request path string *id
    * @response 200 response 成功
    */
    async visit() {
        this.success(await this.ctx.service.spot.visit(this.ctx.params.id))
    }
}

module.exports = SpotController;
