import e from 'express'
import express from 'express'
import './db/mongoose.js'
import { User } from './models/user.js'
import { Task } from './models/task.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    user.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.listen(PORT, () => {
    console.log('Server is running at port ' + PORT)
})