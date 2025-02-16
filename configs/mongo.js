// Conexion a la DB

import mongoose from "mongoose"
import { defaultCategory } from "../src/category/category.controller.js"

export const connect = async()=> {
    try {
        mongoose.connection.on('error', ()=>{
            console.log('Mongo DB | cold not be conected to mongooseDB')
        })
        mongoose.connection.on('connecting', ()=>{
            console.log('Mongo DB | try connecting')
        })
        mongoose.connection.on('connected', ()=>{
            console.log('Mongo DB | connected to mongoose')
        })
        mongoose.connection.on('open', ()=>{
            console.log('Mongo DB | connected to database')
        })
        mongoose.connection.on('reconnected', ()=>{
            console.log('Mongo DB | reconnected to mongoDB')
        })
        mongoose.connection.on('disconnected', ()=>{
            console.log('Mongo DB | disconnected')
        })

        await mongoose.connect(
            `${process.env.DB_SERVICE}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
            {
                maxPoolSize: 50,
                serverSelectionTimeoutMS: 5000
            }
        )

        defaultCategory()
        
    } catch (err) {
        console.log('Database connection failed' , err)
    }
}