let express = require("express")

let Router = express.Router();
let authController = require("./../controllers/auth.Controller")

Router.post("/login",authController.login);
Router.post("/signup",authController.signup);

module.exports = Router;
