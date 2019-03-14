
'use strict';

const Controller = require('./base');
/**
 * @controller common 公用接口
 */
class CommonController extends Controller {
    /**
     * @summary 上传文件
     * @description 上传文件
     * @router post /common/upload
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

module.exports = CommonController;
