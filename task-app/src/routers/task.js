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

    router.get('', auth, async(req, res) => {

        try {
            const tasks = await Task.find({ owner: req.user._id })
            res.send(tasks)
        } catch (error) {
            res.status(500).send()
        }
    })

    router.get('/:id', auth, async(req, res) => {
        const _id = req.params.id

        try {
            const task = await Task.findOne({ _id, owner: req.user._id })

            if (!task) {
                return res.status(404).send
            }

            res.send(task)
        } catch (error) {
            res.status(500)
        }
    })

    router.patch('/:id', auth, async(req, res) => {
        const updates = Objects.keys(req.body)
        const allowedUpdates = ['description', 'completed']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }

        try {
            const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

            if (!task) {
                return res.status(404).send()
            }

            updates.forEach(element => task[element] = req.body[element])

            await task.save()

        } catch (error) {
            res.status(400).send()
        }
    })

    router.delete('/:id', auth, async(req, res) => {
        try {
            const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

            res.send(task)

        } catch (error) {
            res.status(500).send()
        }
    })

    app.use("/tasks", router)
}