const repo = require('../repositories/subscriptionsRepo.js')

const getAllSubscriptions = async (filter) => {
    try {
        return await repo.getAllSubscriptions(filter)
    } catch (error) {
        throw error
    }
}
const getSubscriptionById = async (id) => {
    try {
        return await repo.getSubscriptionById(id)
    } catch (error) {
        throw error
    }
}
const createSubscription = async (obj) => {
    try {
        return await repo.createSubscription(obj)
    } catch (error) {
        throw error
    }
}
const updateSubscription = async (id, obj) => {
    try {
        return await repo.updateSubscription(id, obj)
    } catch (error) {
        throw error
    }
}
const deleteSubscription = async (id) => {
    try {
        return await repo.deleteSubscription(id)
    } catch (error) {
        throw error
    }
}

module.exports = { getAllSubscriptions, getSubscriptionById, createSubscription, updateSubscription, deleteSubscription };
