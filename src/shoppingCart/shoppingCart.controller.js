import Cart from '../shoppingCart/shoppingCart.model.js'
import User from '../user/user.model.js'
import Product from '../product/product.model.js'

export const updateCart = async (req, res) => {
    try {
        let { product, quantity } = req.body

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

        const alreadyExist = cart.items.find(item => item.product.toString() === product.toString())
        
        if (alreadyExist) {
            if ((Number(alreadyExist.quantity) + Number(quantity)) > productFind.stock){
                return res.status(400).send(
                    {
                        success: false,
                        message: 'Stock is not enough'
                    }
                )
            } else {
                alreadyExist.quantity = Number(alreadyExist.quantity) + Number(quantity)
                alreadyExist.price = productFind.price * alreadyExist.quantity
            }
        } else {
            cart.items.push(
                {
                    product,
                    quantity,
                    price: productFind.price * quantity
                }
            )
        }

        cart.total = cart.items.reduce((sum, item) => sum + item.price, 0)

        await cart.save()

        const cartPopulate = await Cart.findById(cart._id).populate(
            {
                path: 'items.product',
                select: 'name price description stock',
                populate: {
                    path: 'category',
                    select: 'name -_id'
                }
            }
        )

        return res.status(200).send(
            {
                success: true,
                message: 'Cart updated successfully',
                cartPopulate
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
        
        const cart = await Cart.findById(user.cart).populate(
            {
                path: 'items.product',
                select: 'name price description stock',
                populate: {
                    path: 'category',
                    select: 'name -_id'
                }
            }
        )
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

export const deleteProductCart = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findById(req.user.uid)
        const cart = await Cart.findById(user.cart)

        const product = await Product.findById(id)

        const alreadyExist = cart.items.find(item => item.product.toString() === product._id.toString())

        if (!alreadyExist) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'the product is not in your cart'
                }
            )
        }

        cart.items.splice(alreadyExist, 1)

        cart.total = cart.items.reduce((sum, item) => sum + item.price, 0)

        await cart.save()

        const updatedCart = await Cart.findById(cart._id).populate(
            {
                path: 'items.product',
                select: 'name price description stock',
                populate: {
                    path: 'category',
                    select: 'name -_id'
                }
            }
        )

        return res.status(200).send(
            {
                success: true,
                message: 'Product removed successfully',
                cart: updatedCart
            }
        )

        
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when deleting product from the car'
            }
        )
    }
}