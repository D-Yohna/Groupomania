//FICHIER DE CONTROLE D'AUTHENTIFICATION 

const userModel = require('../models/user.model.js'); //Importation du modèle utilisateur
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/utils.errors.js');

const maxAge = 1000 * 60 * 60 * 24 * 3;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {expiresIn : maxAge})
}

//On exporte la fonction signUp, qui attends une requête en envoie une réponse
module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body //req.body permet de décomposer la requete
    try {
        const user = await userModel.create({pseudo /* = pseudo */, email, password});
        return res.status(201).json({user: user._id}) //On attends que le user soit créé selon le modèle, puis on affiche son _id automatiquement créée par la BD
    }
    catch(err) {
        const errors = signUpErrors(err);
        return res.status(400).send({ errors })
    }
}

module.exports.signIn = async (req, res) => {
    const {email, password} = req.body

    try {
        user = await userModel.login(email, password)
        token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge})
        res.status(200).json({user: user._id})
    } catch(err) {
        const errors = signInErrors(err)
        return res.status(400).send({ errors });
    }
}

module.exports.logout = async (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/')
}