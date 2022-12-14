const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs');
const { count } = require('../models/userModel')
const Data = require('../models/dataModel')
const { json } = require('express')

const getTodos = async (req, res) => {
    const users = await User.find()

    res.status(200).json(users)
}

const createTodo = async (req, res) => {

    if (!req.body) {
        res.status(400).json({ message: "Data is empty" })
        return
    }    
    encryptedPassword = await bcrypt.hash(req.body.password, 10);
try{
   
    const newUser = await User.create({
        name: req.body.name,
        username:req.body.username,
        email:req.body.email,
        password:encryptedPassword        
    })
    res.status(200).send(newUser)  
    
}catch(e){
    console.log(e.message)
    res.status(400)
}
res.status(400)

}

const login = async (req,res)=>{
    if (!req.body) {
        res.status(400).json({ message: "Data is empty" })
        return
    } 
    const email = req.body.email
    const password = req.body.password
    
  var user = await User.findOne({email:email});
 
    if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          "ahfdkufhkh4768746ghjgfjg234hkjhdk@",
          {
            expiresIn: "2h",
          }
        );
      user.token = token;        
        console.log(user)
        // user
        res.status(200).json(user);
    }else{
        res.status(400).send("Invalid Credentials");
    }
    

    // User.find({ email: email},  function (err, user) {
    //     if (err){
    //         console.log(err);            
    //     }
    //     else{
    //         if(user.length>0){
    //             if(user[0].password == password){
    //         res.status(200).send(user[0])
    //             }else{
    //                 res.status(403).json({'message':'Username or Password Incorrect'})
    //             }
    //         }
    //         else{
    //             res.status(404).json({'message':'User not found'})
    //         }

    //     }
    // });
}
const insertData = async (req, res)=>{
    if (!req.body) {
        res.status(400).json({ message: "Data is empty" })
        return
    }
    const newData = await Data.create({
        temperature: req.body.temperature,
        humidity:req.body.humidity,
        moisture:req.body.moisture,
        timestamp:req.body.timestamp
        
    })
    res.status(201).json({'message':'Data inserted successfully'})

}
const getData = async (req, res)=>{
    const data = await Data.find()
    res.status(200).json(data)
}
const updateTodo = async (req, res) => {
    if (!req.body.data) {
        res.status(400).json({ message: "Data is empty" })
        return
    }

    const todo = await Todo.findById(req.params.id)

    if (!todo) {
        res.status(404).json({ message: "Todo Not Found" })
        return
    }

    const udpatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(udpatedTodo)
}

const deleteTodo = async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
        res.status(404).json({ message: "Todo Not Found" })
        return
    }

    await todo.remove()

    res.status(200).json({ id: req.params.id })
}

const completeTodo = async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
        res.status(404).json({ message: "Todo Not Found" })
        return
    }

    const completedTodo = await Todo.findByIdAndUpdate(req.params.id, { isComplete: true }, { new: true })

    res.status(200).json(completedTodo)
}

module.exports = { getTodos, createTodo, updateTodo, deleteTodo, completeTodo, login , insertData, getData}