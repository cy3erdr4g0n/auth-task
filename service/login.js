const userModel = require("../models/auth.models")
const jwt = require("jsonwebtoken")
const validate = require("../middlerwares/login")
const { compare } = require("../utils/crypto")
const secret = process.env.SECRET

const loginVerify = async (req, res)=>{
    try {
        let { email, password } = req.body;
        let withMessage = validate(req.body)
        if (withMessage.isValid == true){
            let user = await userModel.findOne({
                email 
            });

            if (!user){
                res.status(404).json({
                    message : "invalid email or password"
                });
            }
            let hashedPassword = user.password
            const validate = await compare(password, hashedPassword);
            if(!validate){
                res.status(402).json("Invalid details");
            }
            let userDetails = { "id" :  user.email };
            console.log(userDetails)
            const token = jwt.sign(userDetails,secret,{expiresIn:1000000});
            res.status(201).json({
                message:"sign in successful",
                token:token
            });
        }else{
            res.status(401).json({            
                message : `Invalid Credential`
            }); 
        }
    }catch (error) {
        res.status(401).json({
            "message" : "INTERNAL SERVER ERROR"
        });
    };

};

module.exports = {

    loginVerify

};