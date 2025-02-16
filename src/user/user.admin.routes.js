import { Router } from "express";
import { registerAdmin } from "./user.admin.controller.js";
import { registerValidator } from "../../middlewares/validators.js";

const api = Router()

//Ruta Públicas

api.post(
    '/Register',
    [registerValidator],
    registerAdmin
)


export default api