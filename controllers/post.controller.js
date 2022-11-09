const postModel = require('../models/post.model.js');
const userModel = require('../models/user.model.js');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllPosts = async (req, res) => {
    const posts = await postModel.find().select()
    return res.status(200).json(posts);
}

module.exports.getPost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        { return res.status(400).send("ID unknown :" + req.params.id) }
    
    postModel.findById(req.params.id, (err, docs) => {
        if(!err) return res.send(docs)
        else return res.status(400).send(err)
    })
}

module.exports.getUserPosts = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID unknown :" + req.body.posterId) 
    } else {
        const referencePost = await postModel.findOne({ _id: req.params.id})
        console.log(referencePost.posterId)
        const posts = await postModel.find({ posterId: referencePost.posterId }).select()
        return res.status(200).json({ posts });
    }
}

module.exports.createPost = async (req, res) => {
    const {posterId, message, image, video} = req.body 
    if (!ObjectID.isValid(req.body.posterId))
        { return res.status(400).send("ID unknown :" + req.body.posterId) }
    try {
        const post = await postModel.create({posterId, message, image, video});
        return res.status(201).json({post: post._id}) 
    }
    catch(err) {
        return res.status(400).send({ err })
    }
}

module.exports.updatePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        { return res.status(400).send("ID unknown :" + req.params.id) }
    try {
        await postModel.findOneAndUpdate(
            {
                _id : req.params.id
            },
            {
                message : req.body.message
            },
            {
                new: true, 
                upsert: true, 
                setDefaultsOnInsert: true
            })
            .then((docs) => res.send(docs))
            .catch((err) => res.status(500).send({ message: err }))
    } catch(err) {console.log(err)}
};

module.exports.deletePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        { return res.status(400).send("ID unknown :" + req.params.id) }
    
    try { 
        await postModel.remove({_id : req.params.id}).exec();
        return res.status(200).send("Post successfully deleted")
    } catch(err) {return res.status(500).json(err)}
}

module.exports.like = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) { 
        return res.status(400).send("ID unknown :" + req.params.id) 
    }
    else if (!ObjectID.isValid(req.body.liker)) {
        return res.status(400).send("ID unknown :" + req.body.liker)
    } else { 
        try {
            await postModel.findByIdAndUpdate(
                {_id : req.params.id},
                {$addToSet : {likers: req.body.liker}},
                {new: true, upsert: true}
            )
            .then((docs) => res.send(docs))
            .catch((err) =>  res.status(400).send({ message: err }));

            await userModel.findByIdAndUpdate(
                {_id : req.body.liker},
                {$addToSet : {likes : req.params.id}},
                {new: true, upsert: true}
            )
            .catch((err) => res.status(400).send({ message: err }))
        } catch(err) {
            return res.status(500).send({message : err})
        }
    }
}



module.exports.unlike = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) { 
        return res.status(400).send("ID unknown :" + req.params.id) 
    }
    else if (!ObjectID.isValid(req.body.unliker)) {
        return res.status(400).send("ID unknown :" + req.body.unliker)
    } else { 
        try {
            await postModel.findByIdAndUpdate(
                {_id : req.params.id},
                {$pull : {likers: req.body.unliker}},
                {new: true, upsert: true}
            )
            .then((docs) => res.send(docs))
            .catch((err) =>  res.status(400).send({ message: err }));

            await userModel.findByIdAndUpdate(
                {_id : req.body.unliker},
                {$pull : {likes : req.params.id}},
                {new: true, upsert: true}
            )
            .catch((err) => res.status(400).send({ message: err }))
        } catch(err) {
            return res.status(500).send({message : err})
        }
    }
}

module.exports.comment = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) { 
        return res.status(400).send("ID unknown :" + req.params.id) 
    }

    try {
        const user = await userModel.findById(req.body.commenterId).select()
        await postModel.findByIdAndUpdate(
            req.params.id,
            {
                $push : {
                    comments : {
                        commenterId : req.body.commenterId,
                        commenterPseudo : user.pseudo,
                        text: req.body.text,
                        timestamp : new Date().getTime()
                    }
                }    
            },
            {new: true, upsert: true})
            .then((docs) => res.send(docs))
            .catch((err) =>  res.status(400).send({ message: err }));
    } catch(err) {return res.status(400).send(err)}
}

module.exports.updateComment = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) { 
        return res.status(400).send("ID unknown :" + req.params.id) 
    }

    try {
        await postModel.findOneAndUpdate(
            {
                _id : req.params.id,
                'comments._id' : req.body.commentId
            },
            {$set : {
                'comments.$.text' : req.body.text
            }},
            {new: true, upsert: true}
        )
        .then((docs) => {
            return res.status(200).send(docs)
        })
        .catch((err) => {
            return res.status(404).send('Comment not found' + err)
        })
    } catch(err) {console.log(err); return res.status(400).json({ err })}
}

module.exports.deleteComment = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) { 
        return res.status(400).send("ID unknown :" + req.params.id) 
    }

    try {
        await postModel.findOneAndUpdate(
            {
                _id : req.params.id,
            },
            {$pull : {
                comments : {
                    _id : req.body.commentId
                }
            }},
            {new: true}
        )
        .then((docs) => {
            return res.status(200).send(docs)
        })
        .catch((err) => {
            return res.status(404).send('Comment not found' + err)
        })
    } catch(err) {console.log(err); return res.status(400).json({ err })}
}

module.exports.likeComment = async (req, res) => {

}

