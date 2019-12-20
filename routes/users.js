
const users = require('express').Router();
const userModel = require('../model/UserModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken")
const secretOrKey = require("../keys").secretOrKey
const itineraryModel = require('../model/ItineraryModel')



const retrieveAllUsers = (req, res) => {
    userModel.find({})
        .then(files => {
            res.send(files)
        })
        .catch(err => console.log(err));
}

const register = (req, res) => {


    req.body = JSON.parse(Object.keys(req.body))


    bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
        userModel.find( {$or:[{email: req.body.email},{username:req.body.username}]} )
        .then((file)=>{
            if (file.length === 0) {
                const newUser = new userModel({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    country: req.body.country, 
                    username: req.body.username, 
                    password: hash, 
                    email: req.body.email,   
                    avatar:  req.body.avatar,
                    favorites: [] 
                })
                newUser.save()
                    .then(user => {  
                        res.send(user)
                    })
                    
            } else {
                return res.send({
                    msg: "This user information already exists in database"
                });
            }
        })
        .catch(err => console.log(err)) 
    })  
}

const login = (req, res) => {
    req.body = JSON.parse(Object.keys(req.body))
    userModel.findOne({ email: req.body.email })
        
        .then( (user) => {
            if (!user) {
                res.send({msg: 'user not found'});
            } else {
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (result == true) {
                        const payload = {
                            id: user._id,
                            username: user.username,
                        }
                        const options = {expiresIn: 2592000};
                        jwt.sign( payload, secretOrKey, options, (err, token) => {
                            if(err){
                                res.json({
                                    success: false,
                                    token: "There was an error"
                                })
                            } else {
                                itineraryModel.find( { _id : { $in : user.favorites } } )
                                    .then(favorites => {
                                        res.json({
                                            success: true,
                                            token: token,
                                            user : user,
                                            favorites : favorites
                                        })
                                        
                                    })
                                
                            }
                        })
                    } else {
                        res.send({msg : 'Incorrect password'});
                    }
                })
            }
        })
        .catch(err => console.log(err)) 
}





users.get('/currentuser', (req,res) => {
    jwt.verify(req.query.auth_token, secretOrKey, (err, decodedToken) => {
        if(err) { /* handle token err */ }
        else {
            userModel.findById(decodedToken.id)
                .then((user) => {
                    itineraryModel.find( { _id : { $in : user.favorites } } )
                        .then(favorites => {
                            res.send({   
                                user : user,
                                favorites : favorites
                            }) 
                        })
                })
                .catch(err => {
                    if(err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "User not found with id " + decodedToken.id
                        });                
                    }
                    return res.status(500).send({
                        message: "Error retrieving note with id " + decodedToken.id
                    });
                });
        }
    });
}); 

const addToFavorites = (req, res) => {
    userModel.findById(req.params.id)
        .then((user)=> {
            user.favorites.push(req.headers.itinerary)
            user.save()
                .then((user) => {
                    itineraryModel.find( { _id : { $in : user.favorites } } )
                        .then(favorites => res.send(favorites) )
                })
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

const removeFromFavorites = (req, res) => {
    userModel.findById(req.params.id)
        .then((user)=> {
            
            user.favorites.splice( user.favorites.indexOf(req.headers.itinerary), 1)
     
            user.save()
                .then((user) => {
                    itineraryModel.find( { _id : { $in : user.favorites } } )
                        .then(favorites => res.send(favorites) )
                })
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


users.get('/all', (req,res) => retrieveAllUsers(req,res)); //!
users.post('/register', (req, res) => register(req,res)); //!
users.post('/login', (req, res) => login(req,res)); //!
users.get('/addfavorite/:id', (req, res) => addToFavorites(req,res)); //!
users.get('/removefavorite/:id', (req, res) => removeFromFavorites(req,res));


module.exports = users;