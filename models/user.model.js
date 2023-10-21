const { Sequelize, DataTypes,ModelStatic } = require('sequelize');

/**
 * Fonction pour créer un modèle User (table de base de données)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true, // Pour s'assurer que l'e-mail est unique
      validate: {
        isEmail: {
          msg: 'L\'e-mail doit être une adresse e-mail valide.',
        },
      },
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isLongEnough(value) {
          if (value.length < 8) {
            throw Error('Le mot de passe doit contenir au moins 8 caractères.');
          }
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'utilisateur',
      validate: {
        isIn: {
          args: [['utilisateur', 'admin']],
          msg: 'Le rôle doit être "utilisateur" ou "admin.',
        },
      },
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(15), // Vous pouvez ajuster la longueur selon vos besoins
      allowNull: true, // Peut être null
    },
  }, {
    createdAt:true,
    tableName:'users',
    indexes:[
      {
        name :'UK_User__Name',
        fields: ['firstname', 'lastname', 'dateOfBirth'],
        unique:false
      }
    ]
    
  });

  return User;
};
