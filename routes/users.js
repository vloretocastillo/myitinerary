
const users = require('express').Router();
const userModel = require('../model/UserModel')


const retrieveAllUsers = (req, res) => {
    userModel.find({})
        .then(files => {
            res.send(files)
        })
        .catch(err => console.log(err));
}

const createOneUser = (req,res) => {

    userModel.find({email : req.body.email})
        .then((file)=>{
            if (file.length === 0) {
                const newUser = new userModel({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    country: req.body.country, 
                    username: req.body.username, 
                    password: req.body.password, 
                    email: req.body.email, 
                    
                })
                newUser.save()
                  .then(user => { res.send(user) })
            } else {
                return res.send({
                    message: "This user email exists in database"
                });
            }
        })
        .catch(err => { res.status(500).send("Server error")}) 
    
}

const retrieveOneUser = (req, res) => {
    userModel.findById(req.params.id)
        .then((file) => {
            res.send(file);  
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.id
            });
        });
}



// const updateOneUser = (req, res) => {

    
   
    
// }

// const deleteOneUser= (req, res) => {
    
// }


users.get('/all', (req,res) => retrieveAllUsers(req,res));

users.post('/', (req, res) => createOneUser(req,res));

users.get('/:id', (req, res) => retrieveOneUser(req, res));

// users.put('/:id', (req, res) => updateOneUser(req, res));

// users.delete('/:id', (req, res) => deleteOneUser(req, res));

module.exports = users;