
'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors' 
import { limiter } from '../middlewares/rate.limit.js'
import clientRoutes from '../src/user/user.client.routes.js'
import adminRoutes from '../src/user/user.admin.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import productRoutes from '../src/product/product.routes.js'
import cartRoutes from '../src/shoppingCart/shoppingCart.routes.js'
import factureRoutes from '../src/facture/facture.routes.js'

import authRoutes from '../src/auth/auth.routes.js'

const configs = (app)=> {
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cors())
    app.use(limiter)
    app.use(helmet())
    app.use(morgan('dev'))

}

const routes = (app)=> {
    app.use(authRoutes), 
    app.use('/v1/Client',clientRoutes),
    app.use('/v1/Admin',adminRoutes),
    app.use('/v1/Category', categoryRoutes),
    app.use('/v1/Product', productRoutes),
    app.use('/v1/Cart', cartRoutes),
    app.use('/v1/Facture', factureRoutes)
}

export const initServer = async()=>{
    const app = express()
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`server running in port ${process.env.PORT}`)
    } catch (err) {
        console.error('Server init failed', err)
    }
}