
import { Router } from "express";
import { deleteCategory, getCategories, saveCategory, updateCategory } from "./category.controller.js";
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";
import { categoryValidator, deleteValidator, updateCategoryValidate } from "../../middlewares/validators.js";

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

api.delete(
    '/',
    [
        validateJwt,
        isAdmin,
        deleteValidator
    ],
    deleteCategory
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



export default api