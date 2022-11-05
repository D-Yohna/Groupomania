const userModel = require('../models/user.model.js');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
        const users = await userModel.find().select();
        return res.status(200).json(users);
}

module.exports.getUserInfo = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        { return res.status(400).send("ID unknown :" + req.params.id) }
    
    userModel.findById(req.params.id, (err, docs) => {
        if(!err) res.send(docs)
        else res.status(400).send(err)
    }).select("-password");
    return;
}

module.exports.updateBio = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        { return res.status(400).send("ID unknown :" + req.params.id) }

    try {
        await userModel.findOneAndUpdate(
            {
                _id : req.params.id
            },
            {
                $set : {
                    bio : req.body.bio
                }
            },
            {
                new: true, 
                upsert: true, 
                setDefaultsOnInsert: true
            },
            (err, docs) => {
                if(!err) {
                    return res.send(docs)
                }
            }
        )
    } catch(err) {return res.status(500).json({message : err})}; 
}; 