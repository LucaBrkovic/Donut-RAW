// rout to save adminUser and regular Users with userModel

import express from "express"
import User from "../models/userModels"
import expressAsyncHandler from "express-async-handler"
import { generateToken, isAuth } from "../util"

const userRouter = express.Router()

// creation of the admin user 
// adressa (json) na kojem cemo pokupiti admin datu localhost.../api/users/createadmin
userRouter.get("/createadmin",expressAsyncHandler( async(req, res) => {
    try{
        const user = new User({
            name:"admin",
            email: "admin@admin.com",
            password: "admin",
            isAdmin: true,
        })
        const createdUser = await user.save()
        res.send(createdUser) // poslali smo u frontend
    } catch(err) {
        res.status(500).send({message: err.message})
    }
}))

// sending request to database to get user with email and pw 
// to read body senction we need to instal body parser it helps us to read content in the body senction of the reqeust
// ovi expressAsync je neki middleware  
userRouter.post("/signin", expressAsyncHandler( async (req,res) => {
const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password
})
if(!signinUser) {
    res.status(401).send({
        message: "Invalid Email or Password"
    })
} else {
    res.send({
        _id: signinUser._id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: generateToken(signinUser)
    })
}
})
)

// slicno je kao signup ali smo obrisali signinUser zato sto trebamo dodati novog usera u database
//req.body give us acces to the date what frontend send to the backend 
// here we have newUser in /signin we have already created user
// promijenili smo i if(!siginUser) to if(!created)
userRouter.post("/register", expressAsyncHandler(async (req, res) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      const createdUser = await user.save();
      if (!createdUser) {
        res.status(401).send({
          message: "Invalid User Data",
        });
      } else {
        res.send({
          _id: createdUser._id,
          name: createdUser.name,
          email: createdUser.email,
          isAdmin: createdUser.isAdmin,
          token: generateToken(createdUser),
        });
      }
    })
  )


  
// id is id of the user we need to update
// req.params.id je value that user enters in id 
// findById is mongoose method
    userRouter.put(
      '/:id', isAuth, expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
    
        if (!user) {
          res.status(404).send({
            message: 'User Not Found',
          })
        // req if it is updates a user.name ako ne postoji update da koristi trenutnu verziju npr mozemo samo pw updatati
        } else {
          user.name = req.body.name || user.name;
          user.email = req.body.email || user.email;
          user.password = req.body.password || user.password;
          const updatedUser = await user.save();
          res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser),
          });
        }
      })
    )
export default userRouter