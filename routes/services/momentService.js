const MomentModel = require('../../models/momentModel');

const awsS3 = require("./../../utils/awsService");
const moment = require('moment-timezone');
const {
    Schema
} = require('mongoose');
moment.tz.setDefault("Asia/Kolkata");

module.exports = class User {
    constructor() {}

    /** List Moment By User */
    async listMomentByUserId(userId, cb) {
        MomentModel.find({
                $and: [{
                    'userId': Schema.Types.ObjectId(userId)
                }, {
                    'isDeleted': false
                }]
            },
            function (err, moment) {
                if (err) {
                    return cb("Internal Server Error")
                } else {
                    return cb(null, moment)
                }
            })
    }

    /** Get Moment Detail By Id */
    async getMomentDetails(momentId, cb) {
        MomentModel.findById(momentId, function (err, moment) {
            if (err) {
                return cb("Internal Server Error")
            } else {
                return cb(null, moment)
            }
        })
    }

    /** Add Moment By User */
    async addMoment(payloadData, file, cb) {
        if (file) {
            var Name = "moment_" + moment().valueOf();
            var fileSend = {
                name: Name,
                data: file.data,
                truncated: file.truncated,
                mimetype: file.mimetype,
                encoding: file.encoding
            };

            let key = Name;
            let awsS3Bucket = new awsS3();
            awsS3Bucket.upload(key, fileSend, function (err, result) {
                if (err || !result){
                    return cb(err)
                }
                else {
                    payloadData.imageUrl = result.Location;
                    payloadData.userId = payloadData.id;
                    var newMoment = new MomentModel(payloadData);
                    newMoment.save(function (err, result) {
                        if (err) {
                            return cb(err)
                        } else {
                            return cb(null, result);
                        }
                    })
                }
            })
        } else {
            return next("Image Not Available");
        }
    }

    /** Update Moment By User */
    async updateMoment(momentId, payloadData, file, cb) {
        if (file) {
            console.log(data);
            var Name = "moment_" + moment().valueOf();
            var fileSend = {
                name: Name,
                data: file.data,
                truncated: file.truncated,
                mimetype: file.mimetype,
                encoding: file.encoding
            };

            let key = Name;
            let awsS3Bucket = new awsS3();
            awsS3Bucket.upload(key, fileSend, function (err, result) {
                if (err || !result) return next({
                    msg: "Can't upload image now, please remove image and try again.",
                    err: err
                });
                else {
                    payloadData.imageUrl = result.Location;
                    payloadData.userId = payloadData.id;
                    MomentModel.findByIdAndUpdate(momentId, {
                        $set: {
                            payloadData
                        }
                    }, function (err, result) {
                        if (err) {
                            return cb(err)
                        } else {
                            return cb(null, result);
                        }
                    });
                }
            })
        } else {
            return next("Image Not Available");
        }
    }

    /** Delete Moment By Id */
    async deleteMoment(momentId, cb) {
        MomentModel.findByIdAndUpdate(momentId, {
            $set: {
                'isDeleted': true
            }
        }, function (err, result) {
            if (err) {
                return cb(err)
            } else {
                return cb(null, result);
            }
        });
    }

};