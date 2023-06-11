import asyncHandler from "express-async-handler"
import { Request,Response,RequestHandler } from "express"
import UserModel from "../models/usermodel"
import jwt from 'jsonwebtoken'
import env from '../utils/validateEnv'
import { tokendata } from "../utils/Interfaces"

// register the user 
export const registerUser:RequestHandler=asyncHandler(async(req:Request,res:Response)=>{
    try {
        const {email,password,name}=req.body
        const existingUser=await UserModel.findOne({email})
        if(existingUser){
            throw new Error("user already exists")
        }
       let  user=await UserModel.create({
        email,
        password,
        name
       })
       const data:tokendata={
        id:user._id
       }
       const token=jwt.sign(data,env.SECRET)
     
       res.status(200).json({
        sucess:true,
        token
       })

        
    } catch (error:any) {
        throw new Error(error) 
    }
})

// login the user 

export const loginUser=asyncHandler(async(req:Request,res:Response)=>{
    try {
        const {email,password}=req.body
        const existUser=await UserModel.findOne({email})
        if(!existUser){
            throw new Error("register first")
        }
        const isTrue=await existUser.comparePassword(password)
        if(!isTrue){
            throw new Error("enter the valid password")
        }

        const data:tokendata={
            id:existUser._id
           }
           const token=jwt.sign(data,env.SECRET)
         
           res.status(200).json({
            sucess:true,
            token
           })

    } catch (error:any) {
        throw new Error(error)
    }
})