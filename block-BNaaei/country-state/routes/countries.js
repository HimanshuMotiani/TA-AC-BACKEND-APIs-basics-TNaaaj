var express = require("express")
var router = express.Router()
var Country = require("../models/Country")

//creat country, update neighbour coutries
router.post("/",(req,res,next)=>{
    console.log(req.body);
    var neighb_country = req.body.neighb_country;
    Country.create(req.body,(err,createdCountry)=>{
        if(err) return next(err)
        neighb_country.forEach(item=>{
            Country.findOne({name:item},(err,country)=>{
                if(country){
                    console.log(err,"ccc",country);
                Country.findByIdAndUpdate(country.id,{$push:{neighbouring_countires:createdCountry.id}},(err,c)=>{
                 if(err) return next(err)
                 Country.findByIdAndUpdate(createdCountry.id,{$push:{neighbouring_countires:country.id,}},(err,updatedCountry)=>{ 
                    res.send("test")
                })
            }) 
        }
        else {
            res.send("test1")
        }
        })
    }) 
})
})
//get neighbour counties
router.get('/:id/neighb_countries', async (req,res,next)=> {
    const id = req.params.id;
    Country.findById(id).populate("neighbouring_countires").exec((err,countries)=>{
        var polulateCountries = countries.neighbouring_countires
        res.status(200).json({polulateCountries});
    })
});
//list all countries (1) in ascending
router.get("/",(req,res,next)=>{
    Country.find({}).sort('name').exec((err,country)=>{
        if(err) return next(err)
       console.log(err,country);
       res.send(country)
    }) 
})
//update (2)
router.put("/:id",(req,res,next)=>{
    var id = req.params.id;
    Country.findByIdAndUpdate(id,req.body,(err,country)=>{
        if(err) return next(err)
       console.log(err,country);
       res.send(country)
    }) 
})
//delete
router.delete("/:id",(req,res,next)=>{
    var id = req.params.id;
    Country.findByIdAndDelete(id,(err,country)=>{
        if(err) return next(err)
       console.log(err,country);
       res.send(country)
    }) 
})

//list all states in a country, sort them by name
router.get('/:id/byState', async (req,res,next)=> {
    const id = req.params.id;
    Country.findById(id).populate("states").exec((err,states)=>{
        var polulateStates = states.states
        var allstates = polulateStates.sort(compare)
        res.status(200).json({allstates});
    })
});

function compare( a, b ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }
// list religion
router.get('/religion', async (req,res,next)=> {
    var ethnicity = []
    Country.find({},(err,countries)=>{
        countries.forEach(item=>{
            ethnicity.push(item.ethnicity);
        })
        var uniqueEthnicity = [...new Set(ethnicity.flat())];
         res.status(200).json({uniqueEthnicity});
    })
});
//list by continent
router.get('/:continent', async (req,res,next)=> {
    const continent = req.params.continent;
    Country.find({continent:continent},(err,countries)=>{
        console.log(countries);
        res.status(200).json({countries});
    })
});
module.exports = router;