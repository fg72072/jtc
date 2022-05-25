import mongoose from "mongoose"
import adminMessage from "../models/admin.js"

export const getMonths = async (req , res)=>{
    try {
        const adminMessages = await adminMessage.find()
        res.status(200).json(adminMessages)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const createMonth = async (req , res)=> {
    const user = req.body
    // if(req.body.time < )
    const newuser = new adminMessage(user)
    try {
        await newuser.save()
        res.status(201).json(newuser)
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}

export const deleteMonth = async (req , res)=>{
    const user = req.body
    const { id : _id } = req.params
   
    try {
       // if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no user found")
        const deleteuser = await adminMessage.remove()
        res.status(201).json(deleteuser)
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}