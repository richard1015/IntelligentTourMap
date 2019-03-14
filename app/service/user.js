'use strict';

const Service = require('./base');
const collection = 'user';
class UserService extends Service {

    async list(pageIndex, pageSize) {
        return await this._list(collection, pageIndex, pageSize);
    }
    async update(params) {
        return await this._update(collection, params);
    }
    async destroy(id) {
        return await this._destroy(collection, id);
    }
}

module.exports = UserService;
