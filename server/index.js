import express from "express"
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from "mongoose"
import userRoutes from './routes/user.js'
import adminRoutes from './routes/admin.js'

const app = express()


app.use(express.json({ limit:"30mb" , extended : true }))
app.use(express.urlencoded({ limit:"30mb" , extended : true }))
app.use(cors())


app.use('/users',userRoutes)
app.use('/admin',adminRoutes)


const CONNECTION_URL = `mongodb+srv://aliahmed:qwerty05@cluster0.sees7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const PORT = process.env.PORT || 5000

const connect = await mongoose.connect(CONNECTION_URL , {useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=> app.listen(PORT,()=> console.log(`servers running on ${PORT}`)))
    .catch((error)=> console.log(error))
