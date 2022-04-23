import express from "express";
import { User } from "../models/user.js";
import { auth } from "../middleware/auth.js";
import { sendWelcomeEmail, sendCancelationEmail } from "../emails/accounts.js"
import multer from "multer";
import sharp from "sharp";

const router = new express.Router()
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a image'))
        }

        cb(undefined, true)
    }
})

export const userRouter = (app) => {

    router.post('', async(req, res) => {
        const user = new User(req.body)

        try {
            await user.save()
            sendWelcomeEmail(user.email, user.name)
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
            await req.user.remove()
            sendCancelationEmail(req.user.email, req.user.name)
            res.send(req.user)

        } catch (error) {
            res.status(500).send()
        }
    })

    router.post('/me/avatar', auth, multer.single('profile'), async(req, res) => {
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()

        req.user.avatar = buffer
        await req.user.save()
        res.send()
    }, (error, req, res, next) => {
        res.status(400).send({ error: error.message })
    })

    router.delete('/me/avatar', auth, async(req, res) => {
        try {
            req.user.avatar = undefined
            await req.user.save()

            res.send(req.user)

        } catch (error) {
            res.status(500).send()
        }
    })

    router.get('/me/:id/avatar', async(req, res) => {
        try {
            const user = await User.findById(req.params.id)

            if (!user || !user.avatar) {
                throw new Error()
            }

            res.set('Content-Type', 'image/png')
            res.send(user.avatar)
        } catch (error) {
            res.status(400).send()
        }
    })

    app.use("/users", router)
}