const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../pool.js");

router.post("/", (req, res) => {
  const enteredPassword = req.body.Password;
  pool.query(
    "SELECT * from vaccinator where e_id = ?",
    [req.body.Email],
    (err, result) => {
      if (err || Object.keys(result).length === 0) {
        res.send({ message: "notok" });
      } else {
        const hashedPassword = result[0].e_password;
        bcrypt.compare(
          enteredPassword,
          hashedPassword,
          function (err, isMatch) {
            if (err || !isMatch) {
              res.send({ message: "notok" });
              // res.status(401).send("authentication failed");
              console.log("login failed");
            } else {
              console.log("login succeed");
              res.send({ message: "ok" });
              // res.status(200).send('Login Successful');
            }
          }
        );
      }
    }
  );
});

module.exports = router;
