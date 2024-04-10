// const Login = (req, res) => {
//     res.send("vgfctggghv")
//   }

//   module.exports={Login}

const model = require("../models/Gymmodels");
const encrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerGym = (req, res) => {
  let { username, Email, password, PhoneNo, GST, Address } = req.body;

  // Check if the USER ALREADY EXISTS
  model
    .findOne({ username, Email })

    .then((data) => {
      const bpass = encrypt.hashSync(req.body.password, 10);

      if (data) {
        res.send("user already exists");
      } else {
        const data = new model({
          username,
          Email,
          password: bpass,
          PhoneNo,
          GST,
          Address,
        });

        data
          .save()
          .then(() => {
            res.send("Gym registered successfully");
          })
          .catch((err) => {
            res.send({ msg: "Cannot register", err });
          });
      }
    })

    .catch((err) => {
      res.send({ msg: "Database error", err });
    });
};

const Login = (req, res) => {
  console.log("in Login");
  model
    .findOne({ username: req.body.username })
    .then((data) => {
      if (data) {
        const verify = encrypt.compareSync(req.body.password, data.password);
        if (verify && data.username == req.body.username) {
          const token = jwt.sign(
            { username: req.body.username, password: req.body.password },
            "rohan"
          );
          res.send({ isSuccess: true, msg: "login succesfull", token });
        } else {
          res.send({
            isSuccess: false,
            msg: "username or password not correct",
          });
        }
      } else {
        //  const bpass = encrypt.hashSync(req.body.password, 10)

        const database = new model({
          username: req.body.username,
          password: bpass,
        });
        database
          .save()
          .then(() => {
            res.send("data added");
          })

          .catch((err) => {
            res.send("error adding the data");
          });
      }
    })

    .catch((err) => {
      res.send("error");
    });
};

module.exports = { registerGym, Login };
