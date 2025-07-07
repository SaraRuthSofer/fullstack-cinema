const express = require('express')
const service = require('../services/subscriptionsService.js')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const filter = req.query
        const r = await service.getAllSubscriptions(filter)
        res.json(r)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const r = await service.getSubscriptionById(id)
        res.json(r)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const obj = req.body
        const r = await service.createSubscription(obj)
        res.json(r)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const obj = req.body
        const r = await service.updateSubscription(id, obj)
        res.json(r)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const r = await service.deleteSubscription(id)
        res.json(r)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
