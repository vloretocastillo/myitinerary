
const users = require('express').Router();
const userModel = require('../model/UserModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken")
const secretOrKey = require("../keys").secretOrKey


const retrieveAllUsers = (req, res) => {
    userModel.find({})
        .then(files => {
            res.send(files)
        })
        .catch(err => console.log(err));
}

// const encryptPassword = async (password) => {
//     return await crypt.genSalt(saltRounds, (err, salt) => {
//         bcrypt.hash(password, salt, (err, hash) => {
//             return hash
//         });
//     });
// }

const register = (req, res) => {

    req.body = JSON.parse(Object.keys(req.body))

    // console.log(req.body)

   

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
                                res.json({
                                    success: true,
                                    token: token,
                                    user : user
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

// const retrieveOneUser = (req, res) => {
//     userModel.findById(req.params.id)
//         .then((file) => {
//             res.send(file);  
//         })
//         .catch(err => {
//             if(err.kind === 'ObjectId') {
//                 return res.status(404).send({
//                     message: "User not found with id " + req.params.id
//                 });                
//             }
//             return res.status(500).send({
//                 message: "Error retrieving note with id " + req.params.id
//             });
//         });
// }




users.get('/currentuser', (req,res) => {
    jwt.verify(req.query.auth_token, secretOrKey, (err, decodedToken) => {
        if(err) { /* handle token err */ }
        else {
            userModel.findById(decodedToken.id)
                .then((file) => {
                    res.send(file);  
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
                .then((file) => res.send(file.favorites)  )
        })
}

const removeFromFavorites = (req, res) => {
    userModel.findById(req.params.id)
        .then((user)=> {
            user.favorites.splice( user.favorites.indexOf(req.headers.itinerary), 1)
            // list.splice( list.indexOf('foo'), 1 );
            user.save()
                .then((file) => res.send(file.favorites)  )
        })
}


users.get('/all', (req,res) => retrieveAllUsers(req,res)); //!
users.post('/register', (req, res) => register(req,res)); //!
users.post('/login', (req, res) => login(req,res)); //!
users.get('/addfavorite/:id', (req, res) => addToFavorites(req,res)); //!
users.get('/removefavorite/:id', (req, res) => removeFromFavorites(req,res));

// users.get('/:id', (req, res) => retrieveOneUser(req, res));
// users.put('/:id', (req, res) => updateOneUser(req, res));
// users.delete('/:id', (req, res) => deleteOneUser(req, res));

module.exports = users;