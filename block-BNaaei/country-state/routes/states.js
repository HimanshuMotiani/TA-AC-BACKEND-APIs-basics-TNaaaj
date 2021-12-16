var express = require("express")
var router = express.Router()
var State = require("../models/State")
var Country = require("../models/Country")

//add states, add states in country
router.post("/", (req, res, next) => {
    var country_name = req.body.country_name;
    Country.findOne({ name: country_name }, (err, country) => {
        if (country) {
            State.create(req.body, (err, state) => {
                if (err) return next(err)
                State.findByIdAndUpdate(state.id, { "countryId": country._id }, (err, state) => {
                    if (err) return next(err)
                    Country.findByIdAndUpdate(country.id, { $push: { "states": state._id } }, (err, country) => {
                        console.log(err, country);
                        res.send(state)
                    })
                })
            })
        }
        else {
            State.create(req.body, (err, state) => {
                if (err) return next(err)
                res.send(state)
            })
        }
    })
})


module.exports = router;