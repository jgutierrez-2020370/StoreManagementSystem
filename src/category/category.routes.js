
import { Router } from "express";
import { deleteCategory, getCategories, saveCategory, updateCategory } from "./category.controller.js";
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";
import { categoryValidator, updateCategoryValidate } from "../../middlewares/validators.js";

const api = Router()

//Ruta Pública

api.get(
    '/',
    getCategories
)

//Rutas Privadas

api.post(
    '/',
    [
        validateJwt,
        isAdmin,
        categoryValidator
    ],
    saveCategory
)


api.put(
    '/:id',
    [
        validateJwt,
        isAdmin,
        updateCategoryValidate
    ],
    updateCategory
)

api.delete(
    '/:id',
    [
        validateJwt,
        isAdmin,
    ],
    deleteCategory
)

export default api