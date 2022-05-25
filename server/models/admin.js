import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
    {
         Month : {
             type : Number,
             default  : 0
         },
         isValid : {
            type : Boolean,
            default  : false
        }
    }
)

const adminMessage = mongoose.model('adminMessage' , adminSchema)

export default adminMessage