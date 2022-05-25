const express = require("express");
const User = require("../models/users");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createUser = async (req, res) => {

    const user = req.body;
    user = await User.create(user);

    const result = {
        message: 'User created',
        user
    }
    res.status(201).json(result);
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateUser = async (req, res) => {

    const { id } = req.params;
    const user = req.body;
    user._id = id;

    user = await User.updateOne(user);

    const result = {
        message: 'User updated',
        user
    }
    res.json(result);
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updatePartialUser = (req, res) => {
    const result = {
        message: 'User updated with patch'
    }
    res.json(result);
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteUser = async (req, res) => {

    const { id } = req.params;
    const user = await User.findById(id);
    user.remove();

    //const id = req.params.id;
    const result = {
        message: `User with id: ${id} deleted`
    }
    res.json(result);
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    updatePartialUser,
    deleteUser
};
