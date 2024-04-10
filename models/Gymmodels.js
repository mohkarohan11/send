const mon = require("mongoose")
const gymuser = mon.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    PhoneNo:{
        type:Number,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    GST:{
        type:String,
        required:true
    }

})

module.exports=mon.model("gymlogin",gymuser)