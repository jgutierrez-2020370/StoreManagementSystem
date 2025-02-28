import User from '../user/user.model.js'
import { encrypt } from '../../utils/encrypt.js'
import Cart from '../shoppingCart/shoppingCart.model.js'

export const defaultAdmin = async(req, res) => {
    try {
        const defautlAdmin = await User.findOne({name: 'Admin'})

        if (!defautlAdmin) {
            const carrito = new Cart(
                {
                    items: [],
                    total: 0,
                }
            )
            await carrito.save()

            const newADmin = new User(
                {
                    name: 'Admin',
                    surname: 'Admin',
                    username: 'Admin',
                    email: process.env.ADMIN_EMAIL,
                    password: await encrypt(process.env.ADMIN_PASS),
                    role: 'ADMIN',
                    cart: carrito._id
                }
            )
            await newADmin.save()
        }
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error whit default admin',
                err
            }
        )
    }
}

export const changeRole = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'User not found'
                }
            )
        }

        if (user.role === 'ADMIN') {
            return res.status(401).send(
                {
                    success: false,
                    message: 'Admins cannot be changed'
                }
            )
        }

        const newAdmin = await User.findByIdAndUpdate(
            id,
            { role: 'ADMIN' },
            { new: true }
        )

        res.status(200).send(
            {
                success: true,
                message: 'User updated to Admin',
                newAdmin
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error whit Changing role',
                err
            }
        )
    }
}
