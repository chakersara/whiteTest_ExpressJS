const wt_router = require('express').Router();
const mongoose = require('mongoose');
const {
    White_test,
    wt_validation,
    add_question_validation
} = require("../models/white_test")
const {
    Date,
    date_validation
} = require('../models/date');
const auth = require("../middlewars/authentification")
const autoris = require('../middlewars/autorisation');

// Sarra Chaker GLSI-B && Chaima Arfaoui GLSI-A

function validation(validator, req, res) {
    const result = validator.validate(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
    }
}

async function find_wt(id) {
    let wt = await White_test.findById(req.params.id_wt);
    if (!wt)
        return res.status(400).send("White test non trouvé");
    return wt
}

wt_router.route("/")
    //add a wt
    .post([auth, autoris], async (req, res) => {
        try {
            validation(wt_validation, req, res)
            let white_test = new White_test(req.body)
            res.send(await white_test.save())
        } catch (err) {
            res.status(400).send(err.message)
        }
        res.send(await White_test.find())

    })
    //consult all wt
    .get(auth, async (req, res) => {
        try {
            res.send(await White_test.find())
        } catch (error) {
            error.message
        }
    })


wt_router.route("/date")
    //add a date
    .post([auth, autoris], async (req, res) => {
        try {
            validation(date_validation, req, res)
            let date = new Date(req.body)
            res.send(await date.save())
        } catch (err) {
            res.status(400).send(err.message)
        }
    })
    //get all dates
    .get(auth, async (req, res) => {
        try {
            res.send(await Date.find())
        } catch (error) {
            res.status(400).send(error.message)
        }
    })

//add a qst from a wt
wt_router.post("/add_qst/:id", [auth, autoris], async (req, res) => {
    try {
        let wt = find_wt(req.params.id)
        validation(add_question_validation, req, res)
        wt.questions.push(req.body)
        res.send(await wt.save())
    } catch (err) {
        res.status(400).send(err.message)
    }
})

//delete a qst from a wt
wt_router.delete("/delete_qst/:id_wt/:id_qst", [auth, autoris], async (req, res) => {
    try {
        let wt = find_wt(req.params.id_wt)
        wt.questions = wt.questions.filter(qst => qst.id != req.params.id_qst)
        res.send(await wt.save())
    } catch (err) {
        res.status(400).send(err.message)
    }
})

//update name of white test
wt_router.put("/upd_name/:name/:new_name", [auth, autoris], async (req, res) => {
    try {
        let wt = await White_test.find({
            name: req.params.name
        })
        if (!wt)
            res.status(400).send("Aucun white test avec ce nom")
        for (let w in wt) {
            wt[w].nom = req.params.new_name
            await wt[w].save()
        }
        res.send("Nom changé avec succès!")
    } catch (err) {
        res.status(400).send(err.message)
    }
})

//add date to wt
wt_router.put("/add_date/:id_wt/:id_date", async (req, res) => {
    let wt = await White_test.findById(req.params.id_wt);
    if (!wt)
        return res.status(400).send("White test non trouvé");
    let dt = await Date.findById(req.params.id_date);
    if (!dt)
        return res.status(400).send("Date non trouvée")
    wt.dates.push(dt)
    res.send(await wt.save())
})

//delete date from wt
wt_router.delete("/delete_date/:id_wt/:id_date", async (req, res) => {
    let wt = await White_test.findById(req.params.id_wt);
    if (!wt)
        return res.status(400).send("White test non trouvé");
    let dt = await Date.findById(req.params.id_date);
    if (!dt)
        return res.status(400).send("Date non trouvée")
    wt.dates = wt.dates.filter(dt => dt.id != req.params.id_date)
    res.send(await wt.save())
})

module.exports = wt_router;