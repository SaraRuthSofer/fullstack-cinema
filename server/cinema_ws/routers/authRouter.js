const express = require('express')
const service = require('../services/authService')

const router = express.Router()

router.post('/login', async (req, res, next) => {
    try {
        const data = req.body
        const response = await service.login(data)
        res.json(response)
    }
    catch (error) {
        next(error)
    }
})
router.post('/register', async (req, res, next) => {
    try {
        const data = req.body
        const response = await service.register(data)
        res.json(response)
    }
    catch (error) {
        next(error)
    }
})



module.exports = router