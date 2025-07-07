const jf = require('jsonfile')

const FILE = './data/permissions.json'

const getAllPermissions = () => {
    return jf.readFile(FILE)
}
const getPermissionsByUserId = async (id) => {
    const data = await getAllPermissions()
    return data.find(u => u.userID == id)
}
const createUserPermissions = async (userData) => {
    let data = await getAllPermissions()
    const newPerm = { userID: userData.userID, permissions: userData.permissions }
    data.push(newPerm)
    await jf.writeFile(FILE, data)
    return { status: 200, message: "Permissions created" };
};
const updateUserPermissions = async (id, permData) => {
    let data = await getAllPermissions()
    const newPerm = { userID: id, permissions: permData }
    data = data.filter(x => x.userID !== id)
    data.push(newPerm)
    await jf.writeFile(FILE, data)
    return { status: 200, message: "Permissions updated" };
}
const deleteUserPermissions = async (id) => {
    let data = await getAllPermissions()
    data = data.filter(x => x.userID != id)
    await jf.writeFile(FILE, data)
    return { status: 204, message: "Permissions deleted" };
}

module.exports = { getAllPermissions, getPermissionsByUserId, createUserPermissions, updateUserPermissions, deleteUserPermissions }
