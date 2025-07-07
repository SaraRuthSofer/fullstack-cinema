const jf = require('jsonfile')

const FILE = './data/users.json'

const getAllUsers = () => {
    return jf.readFile(FILE)

}
const getUserById = async (id) => {
    const data = await getAllUsers()
    return data.find(u => u.id == id)
}
const createUser = async (userData) => {
    let data = await getAllUsers()
    const newUser = { id, firstName, lastName, createdAt, sessionTimeOut } = userData
    data.push(newUser)
   await jf.writeFile(FILE, data)
    return { status: 200, message: "userData created" };
};
const updateUser = async (id, userData) => {
    let data = await getAllUsers()
    const newUser = { id, firstName, lastName, createdAt, sessionTimeOut } = userData
    data = data.filter(x => x.id !== id)
    data.push(newUser)
    await jf.writeFile(FILE, data)
    return { status: 200, message: "userData updated" };
}
const deleteUser = async (id) => {
    let data = await getAllUsers()
    data = data.filter(x => x.id != id)
    await jf.writeFile(FILE, data)
    return { status: 204, message: "userData deleted" };

}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
