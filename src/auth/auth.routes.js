import { Router } from "express";
import { loginValidator, registerValidator } from "../../middlewares/validators.js";
import { login, registerUser } from "./auth.controller.js";


const api = Router()

api.post(
    '/Register',
    [registerValidator],
    registerUser
)

api.post(
    '/Login',
    [loginValidator],
    login
)

export default api