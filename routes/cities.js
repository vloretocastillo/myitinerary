
const cities = require('express').Router();
const cityModel = require('../model/CityModel')

const passport = require("passport");


const retrieveAllCities = (req, res) => {
    cityModel.find({})
    .then(files => {
        res.send(files)
    })
    .catch(err => console.log(err));
}

const createOneCity = (req,res) => {

    cityModel.find({name : req.body.name})
        .then((file)=>{
            if (file.length === 0) {
                const newCity = new cityModel({
                    name: req.body.name,
                    country: req.body.country, 
                })
                newCity.save()
                  .then(city => { res.send(city) })
            } else {
                return res.send({
                    message: "This city exists in database"
                });
            }
        })
        .catch(err => { res.status(500).send("Server error")}) 

        
     
}


const retrieveOneCityByName = (req, res) => {
    cityModel.find({name : req.params.name})  // .findById(req.params.id)
        .then((file) => {
            file = file.pop()
            res.send(file);  
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with name " + req.params.name
                });                
            }
            return res.status(500).send({
                message: "Error retrieving note with name " + req.params.name
            });
        });
}



cities.get('/all', (req,res) => retrieveAllCities(req,res)); //!
cities.post('/', (req, res) => createOneCity(req,res)); //!
cities.get('/name/:name', (req, res) => retrieveOneCityByName(req, res));



module.exports = cities;