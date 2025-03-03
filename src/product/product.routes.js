import { Router } from "express";
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";
import { deleteProduct, get, getByCategory, getOneProduct, outOfStockProduct, saveProduct, TopSellingProducts, updateProduct } from "./product.controller.js";
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

api.get(
    '/Popular',
    [
        validateJwt
    ],
    TopSellingProducts
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

api.get(
    '/getByName',
    [
        validateJwt
    ],
    getOneProduct
)

api.delete(
    '/:id',
    [
        validateJwt,
        isAdmin,
    ],
    deleteProduct
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

api.get(
    '/:id',
    [
        validateJwt
    ],
    getByCategory
)

export default api
