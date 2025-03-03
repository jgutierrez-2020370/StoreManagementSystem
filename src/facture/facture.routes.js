import { Router } from "express"
import { validateJwt } from "../../middlewares/validate.jwt.js"
import { createFacture, getMyFactures } from "./facture.controller.js"

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

export default api