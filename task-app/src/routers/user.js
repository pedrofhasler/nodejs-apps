import express from "express";
import { User } from "../models/user.js";
import { auth } from "../middleware/auth.js"

const router = new express.Router()

export const userRouter = (app) => {

    router.post('', async(req, res) => {
        const user = new User(req.body)

        try {
            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).send({ user, token })
        } catch (e) {
            res.status(400).send(e)

        }
    })

    router.post('/login', async(req, res) => {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken()
            res.send({ user, token })
        } catch (error) {
            res.status(400).send()
        }
    })

    router.post('/logout', auth, async(req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token
            })
            await req.user.save()

            res.send()
        } catch (error) {
            res.status(500).send()
        }
    })

    router.post('/logoutAll', auth, async(req, res) => {
        try {
            req.user.tokens = []
            await req.user.save()

            res.send()
        } catch (error) {
            res.status(500).send()
        }
    })

    router.get('/me', auth, async(req, res) => {
        res.send(req.user)
    })

    router.patch('/me', auth, async(req, res) => {
        const updates = Objects.keys(req.body)
        const allowedUpdates = ['name', 'email', 'password', 'age']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }

        try {
            updates.forEach(element => req.user[element] = req.body[element])

            await req.user.save()

            res.status(200).send(req.user)

        } catch (error) {
            res.status(400).send()
        }
    })

    router.delete('/me', auth, async(req, res) => {
        try {
            // const user = await User.findByIdAndDelete(req.user._id)

            // if (!user) {
            //     return res.status(404).send()
            // }

            await req.user.remove()

            res.send(req.user)

        } catch (error) {
            res.status(500).send()
        }
    })

    app.use("/users", router)
}