const express =require("express")
const { userRegister, userLogin, userSingle, userAll } = require("../Controller/userController")
const {protect} =require("../Middlewar/authMiddlewares")  

const router =express.Router()

router.post("/register",userRegister)
router.post("/login",userLogin)
// ye code chat ka hai 
router.get("/userAll",protect,userAll);
router.get("/:id",protect,userSingle)

module.exports = router