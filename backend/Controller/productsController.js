const Products = require("../Model/productsModel")
const asynchandler = require("express-async-handler");


const productsCreate = asynchandler(async (req, res) => {
    const {name, unit_price, purchase_price, description, product_code, tax_percent, tax_Model, discount_type, total_Quantity, minimum_order_quantity, shippin_cost, product_type,category_name,sub_category_name,brand_name} = req.body;

    const active_status = 1; 

    const image = `${req.protocol}://${req.get("host")}/uploads/${req.file?.filename}`;
    if (!image || !name || !unit_price || !purchase_price ||!description ||!product_code || !tax_percent ||!tax_Model || !discount_type || !total_Quantity || !minimum_order_quantity || !shippin_cost || !product_type || !category_name || !sub_category_name || !brand_name) {
        throw new Error("Please fill all details");
    }

    const maxIdUser = await Products.findOne().sort({ customId: -1 });  
    const newCustomId = maxIdUser && maxIdUser.customId ? maxIdUser.customId + 1 : 1;

    const product = await Products.create({
        name,
        unit_price,
        purchase_price,
        description,
        product_code,
        tax_percent,
        tax_Model,
        discount_type,
        total_Quantity,
        minimum_order_quantity,
        shippin_cost,
        product_type,
        active_status, 
        images: image,
        customId: newCustomId,  
        category_name,
        sub_category_name,
        brand_name
    });

    if (product) {
        res.status(201).json({
            _id: product._id,
            customId: product.customId,
            name: product.name,
            images: product.images,
            unit_price: product.unit_price,
            purchase_price: product.purchase_price,
            description: product.description,
            product_code: product.product_code,
            tax_percent: product.tax_percent,
            tax_Model: product.tax_Model,
            discount_type: product.discount_type,
            total_Quantity: product.total_Quantity,
            minimum_order_quantity: product.minimum_order_quantity,
            shippin_cost: product.shippin_cost,
            product_type: product.product_type,
            active_status: product.active_status,
            category_name:product.category_name,
            sub_category_name:product.sub_category_name,
            brand_name:product.brand_name
        });
    } else {
        res.status(500).json({ message: "Failed to create product" });
    }
});

const productsAll = async (req, res) => {
    const productAll = await Products.find();
    if (productAll.length === 0) {
        res.status(404).json({ message: "No Products Found" });
        return;
    }
    res.status(200).json(productAll);
};

const productsDelete = async (req, res) => {
    try {
        const product = await Products.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        res.status(200).json({ message: "Product Deleted Successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error Deleting Product", error });
    }
};

    const productsUpdate = async (req, res) => {
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
          const product = await Products.findByIdAndUpdate(
            req.params.id, 
            updatedFields, 
            { new: true } 
          );
          if (!product) {
            return res.status(404).json({ message: "product Not Found" });
          }
          res.status(200).json(product);
        } catch (error) {
          res.status(400).json({ message: "Failed to Update product", error: error.message });
        }
        };

const productsSingle = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: "Invalid Product ID", error });
    }
};

module.exports = {productsCreate,productsAll,productsDelete,productsUpdate,productsSingle}