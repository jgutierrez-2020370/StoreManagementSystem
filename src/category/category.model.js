import { Schema,  model} from "mongoose";

const categorySchema = Schema(
    {
        name:{
            type: String,
            require: [true, 'Name is required'],
            unique: true,
            maxLength: [25, `Category name can't exceed 25 characters`]
        },
        description:{
            type: String,
            require: [true, 'Description is required'],
            maxLength: [100, `Description can't exeed 100 characters`]
        }
    },
    {
        versionKey: false,
        timeStamps: true
    }
)

export default model('Category', categorySchema)