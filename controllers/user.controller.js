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
        if(!err) return res.send(docs)
        else return res.status(400).send(err)
    }).select("-password");
    
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
                bio : req.body.bio
            },
            {
                new: true, 
                upsert: true, 
                setDefaultsOnInsert: true
            })
            .select("-password")
            .then((docs) => res.send(docs))
            .catch((err) => res.status(500).send({ message: err }))
    } catch(err) {console.log(err)}
};

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        { return res.status(400).send("ID unknown :" + req.params.id) }
    
    try { 
        await userModel.remove({_id : req.params.id}).exec();
        return res.status(200).send("User successfully deleted")
    } catch(err) {return res.status(500).json(err)}
}

module.exports.follow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) return res.status(400).send("ID unknown :" + req.params.id);
    else if (!ObjectID.isValid(req.body.idToFollow)) return res.status(400).send("ID unknown :" + req.body.idToFollow)
    else {
        try {
            //Add to the following list
            await userModel.findByIdAndUpdate(
                {_id : req.params.id},
                {$addToSet : {followings : req.body.idToFollow}},
                {new: true, upsert: true}
            )
            .then((docs) => res.send(docs))
            .catch((err) =>  res.status(400).send({ message: err }));

            //Add to the followers list
            await userModel.findByIdAndUpdate(
                {_id : req.body.idToFollow},
                {$addToSet : {followers : req.params.id}},
                {new: true, upsert: true}
            )
            .catch((err) => res.status(400).send({ message: err }));
        } catch(err) {return res.status(500).send({message : err})}
    }
}

module.exports.unfollow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) return res.status(400).send("ID unknown :" + req.params.id);
    else if (!ObjectID.isValid(req.body.idToUnfollow)) return res.status(400).send("ID unknown :" + req.body.idToUnfollow)
    else {
        try {
            //Remove to the following list
            await userModel.findByIdAndUpdate(
                {_id : req.params.id},
                {$pull : {followings : req.body.idToUnfollow}},
                {new: true, upsert: true}
            )
            .then((docs) => res.send(docs))
            .catch((err) =>  res.status(400).send({ message: err }));

            //Remove to the followers list
            await userModel.findByIdAndUpdate(
                {_id : req.body.idToUnfollow},
                {$pull : {followers : req.params.id}},
                {new: true, upsert: true}
            )
            .catch((err) => res.status(400).send({ message : err }));
        } catch(err) {return res.status(500).send({message : err})}
    }
}