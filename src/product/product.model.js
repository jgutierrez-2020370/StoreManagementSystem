import { Schema, model } from "mongoose";

const productSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [25, "Name can't exceed 25 characters"]
        },
        description: {
            type: String,
            required: [true, 'description'],
            maxLength: [50, "Breed can't exceed 50 characters"]
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
        status: {
            type: String,
            required: [true, 'status is required'],
            uppercase: true,
            enum: ['STOCK', 'OUTOFSTOCK']
        }
    },
    {
        versionKey: false,
        timeStamps: true
    }
)

export default model('Product', productSchema)
