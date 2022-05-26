const express = require("express");
const userService = require("../services/userService");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllUsers = async (req, res) => {
    try {
        const users = await userService.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createUser = async (req, res) => {
    try {
        let user = req.body;
        user = await userService.save(user);
        const result = {
            message: 'User created',
            user
        }
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.body;
        const updatedUser = await userService.update(id, user);
        const result = {
            message: 'User updated',
            updatedUser
        }
        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userService.findById(id);
        res.json(user);
    } catch (error) {
        res.status(500).json(error)
    }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await userService.remove(id);

        const result = {
            message: `User with id: ${id} deleted`,
            deletedUser
        }
        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    getUserById,
    deleteUser
};
