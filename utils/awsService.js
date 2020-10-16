// Load the SDK for JavaScript
'use strict'
const AWS = require('aws-sdk');
const path = require("path");
const appConfig = require("../app-config");
AWS.config = new AWS.Config();
AWS.config.accessKeyId = appConfig.awsS3Config.accessKeyId;
AWS.config.secretAccessKey = appConfig.awsS3Config.secretAccessKey;
AWS.config.region = appConfig.awsS3Config.region;
AWS.config.update({
    accessKeyId: appConfig.awsS3Config.accessKeyId,
    secretAccessKey: appConfig.awsS3Config.secretAccessKey,
    region: appConfig.awsS3Config.region
});
var s3 = new AWS.S3({
    apiVersion: appConfig.awsS3Config.version
});
module.exports = class awsS3Service {

    //To upload data on s3 bucket
    async upload(key, body, cb) {
        key = path.join('5DTask', key);

        // //const s3 = new AWS.S3();
        AWS.config.update({
            accessKeyId: appConfig.awsS3Config.accessKeyId,
            secretAccessKey: appConfig.awsS3Config.secretAccessKey,
            region: appConfig.awsS3Config.region
        });
        s3.upload({
            Bucket: appConfig.awsS3Config.bucket,
            Key: key,
            Body: body.data,
            ContentType: body.mimetype,
            ContentEncoding: body.encoding,
            ACL: 'public-read'
        }, function (err, data) {
            if (err) {
                //console.log("upload Object: ", err);
                cb(err);
            } else {
                //console.log("Successfully uploaded data to Bucket", data);
                // s3.getSignedUrl(key, function (e, r) {
                //     //console.log(e, r)
                // });
                cb(null, data);
            }
        });
    }

    //To download data from s3 bucket
    async getObject(key, cb) {
        key = path.join(appConfig.client.clientName, appConfig.client.clientFunction, appConfig.client.clientEnvironment, key);
        //console.log(key);
        //const s3 = new AWS.S3();
        s3.getObject({
            Bucket: appConfig.awsS3Config.bucket,
            Key: key
        }, function (e, data) {
            if (e) {
                //console.log("Error ", e);
                cb(null, []);
            } else {
                //console.log("Data ", data.Body.toString());
                cb(null, data.Body.toString());
            }
        });
    }
};