const express = require("express");
const routes = express.Router();
const jwt=require("jsonwebtoken")
const {getexercises,addexercises,updateexercise,deleteexercise, softdeleteexercise, getcurrentexercises } = require("../Controller/exercisemastercontroller");
// const ExerAuth=(req,res,next) =>{
//     let token = req.headers.authorization.split("")[1]
//     console.log(token)
//     try {

//         if (jwt.verify(token,"rohan")){
//             next()
//         }
//         else{
//             res.send("token not found")
//         }
//     } catch (error) {
//         res.send({
//             msg:"error occured",
//             error
//         })
        
//     }
// }

routes.get("/getallexercise",getexercises)
routes.get("/getcurrentexercises",getcurrentexercises)
routes.post("/addexercise",addexercises)
routes.post("/updateexercise",updateexercise)
routes.delete("/deleteexercise",deleteexercise)
routes.delete("/softdeleteexercise",softdeleteexercise)
module.exports = routes;