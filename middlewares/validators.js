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

export const deleteValidator = [
    body('id', 'Id cannot be empty').notEmpty(),
    validateErrors
]

export const updateCategoryValidate = [
    body('name').optional(),
    body('description').optional().isLength({max: 100}),
    validateErrors
]

export const updateProductValidate =  [
    body('name').optional().isLength({max: 25}),
    body('description').optional().isLength({max:50}),
    body('price').optional(),
    body('category').optional(),
    body('stock').optional(),
    validateErrors
]

export const createProductValidate = [
    body('name').notEmpty().isLength({max: 25}).custom(existProduct),
    body('description').notEmpty().isLength({max:50}),
    body('price').notEmpty(),
    body('category').optional(),
    body('stock').notEmpty(),
    validateErrors
]