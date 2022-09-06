const express = require("express")
const router = express.Router()
const verifyToken = require("../middlewares/verifyToken")
const User = require("../models/User")
const bcrypt = require('bcryptjs')
const validator = require("validator")
const createToken = require("../scripts/createToken")

router.get("/me", verifyToken, (req, res) => res.send(req.user))

router.post("/register", async (req, res) => {
    try {
        if(!validator.isEmail(req.body.email)) throw new Error("Invalid Email Yo!") // Validate Inputs
        const count = await User.count({ email : req.body.email })// Check If User Already Exists
        if (count) throw new Error("Email Is Not Unique")
        const user = new User (req.body)// Create instance of User
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(+process.env.SALT_ROUNDS))// Hash the password
        console.log("saved user 1")
        await user.save()// Save In DB
        console.log("saved user")
        res.send({ token : createToken({ _id : user._id })}) // Send back the jwt
    } catch ({message}) { res.status(400).send({ message }) }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email : req.body.email })
        if (!user) throw new Error ("No User Found")
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
        if (!passwordIsValid) throw new Error ("Invalid Password!")
        res.send({ token : createToken({ _id : user._id })}) // Send back the jwt
    } catch ({message}) { res.status(400).send({ message }) }
})


module.exports = router