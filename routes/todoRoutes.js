const express = require('express')
const todoController = require('../controllers/todoController')
const auth = require("../middleware/auth")
const router = express.Router()

router.get('/',auth, todoController.getTodos)

router.post('/', todoController.createTodo)

router.put('/:id', todoController.updateTodo)

router.delete('/:id', todoController.deleteTodo)

router.post('/login',todoController.login)

router.post('/insertData',auth,todoController.insertData)

router.get('/getData',auth,todoController.getData)



module.exports = router