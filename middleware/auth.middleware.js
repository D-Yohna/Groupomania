const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model.js');

module.exports.checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if(err) {
                res.locals.user = null;
                res.cookie('jwt', '', { maxAge : 1 });
                next();
            } else {
                let user = await userModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null
        next();
    }
}

module.exports.requireAuth = async (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if(err){
                console.log(err)
            } else {
                console.log(decodedToken.id)
                next()
            }
        })
    } else {
        console.log('No Token')
    }
}

