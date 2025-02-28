import { Router } from "express";
import { deleteAccount, updateProfile } from "./user.client.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { updateAccountValidator } from "../../middlewares/validators.js";

const api = Router()

//Ruta Públicas


api.delete(
    '/:password',
    [
        validateJwt
    ],
    deleteAccount
)


api.put(
    '/:password',
    [
        validateJwt,
        updateAccountValidator
    ],
    updateProfile
)

export default api