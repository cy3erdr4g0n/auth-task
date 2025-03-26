const secret = process.env.SECRET
const jwt = require("jsonwebtoken");
const userModel = require("../models/auth.models")


exports.verify_X_API_KEY = async (req, res, next) =>{
    try {
        const x_api_key = req.headers['x-api-key'];
        if(!x_api_key || x_api_key !== X_API_KEY){
            const error = new AppError("Forbibben", 403)
            return res.status(error.statusCode).json(error.toJSON());
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized to access this Route' })
    }
}


exports.isSignedIn = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, secret);
      if (!decoded) {
        return res.status(401).json({ message: "Invalid Token" });
      }

      const user = await  userModel.findOne({emil : decoded.id});

      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized to access this Route" });
      }

      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: "No token provided" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Something went wrong", error });
  }
};


