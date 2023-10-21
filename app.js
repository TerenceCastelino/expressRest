// Importation et configuration de dotenv
require('dotenv').config()
// Module de gestion de la base de données
const testDb = require("./models/db.model"); 
// Importation d'express et de la gestion d'async-errors
const express = require('express');
require('express-async-errors');
const app = express();
app.use(express.json());



// Gestion de la base de données
testDb.testDbConnection(); // Fonction de test de connexion à la base de données
// Importation du reste
const router = require('./routes/route.base');
// Utilisation .env
const { PORT,NODE_ENV } = process.env;

// Initialisation de la db
const db = require('./models/db.model');
// Check la connection avec la db
db.sequelize.authenticate()
    .then(() => console.log('Connection à la DB réussie'))
    .catch((error) => console.log(`Connection à la DB ratée : ${error}`));

// Migration de la db
if (NODE_ENV === 'development') {
    db.sequelize.sync({ alter: { drop: false}});
};


// Creation du serveur webAPI
// Ajout du routing --> respect du RESTful on ajoute '/api' comme route de base
app.use('/api',router )

app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`);
});
