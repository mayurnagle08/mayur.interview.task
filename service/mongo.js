const mongoose = require('mongoose');

class Mongo {
    constructor() { }

    add = (payload, modelName) => {
        let Model = mongoose.model(modelName);
        let model = new Model(payload);
        return new Promise((resolve, reject) => {
            model.save().then(result => {
                resolve({ data: result });
            }).catch(err => {
                reject(err);
            });
        });
    }

    find = (query, modelName) => {
        let Model = mongoose.model(modelName);
        return new Promise((resolve, reject) => {
            Model.find(query).then(result => {
                resolve({ data: result });
            }).catch(err => {
                reject(err);
            });
        });
    }

    find1 = (query, modelName) => {
        let Model = mongoose.model(modelName);
        return new Promise((resolve, reject) => {
            Model.find(query).sort({createdAt:-1}).then(result => {
                resolve({  data: result });
            }).catch(err => {
                reject(err);
            });
        });
    }
    update = (query, payload, modelName) => {
        let Model = mongoose.model(modelName);
        return new Promise((resolve, reject) => {
            Model.findOneAndUpdate(query, payload, {returnDocument: 'after' }).then(result => {
                resolve({ data: result });
            }).catch(err => {
                reject(err);
            });
        });
    }

    delete = (query, modelName) => {
        let Model = mongoose.model(modelName);
        return new Promise((resolve, reject) => {
            Model.deleteOne(query).then(result => {
                resolve({ data: result });
            }).catch(err => {
                reject(err);
            });
        });
    }
}
module.exports = Mongo;
