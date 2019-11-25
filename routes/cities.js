
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
    // console.log('body: ',req.body)

    cityModel.find({name : req.body.name})
        .then((file)=>{
            if (file.length === 0) {
                const newCity = new cityModel({
                    name: req.body.name,
                    country: req.body.country, 
                    // itineraries : req.body.itineraries
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

// const retrieveOneCity = (req, res) => {
//     cityModel.find({_id : req.params.id})  // .findById(req.params.id)
//         .then((file) => {
//             res.send(file);  
//         })
//         .catch(err => {
//             if(err.kind === 'ObjectId') {
//                 return res.status(404).send({
//                     message: "Note not found with id " + req.params.id
//                 });                
//             }
//             return res.status(500).send({
//                 message: "Error retrieving note with id " + req.params.id
//             });
//         });
// }

const retrieveOneCityByName = (req, res) => {
    // console.log('by name')
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

// const updateOneCity = (req, res) => {

    
//     cityModel.findByIdAndUpdate(req.params.id, {
//         name: req.body.name,
//         country: req.body.country,
//     }, {new: true})
//     .then(file => {
//         // file.itineraries = [...file.itineraries, ...req.body.itineraries] //push(req.body.itineraries[0])
//         file.save()
//         if(!file) {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.id
//             });
//         }
//         res.send(file);
//     })
//     .catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.id
//             });                
//         }
//         return res.status(500).send({
//             message: "Error updating note with id " + req.params.id
//         });
//     });
    
// }

// const deleteOneCity = (req, res) => {
//     cityModel.findByIdAndRemove(req.params.id)
//     .then(file => {
//         if(!file) {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.id
//             });
//         }
//         res.send({message: "Note deleted successfully!"});
//     }).catch(err => {
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.id
//             });                
//         }
//         return res.status(500).send({
//             message: "Could not delete note with id " + req.params.id
//         });
//     });
// }


cities.get('/all', (req,res) => retrieveAllCities(req,res)); //!
cities.post('/', (req, res) => createOneCity(req,res)); //!
cities.get('/name/:name', (req, res) => retrieveOneCityByName(req, res));


// cities.get('/:id', (req, res) => retrieveOneCity(req, res));
// cities.put('/:id', (req, res) => updateOneCity(req, res));
// cities.delete('/:id', (req, res) => deleteOneCity(req, res));

module.exports = cities;