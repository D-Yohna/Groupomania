const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    { 
        posterId : {
            type: String,
            required: true,
        },
        message : {
            type: String,
            required: true, 
            maxlength : 2048,
            trim: true,
        },
        image : {
            type: String,
        },
        likers : {
            type: [String],
            require:true,
        },
        comments : {
            type: [{
                commenterId: String,
                commenterPseudo: String,
                text: String,
                likers: [String],
                timestamp: Number
            }],
            required:true,
        }
    },
    {
        timestamps: true
    }
);
const postModel = mongoose.model('post', postSchema)
module.exports = postModel
