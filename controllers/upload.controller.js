const userModel = require('../models/user.model.js');
const fs = require('fs')

module.exports.uploadProfile = async (req, res) => {
    try {
        if(
            req.file.mimetype != 'image/jpg' &&
            req.file.mimetype != 'image/jpeg' &&
            req.file.mimetype != 'image/png'
        ) return res.status(400).send('Incorrect file')
        if(req.file.size > 5000000) return res.status(400).send('Max size') 
        else {
            const fileName = req.body.name + '.jpg';
            const stream = fs.createReadStream(req.file.path)
            const writeStream = fs.createWriteStream(`${__dirname}/../client/public/uploads/profile/${fileName}`);
            stream.pipe(writeStream, (err, docs) => {
                if(err) return res.status(500).send(err)
            });
            await userModel.findOneAndUpdate(
                {
                    pseudo: req.body.name
                },
                {
                    $set: {
                        picture: `./uploads/profile/${fileName}`
                    }
                },
                {new:true, upsert: true})
            .then((docs) => {return res.send(docs)})
            .catch((err) => res.status(400).send({ post: err }))
        }
        } catch(err) {
            return console.log(err)
    }
}