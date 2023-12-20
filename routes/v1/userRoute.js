const express = require('express');
const router = express.Router();

const V1Controller = require('./userController');
const v1Controller = new V1Controller();

router.get('/users', v1Controller.getAllUser)
router.get('/users/:id', v1Controller.getUserById)
router.post('/users', v1Controller.createUser)
router.put('/users/:id', v1Controller.updateUser)
router.delete('/users/:id/', v1Controller.deleteUser)






module.exports = router;