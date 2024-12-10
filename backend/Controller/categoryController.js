const Category = require("../Model/categoryModel")
const asynchandler = require("express-async-handler");


const categoryCreate = asynchandler(async (req, res) => {
    const { name } = req.body;
    // const image = req.file?.path;
    
    // ye code deploy ment ka hai 
    const image = `${req.protocol}://${req.get("host")}/uploads/${req.file?.filename}`;
    if (!image || !name) {
      throw new Error("Please fill all details");
    }
    // customId 
    const maxIdUser = await Category.findOne().sort({ customId: -1 });  
    const newCustomId = maxIdUser && maxIdUser.customId ? maxIdUser.customId + 1 : 1; 

    const banner = await Category.create({
        name,
        images: image,
        customId: newCustomId,  
    });
  
    if (banner) {
      res.status(201).json({
        _id: banner._id,
        customId: banner.customId,
        name: banner.name,
        images: banner.images,
      });
    } else {    
      res.status(500).json({ message: "Failed to create banner" });
    }
  });


  const categoryAll = async (req, res) => {
    const categoryAll = await Category.find()
    if (categoryAll === null) {
        res.status(404)
        throw new Error("categoryAll Not Found")
    }
    res.json(categoryAll)
  }


  
const categoryDelete = async (req, res) => {
  if (categoryDelete) {
    const categoryDelete = await Category.findByIdAndDelete(req.params.id, req.body);
    res.status(200).json("Delete Category")
  } else {
    res.status(400).json({ message: "Not Delete Category" })
  }
}



const categoryUpdate = async (req, res) => {
  try {
    const { name } = req.body; 
    const image = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` 
      : undefined; 

    const updatedFields = {
      ...(name && { name }),
      ...(image && { images: image }),
    };

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id, 
      updatedFields, 
      { new: true } 
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category Not Found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: "Failed to Update Category", error: error.message });
  }
};


module.exports = {categoryCreate,categoryAll,categoryDelete,categoryUpdate}