export const errorhandler=(statusCode,message)=>{
    const error=new error(message);
    error.statusCode=statusCode
    error.message=message
    return error
}