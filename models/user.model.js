const mongoose = require('mongoose');
const { isEmail } = require('validator'); //pour vérifier les mails version big boss
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        pseudo : {
            type: String,
            require: true,
            minlength: 3,
            maxlength: 24,
            unique: true,
            trim: true //trim supprime les espaces à la fin des input
        },
        email : {
            type: String, 
            require: true,
            unique:true,
            validate: [isEmail],
            lowercase: true,
            trim: true
        },
        password : {
            type: String,
            require: true,
            minlength: 8,
            max: 1024
        },
        bio : {
            type: String,
            max: 256,
        },
        followers : {
            type: [String]
        },
        followings : {
            type: [String]
        },
        likes : {
            type: [String]
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});
    if(user) {
        const auth = await bcrypt.compare(password, user.password)
        if(auth) {
            return user;
        }
        throw Error(1)
    }
    throw Error(2)
}

//userModel fait référence au modèle 'user' et ressemble à userSchema
const userModel = mongoose.model('user', userSchema)
module.exports = userModel