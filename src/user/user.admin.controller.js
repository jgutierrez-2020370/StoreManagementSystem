import User from '../user/user.model.js'
import { encrypt } from '../../utils/encrypt.js'

export const registerAdmin = async(req, res) => {
    try {
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
        user.role = 'ADMIN'
        await user.save()
        return res.send(
            {
                success: true,
                message: `Admin registed succesfully, can be logged with username: ${user.username}`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with register admin'
            }
        )
    }
}

