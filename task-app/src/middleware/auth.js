import jwt, { decode } from "jsonwebtoken"
import { User } from "../models/user.js"

export const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')
        const newToken = token[1].replace('/t', '')
        const decoded = jwt.verify(newToken, 'pedrofragahasler')

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        console.log('1')

        if (!user) {
            throw new Error()
        }

        req.user = user
        next()
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' })
    }
}