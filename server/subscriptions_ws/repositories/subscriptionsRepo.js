const Subscription = require('../models/subscriptionModel.js')


const getAllSubscriptions = (filter) => {
    return Subscription.find(filter)
}
const getSubscriptionById = (id) => {
    return Subscription.findById(id)
}
const createSubscription = (subscription) => {
    const newSubscription = new Subscription(subscription)
    return newSubscription.save()
}
const updateSubscription = (id, subscription) => {
    return Subscription.findByIdAndUpdate(id, subscription, { new: true })
}
const deleteSubscription = (id) => {
    return Subscription.findByIdAndDelete(id)
}

module.exports = {
    getAllSubscriptions,
    getSubscriptionById,
    createSubscription,
    updateSubscription,
    deleteSubscription,
}

