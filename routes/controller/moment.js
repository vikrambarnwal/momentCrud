var express = require('express');
const route = express.Router();
var MomentService = require('../services/momentService');

module.exports = (apps) => {

    apps.use('/moment', route);

    /* GET momentlist by User */
    route.get('/', async function (req, res, next) {
        let momentService = new MomentService();
        await momentService.listMomentByUserId(req.body.id, function (err, result) {
            if (err) {
                return next({
                    success: false,
                    msg: err || 'Internal Server Error',
                    errors: err
                });
            } else {
                return res.send({
                    success: false,
                    msg: err || 'Internal Server Error',
                    data: result
                });
            }
        })
    });

    /** Add new moment */
    route.post('/', function (req, res, next) {
        var momentService = new MomentService();
        momentService.addMoment(req.body, req.files.momentImage, function (err, data) {
            if (err) {
                return next({
                    success: false,
                    msg: err || responseFormats.message.serverError,
                    errors: err
                });
            } else {
                return res.send({
                    msg: responseFormats.message.dataFound,
                    success: true,
                    data: data
                });
            }
        })

    });

    /** Get Moment Detail By Id */
    route.get('/:id', async function (req, res, next) {
        var momentService = new MomentService();
        momentService.getMomentDetails(req.params.id, function (err, data) {
            if (err) {
                return next({
                    success: false,
                    msg: err || responseFormats.message.serverError,
                    errors: err
                });
            } else {
                return res.send({
                    msg: responseFormats.message.dataFound,
                    success: true,
                    data: data
                });
            }
        })
    });

    /** Update Moment Data By Id */
    route.put('/:id', function (req, res, next) {
        var momentService = new MomentService();
        momentService.updateMoment(req.params.id,req.body, req.files.momemtPic, function (err, data) {
            if (err) {
                return next({
                    success: false,
                    msg: err ||'Internal Server Error',
                    errors: err
                });
            } else {
                return res.send({
                    msg: 'Moment Updated Successfully',
                    success: true,
                    data: data
                });
            }
        })

    });

    /** Delete Moment Data By Id */
    route.delete('/:id', async function (req, res, next) {
        var momentService = new MomentService();
        momentService.deleteMoment(req.params.id, function (err, data) {
            if (err) {
                return next({
                    success: false,
                    msg: err || 'Internal Server Error',
                    errors: err
                });
            } else {
                return res.send({
                    msg: 'Moment Deleted Succesfully',
                    success: true,
                    data: null
                });
            }
        })
    });
};