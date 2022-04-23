import express from 'express'
import './db/mongoose.js'
import { userRouter } from './routers/user.js'
import { taskRouter } from './routers/task.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
userRouter(app)
taskRouter(app)

app.listen(PORT, () => {
    console.log('Server is running at port ' + PORT)
})