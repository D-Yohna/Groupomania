//On commence par require tous les frameworks utiles au projet

//Express prodigue des fonctions de base (comme use et listen)
const express = require('express'); 
const app = express(); 
require('dotenv').config({path: "./config/.env"}); //dotenv ou .env pour les variables d'environnement, qui ne sont pas diffusées sur le site
require('./config/db.js');//Connexion à la base de donnée
const userRoutes = require('./routes/user.routes.js'); //Import des routes utilisateurs

app.use(express.json())

//routes (juste avant le server)
app.use('/api/user', userRoutes); //Pour une requête en /api/user, se référer à userRoutes

//server (toujours en dernier)
//On écoute le port .env et on affiche un message dans la console
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})
 