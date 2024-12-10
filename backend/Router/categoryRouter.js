const express =require("express")
const { categoryCreate, categoryAll, categoryUpdate, categoryDelete } = require("../Controller/categoryController")
const {protect} =require("../Middlewar/authMiddlewares")  
const upload = require("../Middlewar/Multer"); 

const router = express.Router()

router.post("/categoryAdd",upload.single("image"),categoryCreate);
router.get("/categoryAll",categoryAll);
router.put("/:id", upload.single("image"), categoryUpdate);
router.delete("/:id",protect,categoryDelete)


module.exports = router