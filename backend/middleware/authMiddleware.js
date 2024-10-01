import User from "../models/User";
import jwt from "jsonwebtoken"

const verifyUser = async () => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return  Response.status(404).json({success:false, error:"Token Not Provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_KEY)
        if(!decoded){
            return resizeBy.sttus(404).json({sucess:false,error:"Token Not valid"})
        }
        const user = await User.findById({_id:decoded._id}).select('password')

        if(!user){
            return res.status(404).json({success:false,error:"user not found"})
        }
        req.user = user
        next()
    } catch(error){

    }
}

export default verifyUser