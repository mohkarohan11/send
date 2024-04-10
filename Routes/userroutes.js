const express = require("express");
const routes = express.Router();
const {getusers,adduser,updateuser,deleteUser, softdeleteUser, getcurrentusers,userlogin, assignexercisetouser } = require("../Controller/usergymcontroller");

routes.get("/getalluser",getusers)
routes.get("/getcurrentusers",getcurrentusers)
routes.post("/adduser",adduser)
routes.post("/updateuser",updateuser)
routes.delete("/deleteuser",deleteUser)
routes.delete("/softdeleteuser",softdeleteUser)
routes.put("/assignexercise",assignexercisetouser)
routes.post("/userlogin",userlogin)

module.exports = routes;