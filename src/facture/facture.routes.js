import { Router } from "express"
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js"
import { createFacture, getFactures, getMyFactures, updateFacture } from "./facture.controller.js"

const api = Router()

api.post(
    '/',
    [
        validateJwt
    ],
    createFacture
)

api.get(
    '/',
    [
        validateJwt
    ],
    getMyFactures
)

api.get(
    '/getAll',
    [
        validateJwt,
        isAdmin
    ],
    getFactures
)

api.put(
    '/:id',
    [
        validateJwt,
        isAdmin
    ],
    updateFacture
)

export default api