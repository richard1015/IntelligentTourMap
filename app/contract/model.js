'use strict';

module.exports = {
    response: {
        success: { type: 'boolean', required: true },
        errorMessage: { type: 'string' }
    },

    userResponse: {
        arrays: { type: 'array', itemType: "user" },
        pageIndex: { type: 'integer' },
        pageSize: { type: 'integer' },
        totalCount: { type: 'integer' },
        hasNextPage: { type: 'boolean' },
    },
    schoolResponse: {
        arrays: { type: 'array', itemType: "school" },
        pageIndex: { type: 'integer' },
        pageSize: { type: 'integer' },
        totalCount: { type: 'integer' },
        hasNextPage: { type: 'boolean' },
    },
    spotResponse: {
        arrays: { type: 'array', itemType: "spot" },
        pageIndex: { type: 'integer' },
        pageSize: { type: 'integer' },
        totalCount: { type: 'integer' },
        hasNextPage: { type: 'boolean' },
    },
    login: {
        username: { type: 'string', required: true, description: '用户账号' },
        password: { type: 'string', required: true, description: '密码' }
    },
    user: {
        _id: { type: 'string', description: 'id 唯一键' },
        username: { type: 'string', required: true, description: '用户账号' },
        password: { type: 'string', required: true, description: '密码' },
        phone: { type: 'string', required: true, description: '电话' },
    },
    school: {
        _id: { type: 'string', description: 'id 唯一键' },
        name: { type: 'string', required: true, description: '学校名称' },
        gaoDeLon: { type: 'string', required: true, description: '经度' },
        gaoDeLat: { type: 'string', required: true, description: '纬度' },
        count: { type: 'int', description: '访问量' }
    },
    spot: {
        _id: { type: 'string', description: 'id 唯一键' },
        pid: { type: 'string', description: 'pid school唯一键' },
        name: { type: 'string', required: true, description: '标点名称' },
        voiceUrl: { type: 'string', required: true, description: '音频url' },
        gaoDeLon: { type: 'string', required: true, description: '经度' },
        gaoDeLat: { type: 'string', required: true, description: '纬度' },
        distance: { type: 'string', required: true, description: '智能播放距离' },
        count: { type: 'int', description: '访问量' }
    }
};




