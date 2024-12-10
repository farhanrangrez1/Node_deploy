const SUBcategory = require("../Model/subCategoryModel");
const Category = require("../Model/categoryModel");
const asynchandler = require("express-async-handler");

const subCtegoryCreate = asynchandler(async (req, res) => {
  const { subName,number } = req.body;
  const id = req.params.id; // Category ID

  const image = `${req.protocol}://${req.get("host")}/uploads/${req.file?.filename}`;
  
  if (!image || !subName || !number) {
    throw new Error("Please fill all details");
  }

    // Validate categoryId
    const isValidCategory = await Category.findById(id);
    if (!isValidCategory) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const CreateCategory = await SUBcategory.create({
        subName,
        number,  
        images: image,
        categoryId: id,
    });
    if (CreateCategory) {
        res.status(201).json({
          _id: CreateCategory._id,
          subName: CreateCategory.subName,
          number: CreateCategory.number,
          images: CreateCategory.images,
          categoryId: CreateCategory.categoryId,
        });
      } else {    
        res.status(500).json({ message: "Failed to create banner" });
      }
});



const subcategoryAll = async (req, res) => {
  const subcategoryAll = await SUBcategory.find()
  if (subcategoryAll === null) {
      res.status(404)
      throw new Error("subcategoryAll Not Found")
  }
  res.json(subcategoryAll)
}



const subcategoryDelete = async (req, res) => {
if (subcategoryDelete) {
  const subcategoryDelete = await SUBcategory.findByIdAndDelete(req.params.id, req.body);
  res.status(200).json("Delete subCategory")
} else {
  res.status(400).json({ message: "Not Delete subCategory" })
}
}



const subcategoryUpdate = async (req, res) => {
try {
  const {subName,number} = req.body; 
  const image = req.file
    ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` 
    : undefined; 

  const updatedFields = {
    ...(subName && { subName }),
    ...(number && { number }),
    ...(image && { images: image }),
  };
  const updatedCategory = await SUBcategory.findByIdAndUpdate(
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



module.exports = { subCtegoryCreate,subcategoryAll,subcategoryDelete,subcategoryUpdate };
