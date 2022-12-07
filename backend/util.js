
import  jwt   from "jsonwebtoken"
import config from "./config"

//JWTs are mainly used for authentication.
export const generateToken = (user) => {
    return jwt.sign({

 _id: user._id,
 name: user.name,
 email: user.email,
 isAdmin: user.isAdmin,
    },
    //master password 
    config.JWT_SECRET
    )
}
// isAuth nam sluzi da samo owner of acc can update information
export const isAuth = (req, res, next) => {
const bearerToken = req.headers.authorization;
if (!bearerToken) {
 res.status(401).send({ message: 'Token is not supplied' })
 } else {
 // cut from the 7 token till the end
   // data is decoded token (email,name and etc)
  // next means that everything is okay and that can go to the next 
 const token = bearerToken.slice(7, bearerToken.length);
   jwt.verify(token, config.JWT_SECRET, (err, data) => {
 if (err) {
  res.status(401).send({ message: 'Invalid Token' });
} else {
 req.user = data;
 next();
}
 })
  }
  }
  export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next() // go to the next handler
    } else {
      res.status(401).send({ message: 'Token is not valid for admin user' });
    }
  }