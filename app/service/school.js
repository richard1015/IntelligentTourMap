'use strict';

const Service = require('./base');
const collection = 'school';
class SchoolService extends Service {
    async list() {
        return await this._list(collection);
    }
    async update(params) {
        return await this._update(collection, params);
    }
    async destroy(id) {
        return await this._destroy(collection, id);
    }
}

module.exports = SchoolService;
