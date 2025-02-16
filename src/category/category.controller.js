import Category from "../category/category.model.js"
import product from "../product/product.model.js"

export const defaultCategory = async () => {
    try {
        const defaultCategory = await Category.findOne({ name: 'default' })

        if (!defaultCategory) {
            const newCategory = new Category({
                name: 'default',
                description: 'Default category for unclassified products'
            })

            await newCategory.save() 
        }
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error whit default category',
                err
            }
        )
    }
}

export const saveCategory = async(req, res)=>{
    const data = req.body
    try {
        const category = new Category(data)
        await category.save()

        return res.status(200).send(
            {
                success: true,  
                message: 'Category added succesfully'
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when saving category',
                err
            }
        )
    }
}

export const getCategories = async(req, res)=>{
    try {

        const { limit = 20, skip = 0 } = req.query
        const categories = await Category.find()
            .skip(skip)
            .limit(limit)

        if(categories.length === 0) return res.status(404).send(
            {
                success: false,
                message: 'Categories not found'
            }
        )

        return res.send(
            {
                success: true,
                message: 'Categories found: ', 
                categories,
                total: categories.length
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}

export const deleteCategory = async (req, res) => {
    const { id } = req.body

    try {
        const category = await Category.findById(id)
        if (!category) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Category not found'
                }
            )
        }

        if (category.name.toLowerCase() === 'default') {
            return res.status(400).send(
                {
                    success: false,
                    message: "'default' category cannot be deleted"
                }
            )
        }

        await Category.findByIdAndDelete(id)

        const defaultCategory = await Category.findOne({ name: 'default' })

        await product.updateMany(
            { category: id }, 
            { $set: { category: defaultCategory._id } }
        )

        return res.status(200).send(
            {
                success: true,
               message: 'Category deleted successfully'
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when deleting category',
                err
            }
        )
    }
}

export const updateCategory = async(req, res)=>{
    const { id } = req.params
    const data =  req.body
    try {
        
        const category = await Category.findById(id)
        if (!category) return res.status(404).send(
            {
                success: false,
                message: 'Category not foud'
            }
        )

        const upadateCategory = await Category.findByIdAndUpdate(
            id,
            data,
            {new : true}
        )

        return res.send(
            {
                message: 'Category Updated succesfully',
                upadateCategory
            }
        )
                
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when deleting category',
                err
            }
        )
    }
}