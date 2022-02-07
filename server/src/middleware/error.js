import ErrorResponse from "../utils/errorResponse.js";


const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    if(err.code===11000){
        const message=err.keyValue.email+" is already taken";
        error=new ErrorResponse(message,400);

}

if(err.name==="ValidationError"){
    const message=Object.values(err.errors).map(error=>error.message);
    error=new ErrorResponse(message,400);
}
res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error"
    
})
}

export default errorHandler;