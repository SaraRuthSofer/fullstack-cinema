const Member = require('../models/memberModel');

const getAllMembers =  (filter) => {
        return Member.find(filter);
};
const getMemberById = (id) => {
       return  Member.findById(id);   
}
const createMember = (memberData) => {
    const newMember = new Member(memberData);
    return newMember.save();
};
const updateMember = (id, memberData) => {
    return Member.findByIdAndUpdate(id, memberData, { new: true });
}
const deleteMember = (id) => {
    return Member.findByIdAndDelete(id);
}
module.exports = {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember
};