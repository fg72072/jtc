import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
         addresses : {
            type : Array,
            default  : []
        },
         balance : {
             type : Array,
             default  : []
         },
         Month : {
            type : Number,
            default  : 0
        }
    }
)

const userMessage = mongoose.model('userMessage' , userSchema)

export default userMessage