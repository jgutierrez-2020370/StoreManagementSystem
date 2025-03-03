import { Router } from "express";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { deleteProductCart, getMyCart, updateCart } from "./shoppingCart.controller.js";
import { addCartValidator } from "../../middlewares/validators.js";

const api = Router()

api.post(
    '/',
    [
        validateJwt,
        addCartValidator
    ],
    updateCart
)

api.get(
    '/',
    [
        validateJwt
    ],
    getMyCart
)

api.delete(
    '/:id',
    [
        validateJwt
    ],
    deleteProductCart
)

export default api