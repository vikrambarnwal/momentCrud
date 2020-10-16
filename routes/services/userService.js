const UserModel = require('../../models/userModel');

const moment = require('moment-timezone');
moment.tz.setDefault("Asia/Kolkata");

module.exports = class User {
    constructor() {}

    /** Login User */
    async loginUser(email, password, cb) {
        UserModel.findOne({
                $and: [{
                    'email': {
                        $regex: new RegExp("^" + email, "i")
                    }
                }, {
                    'isDeleted': false
                }]
            },
            function (err, user) {
                if (err) {
                    return cb("Internal Server Error")
                } else {
                    if (!user) {
                        return cb("Invalid Email")
                    } else if (!user.validPassword(password)) {
                        return cb("Invalid password.")
                    } else {
                        return cb(null, user)
                    }
                }
            })
    }

    /** Register New User*/
    async addUser(payloadData, cb) {
        var newUser = new UserModel(payloadData);
        payloadData.password=newUser.encryptPassword(payloadData.password);//For encrypt password
        newUser = new UserModel(payloadData);
        newUser.save(function (err, result) {
            if (err) {
                return cb(err)
            } else {
                return cb(null, result);
            }
        })
    }

};