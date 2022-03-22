const cons_user = require('express').Router()
const mongoose = require('mongoose');
const auth = require("../middlewars/authentification")
const autoris = require('../middlewars/autorisation');
const {
    User
} = require("../models/user")

//Sarra Chaker GLSI-B && Chaima Arfaoui GLSI-A

//get all admins 
cons_user.get("/admins", [auth, autoris], async (req, res) => {
    try {
        res.send(await User.find({
            role: "admin"
        }))
    } catch (err) {
        res.send(400).send(err.message)
    }
})

//get all normal users
cons_user.get("/users",async(req,res)=>{
    try {
        res.send(await User.find({
            role: "user"
        }))
    } catch (err) {
        res.send(400).send(err.message)
    }
})

module.exports=cons_user