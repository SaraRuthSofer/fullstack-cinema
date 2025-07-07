const express = require('express')
const cors = require('cors')
const connectDB = require('./configs/db')

const errorHandler = require('./middlewares/errorHandler')
const usersRouter = require('./routers/usersRouter')
const authRouter = require('./routers/authRouter')
const movieRouter = require('./routers/movieRouter')
const memberRouter = require('./routers/memberRouter')
connectDB()

const app = express()
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/movies', movieRouter)
app.use('/members', memberRouter)

app.use('/', (req, res) => res.send("Hello to Cinema!"))

app.use(errorHandler)
