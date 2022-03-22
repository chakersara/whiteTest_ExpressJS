const router = require('express').Router();
const {
    User,
    validation_user,
    validation_login
} = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/*Sarra Chaker GLSI-B && Chaima Arfaoui GLSI-A*/

function validation(validator, req, res) {
    let result = validator.validate(req.body);
    if (result.error)
        return res.status(400).send(result.error.details[0].message)
}

router.post("/register", async (req, res) => {
    validation(validation_user, req, res)
    let user = new User(req.body)
    user.password = await bcrypt.hash(user.password,
        await bcrypt.genSalt(10))
    await user.save()
    res.send('Utilisateur ajouté')
})

router.post("/connect", async (req, res) => {
    validation(validation_login, req, res)
    let user = await User.findOne({
        username: req.body.username
    })
    if (!user)
        return res.status(400).send("Nom d'utilisateur non existant!")
    let chek_pswd = await bcrypt.compare(req.body.password, user.password)
    if (!chek_pswd)
        return res.status(400).send("Mot de passe incorrecte!")
    let token = jwt.sign({
        username: user.username,
        role: user.role,
        id: user._id
    }, 'verysecretkey', {
        expiresIn: '1h'
    })
    process.env.TOKEN_SECRET=token;
    res.send('Utilisateur connecté');
})
module.exports = router