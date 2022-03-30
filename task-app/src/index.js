import e from 'express'
import express from 'express'
import './db/mongoose.js'
import { User } from './models/user.js'
import { Task } from './models/task.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// USERS
app.post('/users', async(req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)

    }
})

app.get('/users', async(req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send()
    }
})

app.get('/users/:id', async(req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send
        }

        res.send(user)
    } catch (error) {
        res.status(500)
    }
})


//TASKS
app.post('/tasks', async(req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(e)
    }
})

app.get('/tasks', async(req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send()
    }
})

app.get('/tasks/:id', async(req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task) {
            return res.status(404).send
        }

        res.send(task)
    } catch (error) {
        res.status(500)
    }
})

app.listen(PORT, () => {
    console.log('Server is running at port ' + PORT)
})