import express from "express";
import { User } from "../models/user.js";

const router = new express.Router()

export const userRouter = (app) => {

    router.post('', async(req, res) => {
        const user = new User(req.body)

        try {
            await user.save()
            res.status(201).send(user)
        } catch (e) {
            res.status(400).send(e)

        }
    })

    router.get('', async(req, res) => {

        try {
            const users = await User.find({})
            res.send(users)
        } catch (error) {
            res.status(500).send()
        }
    })

    router.get('/:id', async(req, res) => {
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

    router.patch('/:id', async(req, res) => {
        const updates = Objects.keys(req.body)
        const allowedUpdates = ['name', 'email', 'password', 'age']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }

        try {
            const user = await User.findById(req.params.id)

            updates.forEach(element => user[element] = req.body[element])

            await user.save()

            //const user = await User.findByIdAndUpdate(res.params.id, req.body, { new: true, runValidators: true })

            if (!user) {
                return res.status(404).send()
            }

            res.status(200).send(user)

        } catch (error) {
            res.status(400).send()
        }
    })

    router.delete('/:id', async(req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id)

            if (!user) {
                return res.status(404).send()
            }

            res.send(user)

        } catch (error) {
            res.status(500).send()
        }
    })

    app.use("/users", router)
}