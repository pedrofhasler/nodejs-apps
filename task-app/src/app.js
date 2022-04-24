import express from 'express'
import './db/mongoose.js'
import { userRouter } from './routers/user.js'
import { taskRouter } from './routers/task.js'

const app = express()

app.use(express.json())
userRouter(app)
taskRouter(app)

module.exports = app