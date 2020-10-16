const express = require('express');
const route = express.Router();

const UserModel = require('../../models/userModel');
const UserService = require('../services/userService');

const jwt = require('jsonwebtoken');

const moment = require('moment-timezone');
moment.tz.setDefault("Asia/Kolkata");

module.exports = async (apps) => {
    apps.use('/user', route);

    route.post('/login', async function (req, res, next) {
        var userService = new UserService();
        await userService.loginUser(req.body.email, req.body.password, function (err, result) {
            if (err) {
                return next({
                    msg: err || 'Internal Server Error',
                    errors: err,
                    status: 500
                });
            } else {
                var token = jwt.sign({
                    userId: result._id,
                    fullName: result.fullName
                }, 'newarchapikey', {
                    algorithm: 'HS512'
                });
                // expiresIn: '24h',
                UserModel.findOneAndUpdate({
                    _id: result._id
                }, {
                    $set: {
                        "lastloginAt": moment().valueOf()
                    }
                }, function (err, user) {
                    if (err) {
                        next({
                            status: 200,
                            msg: 'Login successful',
                            data: {
                                'sessionToken': token
                            }
                        });
                    } else {
                        return res.status(200).send({
                            status: 200,
                            msg: 'Login successful',
                            data: {
                                'sessionToken': token
                            }
                        });
                    }
                })
            }
        });
    });

    route.post('/register', async function (req, res, next) {
        var userService = new UserService();
        await userService.addUser(req.body, function (err, result) {
            if (err) {
                return next({
                    msg: err || 'Internal Server Error',
                    errors: err,
                    status: 500
                });
            } else {
                res.status(200).send({
                    status: 200,
                    msg: 'User registered Successfully',
                    data: null
                });
            }
        });
    });

};