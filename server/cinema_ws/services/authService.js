const usersRepo = require('../repositories/usersRepo')
const usersFileRepo = require('../repositories/usersFileRepo')
const { Error } = require('mongoose')



const login = async (data) => {
    try {
        const { userName, password } = data
        const user = await usersRepo.getAllUsers({ userName, password })
        if (user[0]) {
            const uu = await usersFileRepo.getUserById(user[0]._id)
            if (uu) {
                return uu
            }
            else {
                throw Object.assign(new Error("User not found"), { status: 404 });
            }
        }
        else {
            throw Object.assign(new Error("User not found"), { status: 404 });
        }
    }
    catch (error) {
        throw error
    }
}
const register = async (data) => {
    try {
        const { userName, password } = data
        const user = await usersRepo.getAllUsers({ userName })
        if (user[0]) {
            const u = await usersRepo.updateUser(user[0]._id, { userName, password })
            const uu = await usersFileRepo.getUserById(user[0]._id)
            return uu
        }
        else {
            throw Object.assign(new Error("User not found"), { status: 404 });
        }
    }
    catch (error) { throw error }
    }

module.exports = { login, register }