import Cart from '../shoppingCart/shoppingCart.model.js'
import User from '../user/user.model.js'
import Product from '../product/product.model.js'

export const updateCart = async (req, res) => {
    try {
        const { product, quantity } = req.body

        const user = await User.findById(req.user.uid)
        const cart = await Cart.findById(user.cart)

        const productFind = await Product.findById(product)

        if (!productFind) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'Product not found'
                }
            )
        }

        if (quantity < 1) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'Quantity must be greater than 0'
                }
            )
        }

        if (quantity > productFind.stock) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'Stock is not enough'
                }
            )
        }

        cart.items.push(
            {
                product,
                quantity,
                price: productFind.price*quantity
            }
        )

        cart.total = cart.items.reduce((sum, item) => sum + item.price, 0)

        await cart.save()

        return res.status(200).send(
            {
                success: true,
                message: 'Cart updated successfully',
                cart
            }
        )
        
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when adding product to the cart'
            }
        )
    }
}

export const getMyCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.uid)
        console.log(user);
        
        const cart = await Cart.findById(user.cart)

        if(!cart){
            res.status(404).send(
                {
                    success: false,
                    message: 'Cart not found'
                }
            )
        }

        return res.status(200).send(
            {
                success: true,
                message: 'Cart:',
                cart
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when getting the cart'
            }
        )
    }
}