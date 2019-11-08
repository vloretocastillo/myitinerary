
const cities = require('express').Router();
const cityModel = require('../model/CityModel')

cities.get('/all', (req, res) => {
    cityModel.find({})
        .then(files => {
            res.send(files)
        })
        .catch(err => console.log(err));
});

cities.post('/', (req, res) => {

    cityModel.find({name : req.body.name})
        .then((file)=>{
            if (file.length === 0) {
                const newCity = new cityModel({
                    name: req.body.name,
                    country: req.body.country
                })
                newCity.save()
                  .then(city => { res.send(city) })
                  .catch(err => { res.status(500).send("Server error")}) 
            } else {
                res.send('error')
            }
        })



    

    
});

module.exports = cities;
