import { Router } from "express"
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js"
import { createFacture, getMyFactures, updateFacture } from "./facture.controller.js"

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

api.put(
    '/:id',
    [
        validateJwt,
        isAdmin
    ],
    updateFacture
)

export default api