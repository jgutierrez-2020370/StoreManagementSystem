import Cart from '../shoppingCart/shoppingCart.model.js'
import User from '../user/user.model.js'
import Product from '../product/product.model.js'
import Facture from './facture.model.js'

export const createFacture = async (req, res) => {
    try {
        const user = await User.findById(req.user.uid)
        const cart = await Cart.findById(user.cart).populate(
            {
                path: 'items.product',
                model: 'Product'
            }
        )
        
        if(cart.items.length == 0) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'There are no products in the cart'
                }
            )
        }

        for (let item of cart.items) {
            const product = await Product.findById(item.product._id)
            if (product.stock < item.quantity) {
                return res.status(400).send(
                    {
                        success: false,
                        message: `Not enough stock for product: ${product.name}`
                    }
                )
            }
        }

        const factureItems = cart.items.map(item => (
                {
                    product: item.product._id,
                    quantity: item.quantity,
                    price: item.price
                }
            )
        )
        
        const total = factureItems.reduce((sum, item) => sum + item.price, 0) 
        const iva = factureItems.reduce((sum, item) => sum + item.price, 0) + ((factureItems.reduce((sum, item) => sum + item.price, 0) ) * 0.12)

        const facture = new Facture(
            {
                user: req.user.uid,
                items: factureItems,
                total: total,
                subtotal: iva
            }
        )

        await facture.save()

        const populatedFacture = await Facture.findById(facture._id).populate(
            {
                path: 'items.product', 
                model: 'Product'
            }
        ).populate(
            {
                path: 'user',
                select: 'name email',
                model: 'User'
            }
        )

        cart.items.forEach(async item => {
            const product = await Product.findById(item.product._id);
            if (product) {
                    product.stock -= item.quantity
                    product.purchaseCount += item.quantity
                    await product.save()
                }
            }
        )

        await Cart.findByIdAndUpdate(
            cart._id,
            {
                items: [],
                total: 0,
            }
        )

        return res.status(200).send(
            {
                success: true,
                message: 'Facture generated',
                populatedFacture
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when creating facture'
            }
        )
    }
}

export const getMyFactures = async (req, res) => {
    try {
        const factures = await Facture.find({ user: req.user.uid, status: 'ACTIVE' }).populate(
            {
                path: 'items.product', 
                model: 'Product'
            }
        ).populate(
            {
                path: 'user',
                select: 'name email',
                model: 'User'
            }
        )

        if(!factures) {
            return res.status(404).send(
                {
                    success: true,
                    message: 'You do not have factures'
                }
            )
        }
        

        return res.status(200).send(
            {
                success: true,
                message: 'Your factures',
                factures
            }
        )
        
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when getting factures'
            }
        )
    }
}

export const getFactures = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query
        const factures = await Facture.find().populate(
            {
                path: 'items.product', 
                model: 'Product'
            }
        ).populate(
            {
                path: 'user',
                select: 'name email',
                model: 'User'
            }
        ).skip(skip)
        .limit(limit)

        if(!factures) {
            return res.status(404).send(
                {
                    success: true,
                    message: 'There are no factures'
                }
            )
        }
        

        return res.status(200).send(
            {
                success: true,
                message: 'Factures',
                factures
            }
        )
        
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when getting factures'
            }
        )
    }
}


export const updateFacture = async (req, res) =>{
    try {
        const { id } = req.params

        const facture = await Facture.findById(id)

        if(!facture){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Facture not found'
                }
            )
        }
        

        const factureUpdated = await Facture.findByIdAndUpdate(
            id,
            {status: 'ANNULED'},
            { new: true }
        ).populate(
            {
                path: 'items.product', 
                model: 'Product'
            }
        ).populate(
            {
                path: 'user',
                select: 'name email',
                model: 'User'
            }
        )

        return res.status(200).send(
            {
                success: true,
                message: 'Facture annuled',
                factureUpdated
            }
        )


    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when getting facture'
            }
        )
    }
}