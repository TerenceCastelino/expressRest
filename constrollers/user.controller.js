const userService = require('../services/user.service');
const userValidator = require('../validators/user.validator');

const userController = {
    getById: async (req, res) => {
        // Récupération de l'id depuis les paramètres
        const { id } = req.params;

        // Vérification de l'id, s'il est d'un autre type que number alors, 400
        if (isNaN(id)) {
            res.sendStatus(400)
            return;
        }

        // Récupération des informations demandées
        const userDTO = await userService.fetchOne(id);

        // Si pas d'object correspondant à l'id, 404
        if (!userDTO) {
            res.sendStatus(404)
            return;
        }

        // Si tout s'est bien passé, 200 et envoi des informations
        res.status(200).json(userDTO);
    },
    getAll: async (req, res) => {
        const userDTO = await userService.fetchAll();
        res.status(200).json(userDTO);
    },
    add: async (req, res) => {
        try {
          // On récupère les informations rentrées par l'utilisateur
          const userData = req.body;
      
          // Validation des informations rentrées par l'utilisateur
          const validatedData = await userValidator.validate(userData);
      
          // On envoie les informations à la base de données
          const userInserted = await userService.insert(validatedData);
      
          // Si tout s'est bien passé, on renvoie une réponse 201 (Created)
          // On redirige l'utilisateur sur les informations détaillées du nouvel utilisateur (via son id)
          res.status(201).location(`api/user/${userInserted.id}`).json(userInserted);
        } catch (error) {
          if (error.name === "ValidationError") {
            // Si c'est une erreur de validation Yup, renvoyez les détails des erreurs
            res.status(400).json({ error: error.errors });
          } else {
            // Sinon, renvoyez une réponse 400 (Bad Request) avec le message d'erreur générique
            res.status(400).json({ error: "Bad Request" });
          }
        }
      },
      
      
    update: async (req, res) => {
        res.sendStatus(501);
    },
    delete: async (req, res) => {
        // Récupération de l'id depuis les paramètres
        const { id } = req.params;

        // Envoi de l'id au service pour suppression des infos
        const isDeleted = await userService.delete(id);

        // Si supprimé, 204
        if (isDeleted) {
            res.sendStatus(204)
            return;
        }
        // Si pas, 404
        res.sendStatus(404);
    }
};

module.exports = userController;