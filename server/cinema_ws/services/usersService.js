const usersRepo = require('../repositories/usersRepo')
const usersFileRepo = require('../repositories/usersFileRepo')
const permissionsFileRepo = require('../repositories/permissionsFileRepo')


const getAllUsers = async () => {
    try {
        const users = await usersRepo.getAllUsers()
        const usersData = await usersFileRepo.getAllUsers()
        const permissions = await permissionsFileRepo.getAllPermissions()
        const res = usersData.map((userData) => {
            const user = users.find(u => u._id == userData.id)
            const perm = permissions.find(u => u.userID == userData.id)
            return { ...userData, userName: user ? user.userName : "undefined", permissions: perm.permissions }
        })
        return res
    }
    catch (error) {
        throw error
    }
}
const getUserById = async (id) => {
    try {
        const user = await usersRepo.getUserById(id)
        const userData = await usersFileRepo.getUserById(id)
        const permissions = await permissionsFileRepo.getPermissionsByUserId(id)

        return { ...userData, userName: user ? user.userName : "undefined", permissions: permissions.permissions??'no' }
    }
    catch (error) {
        throw error
    }
}

const createUser = async (obj) => {
    try {
        const user = await usersRepo.createUser({userName:obj.userName, password:"000000"})
        let data = { firstName, lastName, sessionTimeOut } = obj
        data.id = user._id
        data.createdAt = new Date().toLocaleDateString()
        const userData = await usersFileRepo.createUser(data) 
          const permissions = await permissionsFileRepo.createUserPermissions({userID: user._id, permissions:obj.permissions}) 
          return await getUserById(user._id)
        
    }
    catch (error) {
        throw error
    }
}

const updateUser = async (id, obj) => {
    try {
        const uUser = await usersRepo.updateUser(id, obj)
        const uUserData = await usersFileRepo.updateUser(id, obj)
        const uUserPerm = await permissionsFileRepo.updateUserPermissions(id, obj.permissions)
        if (uUserData.status == 200 && uUserPerm.status == 200 && uUser)
            return { status: 200, message: "User updated successfully" };
        else (!dUser)
            return "User Not Found"
    }
    catch (error) {
        throw error
    }
}
const deleteUser = async (id) => {
    try {
        const dUser = await usersRepo.deleteUser(id)
        const dUserData = await usersFileRepo.deleteUser(id)
        const dUserPerm = await permissionsFileRepo.deleteUserPermissions(id)
        if (dUserData.status == 204 && dUserPerm.status == 204 && dUser)
            return { status: 204, message: "User deleted successfully" };
        else (!dUser)
            return "User Not Found"
    }
    catch (error) {
        throw error
    }

}


module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser }