const userService = require('../../service/userservise');
const mongoose = require('mongoose')
let ObjectId = require('mongodb').ObjectId;

class userController {
    constructor() {
        this.userService = new userService()
    }

    getAllUser = (req, res) => {
        let payload = {}
        this.userService.getAllUser(payload).then(result => {
            return res.status(result.code).json(result);
        }).catch(err => {
            return res.status(err.code).json(err);
        });
    }

    getUserById = (req, res) => {
        let payload = { _id: req.params.id }
        this.userService.getUserById(payload).then(result => {
            return res.status(result.code).json(result);
        }).catch(err => {
            return res.status(err.code).json(err);
        });
    }

    createUser = (req, res) => {
        if (!req.body && !req.body.username) {
            return res.status(400).json("Required field is missing in the request body.");
        }
        let payload = {
            username: req.body.username,
            age: req.body.age,
            hobbies: req.body.hobbies || []
        }
        this.userService.createUser(payload).then(result => {
            return res.status(result.code).json(result);
        }).catch(err => {
            return res.status(err.code).json(err);
        });
    }

    updateUser = (req, res) => {
        if (!req.body && !req.body.username) {
            return res.status(400).json("Required field is missing in the request body.");
        }

        let payload = {
            id: req.params.id,
            username: req.body.username,
            age: req.body.age,
            hobbies: req.body.hobbies || []
        }
        this.userService.updateUser(payload).then(result => {
            return res.status(result.code).json(result);
        }).catch(err => {
            return res.status(err.code).json(err);
        });
    }

    deleteUser = (req, res) => {
        let payload = { 
            id: req.params.id
        }
        this.userService.deleteUser(payload).then(result => {
            return res.status(result.code).json(result);
        }).catch(err => {
            return res.status(err.code).json(err);
        });
    }
}

module.exports = userController;