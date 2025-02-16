import { Schema, model } from 'mongoose'

const cartSchema = Schema(
    {
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required'],
        },
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: [true, 'Product is required']
                },
                quantity: {
                    type: Number,
                    required: [true, 'Quantity is required'],
                    min: [1, 'The minimum quantity is 1']
                },
                price: {
                    type: Number,
                    required: [true, 'Price per unit is required']
                }
            }
        ],
        total: {
            type: Number,
            required: [true, 'Number is required'],
            default: 0
        },
        status: {
            type: String,
            enum: ['ACTIVE', 'PURCHASED'],
            default: 'active'
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('Cart', cartSchema)
