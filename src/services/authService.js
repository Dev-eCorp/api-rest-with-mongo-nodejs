const userService = require("./userService");
const AppError = require("../errors/appError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/index");

const login = async (email, password) => {
    try {
        const user = await userService.findByEmail(email);
        if(!user) {
            throw new AppError("Authentication failed! Email or password does not correct.", 401);
        }

        if(!user.enable) {
            throw new AppError("Authentication failed! User disabled.", 401);
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            throw new AppError("Authentication failed! Email or password does not correct.", 401);
        }

        const token = _encrypt(user._id);
        return {
            token,
            user: user.firstName,
            role: user.role
        }
    } catch (error) {
        throw error;
    }
}

const validToken = async (token) => {
    try {
        if(!token) {
            throw new AppError("Authentication failed! Token required.", 401);
        }

        let id;
        try {
            const obj = jwt.verify(token, config.auth.secret);
            id = obj.id;
        } catch (verifyError) {
            throw new AppError("Authentication failed! Invalid token.", 401);
        }

        const user = await userService.findById(id);

        if(!user) {
            throw new AppError("Authentication failed! Invalid token.", 401);
        }

        if(!user.enable) {
            throw new AppError("Authentication failed! User disabled.", 401);
        }

        return user;
    } catch (error) {
        throw error;
    }
}

const validRole = (user, ...roles) => {
    if(!roles.includes(user.role)) {
        throw new AppError('Authorization failed! User without privileges.', 403);
    }
    return true;
}

_encrypt = (id) => {
    return jwt.sign({ id }, config.auth.secret, {expiresIn: config.auth.ttl});
}

module.exports = {
    login,
    validToken,
    validRole
};