const {User,Todo} = require("../dbConfig/dbconnection")
  


  const createTodo =  async (req , res) => {
    try {
      const { task,status,description,userId} = req.body; 
      console.log(task,status,description,userId)
     
  
      if (userId !== req.decode) {
        return res
          .status(403)
          .send({ status: false, msg: "not Authorized User!!!" });
      }
        let upstatus = ['done', 'pending', 'in Progress', 'completed']
        if(!upstatus.includes(status))
        return res
        .status(400)
        .send({status:false,message:`status shoud be amog ${upstatus}`})
      const newTodo = await Todo.create({ task, status,description,userId });
       return res
       .status(201)
       .send({status:true,message:"todo created successfully",data:newTodo})
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: 'Something went wrong' });
    }
  }


const  getTaskbyId =  async (req, res) => {
  try {
  let taskId = req.params.taskId
    const todo = await Todo.findOne({where: {id : taskId}})
    if(!todo)
    return res 
    .status(404)
    .send({status:false,message:"No todo found"})

    return res
    .status(200)
    .send({status:false, message:"task fetch successfully",data:todo})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
}


  const updateTodo = async (req,res)=> {
    try {
         let taskId = req.params.taskId
        
         let task = await Todo.findOne({where : {id:taskId}})
         console.log
         const { title, description, status } = req.body;
         task.title = title || task.title;
         task.description = description || task.description;
         task.status = status || task.status;
         await task.save();
         return res.status(200).send({status:true,message:"user update Successful"})
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
      }
  }

  const deleteTodo = async (req,res) =>{
    try {
      let taskId = req.params.taskId
        const task = await Todo.findOne({ where: { id: taskId } });
        if (task) {
          await task.destroy();
          res.status(200).send({ message: 'task deleted successfully' });
        } else {
          res.status(404).json({ message: 'task not found' });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
      }
  }

  module.exports = {createTodo,getTaskbyId,updateTodo,deleteTodo}