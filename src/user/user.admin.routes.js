import { Router } from "express";
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";
import { changeRole } from "./user.admin.controller.js";

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

export default api