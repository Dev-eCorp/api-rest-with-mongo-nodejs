const { Router } = require("express");
const {
    getAllUsers,
    createUser,
    updateUser,
    getUserById,
    deleteUser
} = require("../controllers/users");
const {
    postRequestValidation,
    putRequestValidation,
    getAllRequestValidation,
    getRequestValidation,
    deleteRequestValidation
} = require("../middlewares/users");

const router = Router();

router.get("/", getAllRequestValidation, getAllUsers);
router.post("/", postRequestValidation, createUser);
router.put("/:id", putRequestValidation, updateUser);
router.get("/:id", getRequestValidation, getUserById);
router.delete("/:id", deleteRequestValidation, deleteUser);

module.exports = router;