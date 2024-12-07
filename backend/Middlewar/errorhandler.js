const errorHandler = (err , req , res , next) => {
    const statusCode = res.status ? res.statusCode : 500
    res.status(statusCode)
    // console.log(res.statusCode) 
    // console.log(res.status)
    res.json({
        message : err.message,    
        stack : process.env.NODE_ENV === "production" ? null : err.stack
    })
}


module.exports = {errorHandler}