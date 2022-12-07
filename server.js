//On commence par require tous les frameworks utiles au projet

//Express prodigue des fonctions de base (comme use et listen)
const express = require('express'); 
const app = express(); 
require('dotenv').config({path: "./config/.env"}); //dotenv ou .env pour les variables d'environnement, qui ne sont pas diffusées sur le site
require('./config/db.js');//Connexion à la base de donnée
const {checkUser, requireAuth} = require('./middleware/auth.middleware.js')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const userRoutes = require('./routes/user.routes.js'); //Import des routes utilisateurs
const postRoutes = require('./routes/post.routes.js')
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true, 
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET, POST, PUT, PATCH, DELETE',
    'preflightContinue': false
}


//Configuration de l'application
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
});


//routes (juste avant le server)
app.use('/api/user', userRoutes); //Pour une requête en /api/user, se référer à userRoutes
app.use('/api/post', postRoutes);

//server (toujours en dernier)
//On écoute le port .env et on affiche un message dans la console
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})
 