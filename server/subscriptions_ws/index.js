const express = require('express')
const cors = require('cors')

const connectDB = require('./configs/db')
const populateDataIfFirstRun = require('./services/initialData')

const membersRouter = require('./routers/memberRouter')
const moviesRouter = require('./routers/moviesRouter')
const subscriptionsRouter = require('./routers/subscriptionsRouter')
const errorHandler = require('./middlewares/errorHandler')

connectDB()
populateDataIfFirstRun()


const app = express()
const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


app.use(cors())
app.use(express.json())
app.use('/members', membersRouter)
app.use('/movies', moviesRouter)
app.use('/subscriptions', subscriptionsRouter)

app.use(errorHandler)