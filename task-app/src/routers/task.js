import express from "express";
import { Task } from "../models/task.js";
import { auth } from '../middleware/auth.js'

const router = new express.Router()

export const taskRouter = (app) => {

    router.post('', auth, async(req, res) => {
        const task = new Task({
            ...req.body,
            owner: req.user._id
        })

        try {
            await task.save()
            res.status(201).send(task)
        } catch (error) {
            res.status(400).send(e)
        }
    })

    router.get('', async(req, res) => {

        try {
            const tasks = await Task.find({})
            res.send(tasks)
        } catch (error) {
            res.status(500).send()
        }
    })

    router.get('/:id', async(req, res) => {
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

    router.patch('/:id', async(req, res) => {
        const updates = Objects.keys(req.body)
        const allowedUpdates = ['description', 'completed']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }

        try {
            const task = await Task.findById(res.params.id)

            updates.forEach(element => task[element] = req.body[element])

            await task.save()

            if (!task) {
                return res.status(404).send()
            }

        } catch (error) {
            res.status(400).send()
        }
    })

    router.delete('/:id', async(req, res) => {
        try {
            const task = await Task.findByIdAndDelete(req.params.id)

            if (!task) {
                return res.status(404).send()
            }

            res.send(task)

        } catch (error) {
            res.status(500).send()
        }
    })

    app.use("/tasks", router)
}