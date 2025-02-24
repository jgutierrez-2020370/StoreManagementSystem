import { Router } from "express";
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";
import { deleteProduct, get, getOneProduct, outOfStockProduct, saveProduct, updateProduct } from "./product.controller.js";
import { createProductValidate, updateProductValidate } from "../../middlewares/validators.js";

const api = Router()

//Rutas públicas

api.get(
    '/OutOfStock',
    [
        validateJwt,
        isAdmin
    ],
    outOfStockProduct
)

api.get(
    '/',
    [
        validateJwt
    ],
    get
)

//Rutas privadas admin

api.post(
    '/',
    [
        validateJwt,
        isAdmin,
        createProductValidate
    ],
    saveProduct
)

api.delete(
    '/',
    [
        validateJwt,
        isAdmin,
    ],
    deleteProduct
)

api.get(
    '/:id',
    [
        validateJwt
    ],
    getOneProduct
)

api.put(
    '/:id',
    [
        validateJwt,
        isAdmin,
        updateProductValidate
    ],
    updateProduct
)

export default api
