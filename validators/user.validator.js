const yup = require('yup');
const { object } = require('yup');

const userValidator = object({
    firstname: yup.string().min(1).max(50).required(),
    lastname: yup.string().min(1).max(50).required(),
    role: yup.string().oneOf(['utilisateur', 'admin']).required(),
    password: yup.string().min(8).required(),
    email: yup.string().email().required(),
    dateOfBirth: yup.date().typeError('La date de naissance doit être une date valide.'),
});

module.exports = userValidator;
