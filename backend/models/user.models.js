import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from  "jsonwebtoken"
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        
    },
    role:{
        type:String,
        enum:["candidate","recruiter"],
        default:null
       
        
    },
    refreshToken:{
        type:String
    }
   
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next;
    }
    this.password= await bcrypt.hash(this.password,5);
    next;
       
    
})
userSchema.methods.generateAccessToken= function(){
    try{
        const AccessToken=jwt.sign({
            id:this._id,
            email:this.email
        },process.env.JWT_ACCESS_TOKEN_SECRET,{
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        })
        return AccessToken;
    }catch(error){
        console.log("error in generating access token");
    }
}

userSchema.methods.generateRefreshToken=function(){
    try{
        const refreshToken=jwt.sign({
            id:this._id
        },process.env.JWT_REFRESH_TOKEN_SECRET,{
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        })
        return refreshToken;
    }catch(error){
        console.log("error in generating refreshtoken",error);
    }
}
userSchema.methods.comparePassword=async function(password){
    return bcrypt.compare(password,this.password);

}
const User=mongoose.model("User",userSchema);
export default User;