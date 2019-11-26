
const users = require('express').Router();
const userModel = require('../model/UserModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;


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
        console.log(hash)
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
                        // res.redirect('/')
                        res.send(user)
                        // res.redirect('/')
                        // return res.redirect('/')
                    })
                    // .catch(err => console.log(err)) 
                    
            } else {
                return res.send({
                    message: "This user information already exists in database"
                });
            }
        })
        .catch(err => console.log(err)) 
    })


       


   

    
    
}

const login = (req, res) => {
    req.body = JSON.parse(Object.keys(req.body))
    // console.log('body:', req.body)
    userModel.findOne({ email: req.body.email })
        
        .then( (user) => {
            // console.log(user)
            if (!user) {
                // console.log('not found')
                res.send({msg: 'user not found'});
            } else {
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (result == true) {
                        // console.log('found')
                        res.send({msg: 'correct match!'});
                    } else {
                        // console.log('incorrect match')
                        res.send({msg : 'Incorrect password'});
                        // res.redirect('/');
                    }
                });
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






users.get('/all', (req,res) => retrieveAllUsers(req,res)); //!
users.post('/register', (req, res) => register(req,res)); //!
users.post('/login', (req, res) => login(req,res)); //!

// users.get('/:id', (req, res) => retrieveOneUser(req, res));
// users.put('/:id', (req, res) => updateOneUser(req, res));
// users.delete('/:id', (req, res) => deleteOneUser(req, res));

module.exports = users;