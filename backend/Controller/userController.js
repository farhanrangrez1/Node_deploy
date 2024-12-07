const User =require("../Model/userModel")
const asynchandler =require("express-async-handler")
const bcrypt =require("bcryptjs")
const jwt = require("jsonwebtoken")

// Token
const genrtoken =(id)=>{
return jwt.sign({id},process.env.JWT_SECRT,{
    expiresIn:"30d",
})
}
const userRegister = asynchandler(async (req, res) => {
    const { f_name, l_name, email, phone, password } = req.body;

    if (!f_name || !l_name || !email || !phone || !password) {
        throw new Error("Please fill all details");
    }

    if (phone.length > 10) {
        return res.status(401).json({ message: 'Please enter a 10-digit phone number' });
    }

    const trimmedEmail = email.trim();
    const userExist = await User.findOne({ email: trimmedEmail });
    if (userExist) {
        return res.status(401).json({ message: "User already exists" });
    }

    try {
        // customId 
        const maxIdUser = await User.findOne().sort({ customId: -1 });  
        const newCustomId = maxIdUser && maxIdUser.customId ? maxIdUser.customId + 1 : 1; 

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            customId: newCustomId,  
            f_name,
            l_name,
            email,
            phone,
            password: hashpassword,
        });

        res.status(201).json({
            _id: user._id,
            customId: user.customId,  
            f_name: user.f_name,
            l_name: user.l_name,
            email: user.email,
            phone: user.phone,
            token: genrtoken(user._id),
        });
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).json({ message: error.message });
    }
});


const userLogin =asynchandler(async(req,res)=>{
    const {email, password}=req.body
    if(!email || !password){
        throw new Error("Pliss Fill All Detilse")
    }
    //  user Exist 
    const  user = await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))){
     res.status(200).json({
        _id:user._id,
        customId: user.customId,  
        email:user.email,
        // password:user.password,
        token:genrtoken(user._id),
        })
    }else{
        res.status(401)
        throw new Error("These details are wrong")
    }

    res.send("Login Router")
})

module.exports = {userRegister,userLogin}