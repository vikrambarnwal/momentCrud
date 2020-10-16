var Mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs");
const db = require('../middlewears/mangooes')

const userSchema = new Mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String,
        unique: "EmailId is already in use",
        required: true
    },
    password: {
        type: String,
    },
    city: {
        type: String
    },
    lastLoginAt: {
        type: Number
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

/////// method for comparing and validating password//////////////////

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = db.mainDb.model('user', userSchema)