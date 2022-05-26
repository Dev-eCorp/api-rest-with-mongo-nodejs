const UserRepository = require("../repositories/userRepository");
const repository = new UserRepository();

const findById = async (id) => {
    return repository.findById(id);
}

const findAll = async () => {
    return repository.findAll();
}

const save = async (user) => {
    return repository.save(user);
}

const update = async (id, user) => {
    return repository.update(id, user);
}

const remove = async (id) => {
    return repository.remove(id);
}

module.exports = {
    findById,
    findAll,
    save,
    update,
    remove
};