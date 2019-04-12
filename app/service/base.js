'use strict';

const Service = require('egg').Service;
const ObjectId = require('mongodb').ObjectId;
const fs = require('fs');
const path = require('path');
class BaseService extends Service {
    async getConllection(collection) {
        return new Promise((resolve, reject) => {
            this.app.getMongodb().then(({ db, client }) => {
                // get the documents collection
                resolve({ collection: db.collection(collection), client });
            })
        });
    }
    //按条件获取结果总数
    async getConllectionCount(collection, condition) {
        return new Promise((r, rej) => {
            collection.find(condition).toArray(function (err, result) {
                if (err) throw reject(err);
                r(result.length);
            });
        })
    }
    async _list(col, pageIndex = 1, pageSize = 10, condition = {}) {
        const { collection, client } = await this.getConllection(col);
        let totalCount = await this.getConllectionCount(collection, condition);
        return new Promise((resolve, reject) => {
            collection.find(condition).skip((pageIndex - 1) * pageSize).limit(pageSize).toArray(function (err, result) {
                if (err) throw reject(err);
                client.close();
                resolve({
                    arrays: result,
                    pageIndex,
                    pageSize,
                    totalCount,
                    hasNextPage: pageIndex * pageSize < totalCount
                });
            })
        })
    }
    async _update(col, params) {
        const { collection, client } = await this.getConllection(col);
        return new Promise((resolve, reject) => {
            params.updateTime = new Date();
            if (params._id) {
                let _id = ObjectId(params._id)
                delete params._id;
                // Update document 
                collection.updateOne({ _id }
                    , { $set: params }, function (err, result) {
                        if (err) throw reject(err);
                        client.close();
                        resolve(true)
                    });
            } else {
                delete params._id;
                // Insert some documents
                collection.insertMany([
                    params
                ], function (err, result) {
                    if (err) throw reject(err);
                    client.close();
                    resolve(true)
                });
            }
        })
    }
    async _destroy(col, id) {
        const { collection, client } = await this.getConllection(col);
        return new Promise((resolve, reject) => {
            // Delete document
            collection.deleteOne({ _id: ObjectId(id) }, function (err, result) {
                if (err) throw reject(err);
                client.close();
                resolve(true)
            });
        })
    }
    async uploadImg(origin, stream) {
        const writerStream = fs.createWriteStream(path.join(this.config.baseDir, `app/public/resources/${stream.filename}`));

        stream.pipe(writerStream);

        let imgUrl = `${origin}/public/resources/${stream.filename}`;

        return imgUrl;
    }
    async login({ username, password }) {
        const self = this;
        const { collection, client } = await this.getConllection('user');
        return new Promise((resolve, reject) => {
            collection.find({ username, password }).toArray(function (err, result) {
                if (err) throw reject(err);
                client.close();
                if (result.length > 0) {
                    var token = new Date().getTime() + getRadomNum(6);
                    function getRadomNum(capacity) {
                        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                        var res = "";
                        for (var i = 0; i < capacity; i++) {
                            var id = Math.ceil(Math.random() * chars.length);
                            res += chars[id];
                        }
                        return res;
                    }
                    self.app.cache.tokens.push(token);
                    resolve({
                        token
                    });
                } else {
                    reject('账号密码错误!')
                }
            })
        })
    }
}

module.exports = BaseService;
