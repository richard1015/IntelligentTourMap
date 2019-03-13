'use strict';

const Service = require('egg').Service;
const ObjectId = require('mongodb').ObjectId;

class BaseService extends Service {
    getConllection(collection) {
        return new Promise((resolve, reject) => {
            this.app.getMongodb().then(({ db, client }) => {
                // get the documents collection
                resolve({ collection: db.collection(collection), client });
            })
        });
    }
    _list(col) {
        return new Promise((resolve, reject) => {
            this.getConllection(col).then(({ collection, client }) => {
                collection.find({}).toArray(function (err, docs) {
                    if (err) throw reject(err);
                    client.close();
                    resolve(docs);
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
}

module.exports = BaseService;
