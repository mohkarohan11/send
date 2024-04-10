const model = require("../models/usergymmodel");
const encrypt = require("bcrypt");
const jwt=require("jsonwebtoken")

const getusers = (req, res) => {
  model
    .find()
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send({ isSuccess: true, msg: "database is empty" });
      }
    })
    .catch((err) => {
      res.send({ msg: "error", err });
    });
};


const getcurrentusers = (req, res) => {
  model
    .find({ isDeleted: false })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send({ isSuccess: true, msg: "database is empty" });
      }
    })
    .catch((err) => {
      res.send({ msg: "error", err });
    });
};

const adduser = (req, res) => {
  let {
    Name,
    Age,
    Email,
    PhoneNo,
    Address,
    Gender,
    Weight,
    Height,
    MedicalIssue,
    AssignExercise,
    Target,
    Password,
    State,
    City,
    isDeleted,
  } = req.body;
  model
    .findOne({ Email })
    .then((data) => {
      if (data) {
        res.send("user already exists");
      } else {
        let encryptedpass = encrypt.hashSync(Password, 10);
        const add = new model({
          Name,
          Age,
          Email,
          PhoneNo,
          Address,
          Gender,
          Weight,
          Height,
          MedicalIssue,
          AssignExercise,
          Target,
          Password: encryptedpass,
          State,
          City,
          isDeleted: false,
        });
        add
          .save()
          .then((data) => {
            res.send({ isSuccess: true, msg: "Data Added Successfully", data });
          })
          .catch((err) => {
            res.send({
              msg: "error occurred while saving data",
              err,
            });
          });
      }
    })
    .catch((err) => {
      res.send({ msg: "error", err });
    });
};

const userlogin = (req, res) => {
  model
    .findOne({ Email: req.body.Email })
    .then((data) => {
      if (data) {
        const verify = encrypt.compareSync(req.body.Password, data.Password);
        if (verify && data.Email == req.body.Email) {
          const token = jwt.sign(
            { Email: req.body.Email, Password: req.body.Password },
            "userlogin"
          );
          res.send({ isSuccess: true, msg: "login successful", token });
        } else {
          res.send({
            isSuccess: false,
            msg: "username or password not correct",
          });
        }
      } else {
        res.send({
          isSuccess: false,
          msg: "user not found",
        });
      }
    })
    .catch((err) => {
      res.send({ isSuccess: false, msg: "internal server error", err });
    });
};

const updateuser = (req, res) => {
  console.log("in update", req.query, req.body);
  try {
    model
      .updateOne({ _id: req.query.id }, req.body)
      .then((data) => {
        if (data) {
          res.send({ isSuccess: true, msg: "update success" });
        } else {
          res.send("data not found");
        }
      })
      .catch((err) => {
        res.send({ msg: "error", err });
      });
  } catch (error) {
    res.send({ msg: "error occurred", error });
  }
};

const deleteUser = (req, res) => {
  model
    .deleteOne({ _id: req.query.id })
    .then(() => {
      res.send({ isSuccess: true, msg: "deleted successfully" });
    })
    .catch((err) => {
      res.send({ msg: "error occurred", err });
    });
};

const softdeleteUser = (req, res) => {
  model
    .findOne({ _id: req.query.id })
    .then((data) => {
      if (data) {
        data.isDeleted = true;
        model
          .updateOne({ _id: req.query.id }, data)
          .then(() => {
            res.send({ isSuccess: true, msg: "soft delete success" });
          })
          .catch((err) => res.send({ msg: "error occurred", err }));
      } else {
        res.send("data not found");
      }
    })
    .catch((err) => {
      res.send({ msg: "error occurred", err });
    });
};


const assignexercisetouser = (req, res) => {
  console.log("in update", req.query, req.body);
  try {
    model
      .updateOne({ _id: req.query.id }, req.body)
      .then((data) => {
        if (data) {
          res.send({ isSuccess: true, msg: "update success" });
        } else {
          res.send("data not found");
        }
      })
      .catch((err) => {
        res.send({ msg: "error", err });
      });
  } catch (error) {
    res.send({ msg: "error occurred", error });
  }
};


// const assignexercisetouser = (req, res) => {
//   let {Exercise,_id} = req.body;
//   model
//     .findOne({_id})
//     .then((data) => {
//       if (data) {
//         res.send("exercise already exists");
//       } 
//       else {
//         model
//       .updateOne({ _id: req.query.id }, req.body.Exercise)
//       .then((data) => {
//         if (data) {
//           res.send({ isSuccess: true, msg: "update success" });
//         } else {
//           res.send("data not found");
//         }
//       })
//       .catch((err) => {
//         res.send({ msg: "error", err });
//       });
//       }
//     })    
//    .catch ((error) => {  
//     res.send({ msg: "error occurred", error });
//   })
// };
        

module.exports = {
  getusers,
  adduser,
  updateuser,
  deleteUser,
  softdeleteUser,
  getcurrentusers,
  userlogin,
  assignexercisetouser
};
