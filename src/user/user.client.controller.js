import User from '../user/user.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.js'
import jwt from 'jsonwebtoken'

export const registerUser = async(req, res) => {
    try {
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
        user.role = 'CLIENT'
        await user.save()
        return res.send(
            {
                success: true,
                message: `User registred succesfully, can be logged with username: ${user.username}`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with register user'
            }
        )
    }
}

export const deleteAccount = async (req, res) => {
    const { password } = req.body
    try {
        const user = await User.findById(req.user.uid)
        const pass = await checkPassword(user.password, password)
        
        if (!pass) {
            return res.status(401).send(
                {
                    success: false,
                    message: 'Incorrect password'
                }
            )
        }

        await User.findByIdAndUpdate(user, { status: false }, { new: true })

        return res.send(
            {
                success: true,
                message: 'Your account was deleted successfully'
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error deleting account'
            }
        )
    }
}

export const updateProfile = async (req, res)=> {
    const { password, ...data } = req.body
    try {
        const user = await User.findById(req.user.uid)
        const pass = await checkPassword(user.password, password)
        
        if (!pass) {
            return res.status(401).send(
                {
                    success: false,
                    message: 'Incorrect password'
                }
            )
        }

        const userUpadted = await User.findByIdAndUpdate(
            user,
            data,
            { new: true }
        )

        return res.send(
            {
                success: true,
                message: 'Your account was updated successfully',
                userUpadted
            }
        )



    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error updating account'
            }
        )
    }
}
