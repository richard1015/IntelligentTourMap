'use strict';

const Service = require('./base');
const collection = 'user';
class UserService extends Service {

    async list(pageIndex, pageSize, condition) {
        return await this._list(collection, pageIndex, pageSize, condition);
    }
    async update(params) {
        return await this._update(collection, params);
    }
    async destroy(id) {
        return await this._destroy(collection, id);
    }
}

module.exports = UserService;
