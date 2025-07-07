const repo = require('../repositories/subscriptionsRepo')
const subscriptions = require('./subscriptionsService')

const API_URL = 'http://localhost:3000/members'

const getAllMembers = async () => {
    try {
        const res = await repo.getAll(API_URL)
        const subsc = await subscriptions.getAllSubscriptions()
        const memberList = await Promise.all(
            res.map(async (member) => {
                const movies = (await getSubscByMemId(member._id, subsc))?.movies ?? [];
                return { ...member, movies: movies };
            })
        );
        return memberList;
    }
    catch (error) { throw error }
}
const getMemberById = async (id) => {
    try {
        const res = await repo.getById(API_URL, id)
        const movies = await getSubscByMemId(res._id)?.movies ?? [];
        return { ...res, movies: movies }
    }
    catch (error) { throw error }

}
const createMember = async(obj) => {
    try {
        const res = await repo.create(API_URL, obj)
        return {...res, movies:[]}
    }
    catch (error) { throw error }

}
const updateMember = (id, obj) => {
    try {
        const res = repo.update(API_URL, id, obj)
        return res
    }
    catch (error) { throw error }
}
const deleteMember = async (id) => {
    try {
        const deleteMember = await repo.deleted(API_URL, id)
        const ss =await getSubscByMemId(id, []) 
          if(ss)
            await subscriptions.deleteSubscription(ss._id)
        return deleteMember
    }
    catch (error) { return error }
}
const getSubscByMemId = async (id, subsc = null) => {
    let subList = subsc ?? []

    if (subList.length < 1) {
        subList = await subscriptions.getAllSubscriptions()
    }
    const s = subList.find(x => x.memberId == id)
    return s
}
const subscribe = async (memberId, obj) => {
    try {
        let ss = await getSubscByMemId(memberId, [])
        let res = "nnn"

        if (ss) {
            ss.movies.push(obj)
            res = await subscriptions.updateSubscription(ss._id, ss)
        }
        else {
            const a = { memberId: memberId, movies: [obj] }
            res = await subscriptions.createSubscription(a);
        }
        return res
    }
    catch (error) { return error }


}

module.exports = { getAllMembers, getMemberById, createMember, updateMember, deleteMember, subscribe }