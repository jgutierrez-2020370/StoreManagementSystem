import { Router } from "express";
import { loginValidator } from "../../middlewares/validators.js";
import { login } from "./auth.controller.js";


const api = Router()

api.post(
    '/Login',
    [loginValidator],
    login
)

export default api