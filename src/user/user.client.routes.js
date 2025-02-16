import { Router } from "express";
import { deleteAccount, registerUser, updateProfile } from "./user.client.controller.js";
import { registerValidator } from "../../middlewares/validators.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";

const api = Router()

//Ruta Públicas

api.post(
    '/Register',
    [registerValidator],
    registerUser
)

api.delete(
    '/',
    [validateJwt],
    deleteAccount
)


api.put(
    '/',
    [validateJwt],
    updateProfile
)

export default api