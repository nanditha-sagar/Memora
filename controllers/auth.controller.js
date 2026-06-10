const { json } = require("express");
const jwt = require("jsonwebtoken");
let pool = require("./../db.js");

let bcrypt = require("bcrypt");
module.exports.login = async (req, res, next) => {
  try {
    let user = req.body;

    let dbuser = await pool.query(
      "Select username,email,password from users where email = ?",
      [user.email],
    );

    if (dbuser[0].length == 0) {
      throw new Error("User does not exist");
    }
    let existUser = dbuser[0][0];

    let same = await bcrypt.compare(user.password, existUser.password);
    if (!same) {
      throw new Error("Invalid credentials");
    }

    let token = jwt.sign({ email: existUser.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // gen jwt token
    res.json({
      username: existUser.username,
      email: existUser.email,
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.signup = async (req, res, next) => {
  try {
    let user = req.body;
    let db_user = await pool.query("Select 1 from users where email = ?", [
      user.email,
    ]);

    if (db_user[0].length > 0) {
      throw new Error("User already exists");
    }

    let hashpass = await bcrypt.hash(user.password, 10);

    let user_created = await pool.query(
      "Insert into users (username,email,password) values (?,?,?)",
      [user.username, user.email, hashpass],
    );

    res.json({
      status: "success",
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};
