
const cities = require('express').Router();
const cityModel = require('../model/CityModel')

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
                    country: req.body.country
                })
                newCity.save()
                  .then(city => { res.send(city) })
                  .catch(err => { res.status(500).send("Server error")}) 
            } else {
                res.send('error')
            }
        }) 
        .catch(err => console.log(err));
}

const retrieveOneCity = (req, res) => {
    cityModel.find({_id : req.params.id})  // .findById(req.params.id)
        .then((file) => {
            res.send(file);  
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.id
            });
        });
}

const updateOneCity = (req, res) => {
    
}

const deleteOneCity = (req, res) => {

}

cities.get('/all', (req,res) => retrieveAllCities(req,res));

cities.post('/', (req, res) => createOneCity(req,res));

cities.get('/:id', (req, res) => retrieveOneCity(req, res));

cities.put('/:id', (req, res) => updateOneCity(req, res));

cities.delete('/:id', (req, res) => deleteOneCity(req, res));

module.exports = cities;