const express = require("express");
const routes = express.Router();
const {
  gettrainers,
  addtrainer,
  updateTrainer,
  deleteTrainer,
  softdeletetrainer,
  getcurrenttrainers,
  trainerLogin,
} = require("../Controller/trainergymcontroller");
// const trainerAuth=(req,res,next) =>{
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
//             msg:"error occurred",
//             error
//         })

//     }
// }
routes.get("/getalltrainers", gettrainers);
routes.get("/getcurrenttrainers", getcurrenttrainers);
routes.post("/addtrainer", addtrainer);
routes.post("/updatetrainer", updateTrainer);
routes.delete("/deletetrainer", deleteTrainer);
routes.delete("/softdeletetrainer", softdeletetrainer);
routes.post("/logintrainer", trainerLogin);
module.exports = routes;
