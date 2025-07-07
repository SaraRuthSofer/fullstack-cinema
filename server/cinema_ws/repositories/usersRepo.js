const User = require('../models/userModel');

const getAllUsers =  (filter) => {
        return User.find(filter);
};
const getUserById = (id) => {
       return  User.findById(id);   
}
const createUser = (userData) => {
    const newUser = new User(userData);
    return newUser.save();
};
const updateUser = (id, userData) => {
    return User.findByIdAndUpdate(id, userData, { new: true });
}
const deleteUser = (id) => {
    return User.findByIdAndDelete(id);
}
module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};