const express = require("express");
const routes = express.Router();
const { Login, registerGym } = require("../Controller/Gymcontroller");
const db = require("../dbconfig");


routes.post("/Register", registerGym );
routes.post("/Login", Login);



module.exports = routes;