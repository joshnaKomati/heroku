const usermodel=require("../model/userSchema")
const bcrypt=require("bcrypt")
const jwt =require("jsonwebtoken")
module.exports={
    newuser:async(req,res)=>{
        const{name,email,password,age}=req.body
        const passwordGenerate=await bcrypt.hash(password,10)
        const checkEmail=await usermodel.findOne({email})
        if(checkEmail){
            res.json({message:"email is already exist"})
        }else{
            await usermodel.create({name,email,password:passwordGenerate,age})
            res.json({message:"user info is created"})
        }
    },
    userlist:async(req,res)=>{
        const result=await usermodel.find()
        res.json({message:"user list is displayed",result})
    },
    userUpadate:async(req,res)=>{
        const {name,email,password,age,id}=req.body
        const passwordGenerate=await bcrypt.hash(password,10)
        const checkId=await usermodel.findById(id)
        if(checkId){
            await usermodel.findByIdAndUpdate(id,{name,email,password:passwordGenerate,age})
            res.json({message:"user deatils is update",checkId})
        }else{
            res.json({message:"user details does not updated"})
        }
    },
    usergetbyId:async(req,res)=>{
        const {id}=req.params
        const checkId=await usermodel.findById(id)
        if(checkId){
            await usermodel.findByIdAndUpdate(id)
            res.json({message:"user deatils get by id",checkId})
        }else{
            res.json({message:"user detils does not get by id"})
        }
    },
    userlogin:async(req,res)=>{
        const {email,password}=req.body
        const checkEmail=await usermodel.findOne({email})
        if(checkEmail){
            if(await bcrypt.compare(password,checkEmail.password)){
                const token=jwt.sign({email},'secretkey')
                res.json({message:"user is logined",token})
            }else{
                res.json({message:"password is wrong"})
            }
        }else{
            res.json({message:'email is not does not exist'})
        }
       
    }
}