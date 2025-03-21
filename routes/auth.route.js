const express = require("express")

const router = express.Router()

const { sigup } = require("./../service/index")
const { loginVerify } = require("./../service/login")


router.post("/auth/registration", sigup); 
router.post("/auth/login", loginVerify);

module.exports = router