//FICHIER DE CONNEXION A LA BASE DE DONNEE MANGODB

const mongoose = require('mongoose')

//Connexion a la base de donnée avec le .env UserName et Password sur MangoDB ATLAS
mongoose.connect('mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.gko7dqu.mongodb.net/Groupomania', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to Database'))
.catch((err) => console.log('Failed to connect to Database', err)) 