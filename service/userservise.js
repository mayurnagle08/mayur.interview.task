const Mongo = require('./mongo');
class UserService {
    constructor() {
        this.mongo = new Mongo();
    }

    getAllUser = () => {
        return new Promise((resolve, reject) => {
            let query = {};
            this.mongo.find1(query, 'user').then(result => {
                if (result.data.length > 0) {
                    return resolve({ code: 200, data: result.data })
                } else {
                    return resolve({ code: 404, message: "No Data Fount" })
                }
            }).catch(err => {
                return reject({ code: 400, message: "Invalid UserId" })
            })
        });
    }

    getUserById = (payload) => {
        return new Promise((resolve, reject) => {
            // let query = {};
            this.mongo.find(payload, 'user').then(result => {
                if (result.data.length > 0) {
                    return resolve({ code: 200, data: result.data })
                } else {
                    return resolve({ code: 404, message: "User Id Doesn't Exist" })
                }
            }).catch(err => {
                return reject({ code: 400, message: "Invalid UserId" })
            })
        });
    }
    createUser = (payload) => {
        return new Promise(async (resolve, reject) => {
            let query = { username: payload.username };
            await this.mongo.find(query, 'user').then(result => {
                for (var i = 0; i <= result.data.length; i++) {
                    if (result.data.length <= 0) {
                        this.mongo.add(payload, 'user').then(result1 => {
                            return resolve({ code: 201, data: result1.data })
                        }).catch(err => {
                            return reject({ code: 500, message: "Something Went Wrong!" })
                        })
                    } else {
                        return reject({ code: 409, message: "Username already Exist" })
                    }
                }
            }).catch(err => {
                return reject({ code: 500, message: "something went Wrong!" })
            })
        });
    }

    updateUser = (payload) => {
        return new Promise(async (resolve, reject) => {
            let updatequery = { _id: payload.id }
            let searchNameQuery = { _id: { $ne: payload.id }, username: payload.username }
            let content = {}
            await this.mongo.find({ _id: payload.id }, 'user').then(existData => {
                    if (existData.data.length != 0) {
                         this.mongo.find(searchNameQuery, 'user').then(searcResult => {
                        if (searcResult.data.length != 0) {
                            return reject({ code: 409, message: "Username already Exist" })
                        }else {
                            this.mongo.update(updatequery, payload, 'user').then((result1) => {
                                return resolve({ code: 200, data: result1.data })
                            }).catch(err => {
                                return reject({ code: 500, message: "something went Wrong!" })
                            })
                        }
                    }).catch(err => {
                        return reject({ code: 400, message: "Invalid UserId" })
                    })
                    } else {
                        return reject({ code: 404, message: "User Id Doesn't Exist" })
                    }
                }).catch(err => {
                    return reject({ code: 400, message: "Invalid UserId" })
                })
        });
    }

    deleteUser = (payload) => {
        return new Promise(async (resolve, reject) => {
            let deletequery = { _id: payload.id }
            this.mongo.delete(deletequery, 'user').then(result1 => {
                if (result1.data) {
                    return resolve({ code: 204, data: result1 })
                } else {
                    return resolve({ code: 404, message: "User Id Doesn't Exist" })
                }
            }).catch(err => {
                return reject({ code: 400, message: "Invalid UserId" })
            })
        });
    }
}

module.exports = UserService;