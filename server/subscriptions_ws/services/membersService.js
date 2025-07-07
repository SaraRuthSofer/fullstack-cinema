const repo = require('../repositories/membersRepo.js');


const getAllMembers = async (filter) => {
    try {
        return await repo.getAllMembers(filter)
    }
    catch (error) {
        throw error
    }
}
const getMemberById = async (id) => {
    try {
        const r = await repo.getMemberById(id)
        return r
    }
    catch(error) {
throw error
    }
}
const createMember = async (obj) => {
    try {
        return await repo.createMember(obj)
    }
    catch (error) {
        throw error
    }
}
const updateMember = async (id, obj) => {
    try {
        return await repo.updateMember(id, obj)
    }
    catch (error) {
        throw error
    }
}
const deleteMember = async (id) => {
    try {
        return await repo.deleteMember(id)
    }
    catch (error) {
        throw error
    }
}



module.exports = { getAllMembers, getMemberById, createMember, updateMember, deleteMember }