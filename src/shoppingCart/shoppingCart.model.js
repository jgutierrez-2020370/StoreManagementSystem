import { Schema, model } from 'mongoose'

const itemSchema = Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Product is required']
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            default: 1
        },
        price: {
            type: Number,
            required: [true, 'Price is required']
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const cartSchema = Schema(
    {
        items: [itemSchema],
        total: {
            type: Number,
            required: [true, 'Total is required'],
            default: 0
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('Cart', cartSchema)
