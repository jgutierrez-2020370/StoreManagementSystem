import { body } from "express-validator"
import { existCategory, existEmail, existProduct, existUsername } from "./db.validators.js"
import { validateErrors } from "./validate.error.js"

export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('email', 'Email cannot be empty or is not a valid email')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
    validateErrors
]

export const updateAccountValidator = [
    body('name', 'Name cannot be empty')
        .optional(),
    body('surname', 'Surname cannot be empty')
        .optional(),
    body('username', 'Username cannot be empty')
        .optional()
        .toLowerCase()
        .custom(existUsername),
    body('email', 'Email cannot be empty or is not a valid email')
        .optional()
        .isEmail()
        .custom(existEmail),
    body('password', 'Password cannot be empty')
        .optional()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
    body('status',  'status can not be updated').not(),
    validateErrors
]

export const loginValidator = [
    body('userLoggin', 'Username or email cannot be empty')
        .notEmpty()
        .toLowerCase(),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
    validateErrors
]

export const categoryValidator = [
    body('name', 'name cannot be empty').notEmpty().custom(existCategory),
    body('description', 'description cannot be empty').notEmpty(),
    validateErrors
]


export const updateCategoryValidate = [
    body('name').optional(),
    body('description', 'description too long').optional().isLength({max: 100}),
    validateErrors
]

export const updateProductValidate =  [
    body('name', 'name is too long').optional().isLength({max: 75}),
    body('description', 'description too long').optional().isLength({max:200}),
    body('price').optional(),
    body('category').optional(),
    body('stock').optional(),
    validateErrors
]

export const createProductValidate = [
    body('name', 'name cannot be empty or is too long').notEmpty().isLength({max: 75}).custom(existProduct),
    body('description', 'description cannot be empty or is too long').notEmpty().isLength({max:200}),
    body('price', 'price cannot be empty').notEmpty(),
    body('category').optional(),
    body('stock', 'stock cannot be empty').notEmpty(),
    validateErrors
]

export const addCartValidator = [
    body('product', 'product cannot be empty').notEmpty(),
    body('quantity', 'quantity is required').notEmpty(),
    validateErrors
]

export const updateAccountValidatorAdmin = [
    body('name', 'Name cannot be empty')
        .optional(),
    body('surname', 'Surname cannot be empty')
        .optional(),
    body('username', 'Username cannot be empty')
        .optional()
        .toLowerCase()
        .custom(existUsername),
    body('email', 'Email cannot be empty or is not a valid email')
        .optional()
        .isEmail()
        .custom(existEmail),
    body('password', 'Password can not be updated')
        .not()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
    validateErrors
]