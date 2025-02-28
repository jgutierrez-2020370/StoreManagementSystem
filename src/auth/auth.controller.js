import User from '../user/user.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.js'
import { generatejwt } from '../../utils/jwt.js'
import Cart from '../shoppingCart/shoppingCart.model.js'

export const registerUser = async(req, res) => {
    try {
        let data = req.body
        const carrito = new Cart(
            {
                items: [],
                total: 0,
            }
        )
        await carrito.save()
        let user = new User(
            {
                ...data, 
                cart: carrito._id
            }
        )
        user.password = await encrypt(user.password)
        user.role = 'CLIENT'
        await user.save()

        const userPopulate = await user.populate('cart', 'items total')
        return res.status(200).send(
            {
                success: true,
                message: `registration successful, can be logged with ${user.username} or ${user.email}`,
                user
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
            return res.status(200).send(
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