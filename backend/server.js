const { config } = require("dotenv")
const express =require("express")
require("dotenv").config()
const {colors}=require("colors")
const { DBconnect } = require("./config/db_config")

const aap = express()
const PORT = process.env.PORT || 5000

DBconnect()

aap.get("/",(req,res)=>{
    res.send("welcome to api ")
})

aap.use(express.json())
aap.use(express.urlencoded({express:true}))

// Router Url
aap.use("/api/user",require("./Router/userRouter"))
aap.use("/api/banner",require("./Router/bannersRouter"))

aap.listen(PORT,()=>{
    console.log(`Server is running PORT ${PORT}`);
})