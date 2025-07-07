const express = require('express');
const service = require('../services/usersService.js')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const data = await service.getAllUsers()
        res.json(data)
    }
    catch (error) { next(error) }
})
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await service.getUserById(id)
        res.json(data)
    }
    catch (error) { next(error) }
})


router.post('/', async (req, res, next) => {
    try {
        const obj = req.body
        const r = await service.createUser(obj)
        res.json(r)
    }
    catch (error) {
        next(error)
    }
})
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const obj = req.body
        const r = await service.updateUser(id, obj)
        res.json(r)
    }
    catch (error) {
        next(error)
    }
})
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const r = await service.deleteUser(id)
        res.json(r)
    }
    catch (error) {
        next(error)
    }
})

module.exports = router