
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
     * @request header string *token
     * @response 200 response 上传成功
     */
    async upload() {
        //token验证
        if (!this.checked) return;
        const { ctx, service } = this;
        const stream = await ctx.getFileStream();
        // const id = stream.fields.id;
        const origin = ctx.origin;
        this.success(await service.base.uploadImg(origin, stream))
    }
    /**
     * @summary 登录接口
     * @description 登录接口
     * @router post /common/login
     * * @request body login *body
     * @response 200 response 登录成功
     */
    async login() {
        const { ctx, service } = this;
        const { username, password } = ctx.request.body;
        if (username && password) {
            try {
                this.success(await service.base.login(ctx.request.body))
            } catch (error) {
                this.error(error);
            }

        } else {
            this.error('请检查参数!')
        }
    }
}

module.exports = CommonController;
