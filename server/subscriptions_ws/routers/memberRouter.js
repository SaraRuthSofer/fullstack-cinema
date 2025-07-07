const express = require('express')
const service = require('../services/membersService.js')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const filter = req.query
        const r = await service.getAllMembers(filter)
        res.json(r)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const r = await service.getMemberById(id)
        res.json(r)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const obj = req.body
        const r = await service.createMember(obj)
        res.json(r)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const obj = req.body
        const r = await service.updateMember(id, obj)
        res.json(r)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const r = await service.deleteMember(id)
        res.json(r)
    } catch (error) {
        next(error)
    }
})

module.exports = router