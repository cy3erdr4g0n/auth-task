const userModel = require("../models/auth.models");
const { encrypt } = require("../utils/crypto")
const validate = require("../middlerwares/registe")

const sigup = async (req, res, next)=>{
    
    try{
        let { email, password, firstName, lastName, username } = req.body;
        let withMessage = validate(req.body)
        if (withMessage.isValid == true){
            const user = await userModel.findOne({
                email
            })

            if (!user){
                const hashedPassword = await encrypt(password)
                    const newUser = await new userModel({
                        email,
                        username,
                        password: hashedPassword,
                        firstName,
                        lastName,
                    });
                
                  await  newUser.save()
                    res.status(200).json({
                        message: "success"
                    });
            }else{
                res.status(402).json({            
                    message : `Invalid Credential`
                });
            }
        }else{
            res.status(401).json({            
                    message : `Invalid Credential`
                }); 
        }
    }catch(error){
        res.status(400).json({            
            message : `Bad request`
        }); 
    };
} 

module.exports = {
    sigup
}