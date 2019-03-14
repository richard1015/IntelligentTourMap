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
    async getConllectionCount(collection) {
        return new Promise((r, rej) => {
            collection.count((err, res) => {
                if (err) throw rej(err);
                r(res);
            });
        })
    }
    async _list(col, pageIndex = 1, pageSize = 10) {
        const { collection, client } = await this.getConllection(col);
        let totalCount = await this.getConllectionCount(collection);
        return new Promise((resolve, reject) => {
            collection.find({}).skip((pageIndex - 1) * pageSize).limit(pageSize).toArray(function (err, result) {
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
        const writerStream = fs.createWriteStream(path.join(this.config.baseDir, `app/public/${stream.filename}`));

        stream.pipe(writerStream);

        let imgUrl = `${origin}/public/${stream.filename}`;

        return imgUrl;
    }
}

module.exports = BaseService;
