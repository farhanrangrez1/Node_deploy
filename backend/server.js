const { config } = require("dotenv")
const express =require("express")
require("dotenv").config()
const {colors}=require("colors")
const { DBconnect } = require("./config/db_config")
const path = require("path");

const aap = express()
const PORT = process.env.PORT || 5000

DBconnect()

aap.get("/",(req,res)=>{
    res.send("welcome to api ")
})

aap.use(express.json())
aap.use(express.urlencoded({express:true}))

// ye code deploy ment ka hai 
aap.use("/uploads", express.static(path.join(__dirname, "uploads"))); 

// Router Url
aap.use("/api/user",require("./Router/userRouter"))
aap.use("/api/banner",require("./Router/bannersRouter"))
aap.use("/api/category",require("./Router/categoryRouter"))
aap.use("/api/subCtegory",require("./Router/subCategoryRouter"))
aap.use("/api/brand",require("./Router/brandRouter"))

aap.listen(PORT,()=>{
    console.log(`Server is running PORT ${PORT}`);
})