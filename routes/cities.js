
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
        .catch(err => console.log(err));
});

cities.get('/:id', (req, res) => {
    // cityModel.find({_id : req.params.id})
    //     .then((file)=> {
    //         if (file) {
    //             res.send(file)
    //         } else {
    //             res.send('not found')
    //         }
    //     })
    //     .catch(err => console.log(err));

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

});

cities.put('/:id', (req, res) => {
    
});

cities.delete('/:id', (req, res) => {
    
});

module.exports = cities;