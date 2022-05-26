import mongoose from "mongoose"
import userMessage from "../models/userMessage.js"
import adminMessage from "../models/admin.js"

export const getusers = async (req , res)=>{
    const detail = req.params
    const { month : month} = detail
    try {
        const userMessages = await userMessage.find({Month:month})
        res.status(200).json(userMessages)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}



export const createuser = async (req , res)=> {
    const user = req.body
    const {addresses , balance , time } = user.body
    
    console.log("month" , addresses)
    const month = getMonth(time)
    console.log("month" , month)
    const userDetails =  {addresses,balance , Month : month}
    console.log("Details" , userDetails)
     const is = await adminMessage.find({Month:month})
    //const is = false
    if(is == null || is == undefined || is.length == 0){
        console.log( "if" )
        const details = { Month : month , isValid : true } 
        const data = new adminMessage(details)
    try {
        await data.save()

    } catch (error) {
        res.status(409).json({message:error.message})
    }

    const newuser = new userMessage(userDetails)
    try {
        await newuser.save()
        res.status(201).json(newuser)
    } catch (error) {
        res.status(409).json({message:error.message})
    }


    }else{
        try {
            const userMessages = await userMessage.find({Month:month})
            res.status(200).json(userMessages)
        } catch (error) {
            res.status(404).json({message:error.message})
        }
    }
  
}

export const updateuser = async (req , res)=>{
    const user = req.body
    const { id : _id } = req.params
   
    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no user found")
        const updateduser = await userMessage.findByIdAndUpdate(_id,user,{new : true})
        res.status(201).json(updateduser)
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}


export const deleteuser = async (req , res)=>{
    const user = req.body
    const { id : _id } = req.params
   
    try {
       // if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no user found")
        const deleteuser = await userMessage.remove()
        res.status(201).json(deleteuser)
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}

const getMonth = (time) =>{
    const months3 = 86400//7776000
        const months6 = 86400 + 3600   //15552000
        const months9 = 86400 + 3600 *2 // 23328000
        const months12 = 86400 + 3600 *3 // 31536000
    const currentTime = Date.now()/1000
    if(currentTime > time + months3 && currentTime < time + months6){
        return 3;
    }else if(currentTime > time + months6 && currentTime < time + months9){
        return 6;
    }else if(currentTime > time + months9 && currentTime < time + months12){
        return 9;
    }else if(currentTime > time + months12){
        return 12;
    }else{
        return 0;
    }
   
}




