const express = require('express')
const todoController = require('../controllers/todoController')

const router = express.Router()

router.get('/', todoController.getTodos)

router.post('/', todoController.createTodo)

router.put('/:id', todoController.updateTodo)

router.delete('/:id', todoController.deleteTodo)

router.post('/login',todoController.login)

router.post('/insertData',todoController.insertData)

router.get('/getData',todoController.getData)



module.exports = router