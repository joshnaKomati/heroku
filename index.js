const express=require("express")
const app=express()
let PORT= process.env.PORT || 4000
// app.set('port',PORT)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require("./configure/db")
const mainRouter=require("./Router/index")
// app.set('ejs','view engine')
app.use("/api",mainRouter)
app.get("/",(req,res)=>{
    res.send("hello world")
})
app.listen(PORT,()=>{
    console.log("server is working");
})