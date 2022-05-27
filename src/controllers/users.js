const express = require("express");
const userService = require("../services/userService");
const Success = require("../handlers/successHandler");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllUsers = async (req, res, next) => {
    try {
        const filter = req.query.filter;
        const options = req.query.options;
        const users = await userService.findAll(filter, options);
        res.json(new Success(users));
    } catch (error) {
        next(error);
    }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createUser = async (req, res, next) => {
    try {
        let user = req.body;
        user = await userService.save(user);
        res.status(201).json(new Success(user));
    } catch (error) {
        next(error);
    }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.body;
        const updatedUser = await userService.update(id, user);
        res.json(new Success(updatedUser));
    } catch (error) {
        next(error);
    }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getUserById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await userService.findById(id);
        res.json(new Success(user));
    } catch (error) {
        next(error)
    }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedUser = await userService.remove(id);
        res.json(new Success(deletedUser));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    getUserById,
    deleteUser
};
