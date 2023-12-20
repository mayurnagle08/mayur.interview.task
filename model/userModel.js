const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required: true
    },
    age : {
        type : Number,
        required: true 
    },
    hobbies  : {
        type : Array,
        required: true 
    }
},{
    timestamps: true
}, { strict: false })

const User = mongoose.model('user', userSchema);

module.exports = User;