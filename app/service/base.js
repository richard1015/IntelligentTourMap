'use strict';

const Service = require('egg').Service;
const ObjectId = require('mongodb').ObjectId;
const fs = require('fs');
const path = require('path');
class BaseService extends Service {
    getConllection(collection) {
        return new Promise((resolve, reject) => {
            this.app.getMongodb().then(({ db, client }) => {
                // get the documents collection
                resolve({ collection: db.collection(collection), client });
            })
        });
    }
    _list(col, pageIndex = 1, pageSize = 10) {
        return new Promise((resolve, reject) => {
            this.getConllection(col).then(({ collection, client }) => {
                collection.find({}).toArray(function (err, result) {
                    if (err) throw reject(err);
                    client.close();
                    let totalCount = result.length;
                    let arrays = result.filter((el, index) => index > (pageIndex - 1) * pageSize - 1 && index < pageIndex * pageSize - 1);
                    resolve({
                        arrays,
                        pageIndex,
                        pageSize,
                        totalCount,
                        hasNextPage: pageIndex * pageSize < totalCount
                    });
                })
            });
        })
    }
    _update(col, params) {
        return new Promise((resolve, reject) => {
            this.getConllection(col).then(({ collection, client }) => {
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
            });
        });

    }
    _destroy(col, id) {
        return new Promise((resolve, reject) => {
            this.getConllection(col).then(({ collection, client }) => {
                // Delete document
                collection.deleteOne({ _id: ObjectId(id) }, function (err, result) {
                    if (err) throw reject(err);
                    client.close();
                    resolve(true)
                });
            });
        });
    }
    async uploadImg(origin, stream) {
        const writerStream = fs.createWriteStream(path.join(this.config.baseDir, `app/public/${stream.filename}`));

        stream.pipe(writerStream);

        let imgUrl = `${origin}/public/${stream.filename}`;

        return imgUrl;
    }
}

module.exports = BaseService;
