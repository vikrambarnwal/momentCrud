var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    /* if not request header then it will return to the index page */
    if (!req)
        return next("Not Found!");

    var url = req.url; //.split("/");
    /* if any of below apis are match then no need to check the session toke and no need for authenticate the rquest */
    if (['/','/user/login','/user/register'].includes(url)) {
        return next(); //this will retun form this function
    } else {
        const token = req.headers['authorization']; // Create token found in headers
        try {
            if (!token) {
                next({
                    msg: 'Authorization key is missing.',
                    status: 401
                })
            } else {
                // here getting the token from request header and decrypte and check is valid or not using jwt
                jwt.verify(token, 'newarchapikey', function (err, decode) {
                    if (err || !decode) {
                        next({
                            msg: 'Access denied. Login again !.',
                            "status": 401
                        })
                    } else {
                        req.body.id=decode.userId;
                        next();
                    }
                });
            }
        } catch (error) {
            next(error)
        }
    }
};