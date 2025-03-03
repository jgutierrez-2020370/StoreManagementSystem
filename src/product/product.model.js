import { Schema, model } from "mongoose";

const productSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [75, "Name can't exceed 75 characters"]
        },
        description: {
            type: String,
            required: [true, 'description'],
            maxLength: [200, "Breed can't exceed 200 characters"]
        },
        price: {
            type: Number,
            required: [true, 'Price is required']
        },
        category: {
            type: [Schema.Types.ObjectId],
            ref: "Category", 
            default: []
        },
        stock: {
            type: Number,
            required: [true, 'Stock is required']
        },
        purchaseCount: {
            type: Number,
            default: 0
        }
    },
    {
        versionKey: false,
        timeStamps: true
    }
)

export default model('Product', productSchema)
