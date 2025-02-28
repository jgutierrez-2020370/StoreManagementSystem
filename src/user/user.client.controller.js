import User from '../user/user.model.js'
import { checkPassword } from '../../utils/encrypt.js'

export const deleteAccount = async (req, res) => {
    const { password } = req.params
    try {
        const user = await User.findById(req.user.uid)
       
        const pass = await checkPassword(user.password, password)

        if(user.status === false) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'User not found'
                }
            )
        }

        if(user.role == "ADMIN") {
            return res.status(401).send(
                {
                    success: false,
                    message: 'Admins cannot be deleted'
                }
            )
        }

        if (!pass) {
            return res.status(401).send(
                {
                    success: false,
                    message: 'Incorrect password'
                }
            )
        }

        await User.findByIdAndUpdate(
            user, 
            { status: false }, 
            { new: true }
        )

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
    const { password } = req.params
    const { ...data } = req.body
    try {
        const user = await User.findById(req.user.uid)
        const pass = await checkPassword(user.password, password)

        if(user.status === false) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'User not found'
                }
            )
        }

        if(user.role == "ADMIN") {
            return res.status(401).send(
                {
                    success: false,
                    message: 'Admins cannot be udated'
                }
            )
        }

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
        ).populate('cart', 'items total')

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
