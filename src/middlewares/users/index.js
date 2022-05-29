const AppError = require("../../errors/appError");
const userService = require("../../services/userService");
const { ROLES, ADMIN_ROLE } = require('../../constants');
const { check } = require("express-validator");
const { validationResult } = require("../commons");
const { validJWT, hasRole } = require("../auth/index");

const _firstNameRequired = check("firstName", "First Name required").not().isEmpty();
const _lastNameRequired = check("lastName", "Last Name required").not().isEmpty();
const _emailRequired = check("email", "Email required").not().isEmpty();
const _emailValid = check("email", "Email is invalid").isEmail();
const _emailExist = check("email").custom(
    async (email = "") => {
        const userFound = await userService.findByEmail(email);
        if(userFound) {
            throw new AppError("Email already exist in DB", 400);
        }
    }
);
const _optionalEmailValid = check("email", "Email is invalid").optional().isEmail();
const _optionalEmailExist = check("email").optional().custom(
    async (email = "") => {
        const userFound = await userService.findByEmail(email);
        if(userFound) {
            throw new AppError("Email already exist in DB", 400);
        }
    }
);
const _passwordRequired = check("password", "Password required").not().isEmpty();
const _roleValid = check("role").optional().custom(
    async (role = "") => {
        if(!ROLES.includes(role)) {
            throw new AppError("Invalid Role", 400);
        }
    }
);
const _dateValid = check("birthdate").optional().isDate("MM-DD-YYYY");

const _idRequired = check("id").not().isEmpty();
const _idIsMongoDB = check("id").isMongoId();
const _idExist = check("id").custom(
    async (id = "") => {
        const userFound = await userService.findById(id);
        if(!userFound) {
            throw new AppError("Id does not exist in DB", 400);
        }
    }
);

const postRequestValidation = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _firstNameRequired,
    _lastNameRequired,
    _emailRequired,
    _emailValid,
    _emailExist,
    _passwordRequired,
    _roleValid,
    _dateValid,
    validationResult
];

const putRequestValidation = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired,
    _idIsMongoDB,
    _idExist,
    _optionalEmailValid,
    _optionalEmailExist,
    _roleValid,
    _dateValid,
    validationResult
];

const deleteRequestValidation = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired,
    _idIsMongoDB,
    _idExist,
    validationResult
];

const getAllRequestValidation = [
    validJWT,
];

const getRequestValidation = [
    validJWT,
    _idRequired,
    _idIsMongoDB,
    _idExist,
    validationResult
];

module.exports = {
    postRequestValidation,
    putRequestValidation,
    getAllRequestValidation,
    getRequestValidation,
    deleteRequestValidation
}