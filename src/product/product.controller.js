import Category from "../category/category.model.js"
import Product from "./product.model.js"

export const saveProduct = async (req, res) => {
    let { name, description, price, category, stock} = req.body

    try {

        if (!category) {
            const defaultCategory = await Category.findOne({ name: 'default' })
            category = defaultCategory._id
        }

        const categoryData = await Category.findById( category )

        if (!categoryData) {
            return res.status(400).send(
                {
                success: false,
                message: "Category not found"
                }
            )
        }

        if(stock < 1 ) return res.status(500).send(
            {
                success: false,
                message: 'Stock must be minimun 1'
            }
        )

        const newProduct = new Product(
            {
                name,
                description,
                price,
                stock,
                category: [categoryData.id]
            }
        )

        await newProduct.save()

        const populatedProduct = await Product.findById(newProduct._id).populate("category", "name")

        return res.status(200).send(
            {
                success: true,
                message: 'Product added successfully',
                product: populatedProduct
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when saving product',
                err
            }
        )   
    }
}

export const getOneProduct = async(req,res) =>{
    const { name } = req.body
    try {
        const product = await Product.findOne({name: name}).populate("category", "name")

        if(!product) return res.status(404).send(
            {
                success: false,
                messagge: 'Product not found'
            }
        )

        return res.status(200).send(
            {
                success: true,
                messagge: 'Product: ',
                product
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when getting product',
                err
            }
        )   
    }
}

export const get = async(req, res)=>{
    try {

        const { limit = 20, skip = 0 } = req.query
        const products = await Product.find({ stock: { $ne: 0 } })
            .populate("category", "name")
            .skip(skip)
            .limit(limit)

        if(products.length === 0) return res.status(404).send(
            {
                success: false,
                message: 'Products not found'
            }
        )

        return res.send(
            {
                success: true,
                message: 'Categories found: ', 
                products,
                total: products.length
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when getting products',
                err
            }
        )   
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params
    const { category, ...data } = req.body

    try {
        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Product not found'
                }
            )
        }

        if (category) {
            const categoryData = await Category.findById( category )
            

            if (!categoryData) {
                return res.status(400).send(
                    {
                        success: false,
                        message: "Category not found"
                    }
                )
            }

            data.category = [categoryData._id]
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            data,
            { new: true }
        ).populate("category", "name")

        return res.send(
            {
                success: true,
                message: 'Product updated successfully',
                updatedProduct
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when updating product',
                err
            }
        )
    }
}

export const deleteProduct = async(req,res)=>{
    const { id } = req.params
    try {
            const product = await Product.findById(id)
            if (!product) {
                return res.status(404).send(
                    {
                        success: false,
                        message: 'Product not found'
                    }
                )
            }

            await Product.findByIdAndDelete(id)
    
            return res.status(200).send(
                {
                    success: true,
                   message: 'Product deleted successfully'
                }
            ) 
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when deleting product',
                err
            }
        )
    }
}

export const outOfStockProduct = async(req, res)=>{
    try {        
        const { limit = 20, skip = 0 } = req.query
        const products = await Product.find({ stock: 0})
            .populate("category", "name")
            .skip(skip)
            .limit(limit)

        if(products.length === 0) return res.status(404).send(
            {
                success: false,
                message: 'Products not found'
            }
        )

        return res.send(
            {
                success: true,
                message: 'Products found: ', 
                products,
                total: products.length
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when getting out stock products',
                err
            }
        )
    }
}

export const TopSellingProducts = async (req, res) =>{
    try {
        const limit = 3
        const topSP = await Product.find().sort({purchaseCount: -1}).limit(limit)

         return res.status(200).send(
            {
                success: true,
                message: 'most popular products',
                topSP
            }
         )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when top selling products',
                err
            }
        )
    }
}

export const getByCategory = async (req, res) => {
    try {
        const { id }= req.params

        const category = await Category.findById(id)

        if(!category){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Category not found'
                }
            )
        }

        const products = await Product.find({category: category._id}).populate({
            path: 'category',
            select: 'name', 
            model: 'Category'
          })

        if (!products){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Product not found'
                }
            )
        }

        return res.status(200).send(
            {
                success: true,
                message: 'Products',
                products
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when getting by category',
                err
            }
        )
    }
}