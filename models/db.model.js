// require('dotenv').config();
const { Sequelize } = require('sequelize');
const { NAME_LOGING, PASSWORD, NAME_DATABASE, BD_SERVER } = process.env;

// Crée une nouvelle instance de l'objet Sequelize pour se connecter à MSSQL
const sequelize = new Sequelize(NAME_DATABASE, NAME_LOGING, PASSWORD, {
  host: 'localhost',
  dialect: 'mssql', // Utilisez le dialecte 'mssql' pour SQL Server
  dialectOptions: {
    options: {
      trustServerCertificate: true, // Activez cette option si vous utilisez un certificat auto-signé
    },
  },
});

// Crée l'objet db
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Ajoute les modèles ici
db.user = require('./user.model')(sequelize);

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie!');
    return true;
  } catch (error) {
    console.log('Connexion à la base de données impossible!');
    console.error(error);
    return false;
  }
};

// Exporte les fonctions pour être utilisées ailleurs dans l'application
db.testDbConnection = testDbConnection;

module.exports = db;
