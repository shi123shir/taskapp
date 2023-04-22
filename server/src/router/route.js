const express = require("express")
const route = express.Router()
const {createUser,loginUser,getallTask} = require("../controller/userController")
const {createTodo,getTaskbyId,updateTodo,deleteTodo}  = require("../controller/todoController")
const {authentication,authorization}= require("../middleware/auth")

route.post("/register",createUser)
route.post("/login",loginUser)
route.get("/getUser/:userId",authentication,getallTask)


route.post("/createtask",authentication,createTodo )
route.get("/gettask/:taskId",authentication,authorization ,getTaskbyId)
route.patch("/updatetask/:taskId",authentication,authorization, updateTodo)
route.delete("/deletetask/:taskId",authentication,authorization,deleteTodo)






module.exports = route