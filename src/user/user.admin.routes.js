import { Router } from "express";
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";
import { changeRole, deleteUserAccount, updateUserProfile } from "./user.admin.controller.js";
import { updateAccountValidatorAdmin } from "../../middlewares/validators.js";

const api = Router()

//Ruta Públicas
api.put(
    '/changeRol/:id',
    [
        validateJwt,
        isAdmin,
    ],
    changeRole
)

api.put(
    '/:id',
    [
        validateJwt,
        isAdmin,
        updateAccountValidatorAdmin
    ],
    updateUserProfile
)

api.delete(
    '/:id',
    [
        validateJwt,
        isAdmin
    ],
    deleteUserAccount
)

export default api