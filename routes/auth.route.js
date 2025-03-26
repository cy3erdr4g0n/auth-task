const express = require("express")

const router = express.Router()

const { sigup } = require("./../service/index")
const { loginVerify } = require("./../service/login");
const { isSignedIn } = require("../middlerwares/auth");
const { dashboard } = require("../service/dashboard");


router.post("/auth/registration", sigup); 
router.post("/auth/login", loginVerify);
router.get("/dashboard", isSignedIn, dashboard)

module.exports = router