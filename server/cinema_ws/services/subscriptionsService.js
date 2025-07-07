const repo = require('../repositories/subscriptionsRepo')

const API_URL = 'http://localhost:3000/subscriptions'


const getAllSubscriptions = async () => {
    try {
        const subsc = await repo.getAll(API_URL)
        return subsc
    }
    catch (error) {
        throw error
    }
}
const getSubscriptionById = (id) => {
    try {
        return repo.getById(API_URL, id)
    }
    catch (error) {
        throw error
    }
}
const createSubscription = async (obj) => {
    try {
        const x = await repo.create(API_URL, obj)
        return x
    }
    catch (error) {
        throw error
    }
}
const updateSubscription = (id, obj) => {
    try {
        return repo.update(API_URL, id, obj)
    }
    catch (error) {
        throw error
    }
}
const deleteSubscription = async (id) => {
    try {
        const delSubscription = await repo.deleted(API_URL, id)
        return delSubscription
    }
    catch (error) {
        throw error
    }
}

const getSubscByMemberId = async (id) => {
    const res = repo.getAll(`${API_URL}/?memberId=${id}`)
    return res
}


module.exports = { getAllSubscriptions, getSubscriptionById, createSubscription, updateSubscription, deleteSubscription, getSubscByMemberId }