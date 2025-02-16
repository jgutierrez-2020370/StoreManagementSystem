import User from '../user/user.model.js'
import { checkPassword } from '../../utils/encrypt.js'
import { generatejwt } from '../../utils/jwt.js'

export const login = async (req, res) => {
    try {
        let { userLoggin, password } = req.body
        let user = await User.findOne(
            {
                $or: [
                    {username: userLoggin},
                    {email: userLoggin}
                ]
            }
        )

        if(user.status == false) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )

        if (user && await checkPassword(user.password, password)){
            let loggedUser = {
                uid: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }
            let token = await generatejwt(loggedUser) 
            return res.send(
                {
                    success: true,
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(400).send(
            {
                success: false,
                message: 'Wrong user or password'
            }
        ) 
        
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with login function'
            }
        )        
    }
}