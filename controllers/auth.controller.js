//FICHIER DE CONTROLE D'AUTHENTIFICATION 

const userModel = require('../models/user.model.js'); //Importation du modèle utilisateur

//On exporte la fonction signUp, qui attends une requête en envoie une réponse
module.exports.signUp = async (req, res) => {
    console.log(req.body)
    const {pseudo, email, password} = req.body //req.body permet de décomposer la requete
    try {
        const user = await userModel.create({pseudo /* = pseudo */, email, password});
        res.status(201).json({user: user._id}) //On attends que le user soit créé selon le modèle, puis on affiche son _id automatiquement créée par la BD
    }
    catch(err) {
        res.status(200).send({ err })
        console.log(err)
    }
}