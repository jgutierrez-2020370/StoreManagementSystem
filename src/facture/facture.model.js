import { model, Schema } from "mongoose";

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

const factureSchema = Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: [true, 'User is required'],
            ref: 'User',    
        },
        items: [itemSchema],
        total: {
            type: Number,
            required: [true, 'Total is required'],
            default: 0
        },
        subtotal: {
            type: Number,
            required: [true, 'Subtotal is required'],
            default: 0
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('Facture', factureSchema)
