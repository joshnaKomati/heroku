const usermodel=require("../model/userSchema")
const userController=require("../controller/userController")
const Joi=require("joi")
const jwt=require("jsonwebtoken")
module.exports={
    uservalidate:async(req,res,next)=>{
        const Schema=Joi.object({
            name:Joi.string().required(),
            email:Joi.string().required(),
            password:Joi.string().required(),
            age:Joi.number().required(),
            id:Joi.optional()
        })
        const result=Schema.validate(req.body)
        if(result.error){
            res.json({message:result.error.details[0].message})
        }else{
            next()
        }
    },
    verifytoken:async(req,res,next)=>{
        const bearerHeader=req.headers['authorization']
        if(typeof bearerHeader !=='undefined'){
            try {
                const data=jwt.verify(bearerHeader ,'secretkey')
                const result=await usermodel.findOne({email:data.email})
                if(result){
                    next()
                }else{
                    res.json({message:"email is not valid"})
                }
                
            } catch (error) {
                res.json({message:error.message})
            }
        }else{
            res.json({message:"mentioned valid token"})
        }
    }
}