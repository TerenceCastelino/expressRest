const UserDTO = require ('../dto/user.dto')
const db = require('../models/db.model')
const {Op} =  require('sequelize')

const userService = {
    fetchAll : async () => {
        const users = await db.user.findAll();
        return users.map(user => new UserDTO(user));
    },
    fetchOne: async (id) => {
        const user = await db.user.findOne({
            where: { id } // --> { id: id }
        });

        return new UserDTO(user);
    },

    // Exemple de fetch plus détaillé
    fetchFun: async () => {
        const users = await db.user.findAll({
            where: db.Sequelize.or(
                {
                    firstname: {
                        [Op.like]: 'John'
                    }
                },
                {
                    firstname: {
                        [Op.like]: 'Jacqouille'
                    }
                }
            )
        });

        return users.map(user => new UserDTO(user))
    },

    insert: async (data) => {
        const user = await db.user.create(data)
        return new UserDTO(user)
    },
    
}
module.exports = userService