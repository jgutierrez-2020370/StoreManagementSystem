import { Router } from "express";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { getMyCart, updateCart } from "./shoppingCart.controller.js";

const api = Router()

api.post(
    '/',
    [
        validateJwt
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

export default api