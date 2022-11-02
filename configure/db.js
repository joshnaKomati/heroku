const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/heroku",()=>{
    console.log("db is connected");
})