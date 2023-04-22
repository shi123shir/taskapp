
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const {User,Todo} = require('../dbConfig/dbconnection');




const emailregex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
const passwordregex = /^(?!.\s)[A-Za-z\d@$#!%?&]{8,15}$/;
// Create user
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
   
    if(!name || !email || !password)
    return res
    .status(400)
    .json({message:"enter required fieldes"})

    if (!emailregex.test(email))
    return res
      .status(400)
      .send({ status: false, message: "email must be in valid format" });
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).send({ msg: 'User already exists' });
    }

    if (!passwordregex.test(password))
    return res
      .status(400)
      .send({ status: false, message: "Password should be in valid format" });
   
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword });
     return res.
     status(201)
     .send({status:true, message:"user created sucessfully", data:newUser })
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// Login user
 const loginUser =  async (req, res) => {
    try {
      const { email, password } = req.body;
     
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).send({ msg: 'Invalid credentials' });
      }
     
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ msg: 'Invalid credentials' });
      }
      
      let token = jwt.sign(
        {
          userId: user.id,
          iat: new Date().getTime(),
          exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60,
        },
        "itsatoken"
      );
      return res.status(201).send({
        status: true,
        message: "user login successfully",
        data: { userId: user.id, token: token },
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
  
  // Get authenticated user
const getallTask =  async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId,req.decode)
    if (userId !== req.decode) {
      return res
        .status(403)
        .send({ status: false, msg: "not Authorized User!!!" });
    }
    const todos = await Todo.findAll({ where: { userId: userId } });
    if (todos.length > 0) {
        return res.status(200).send({ status: true, message: "Todos fetch successful", data: todos });
    } else {
        res.status(404).send({ message: "No todos found" });
    }
} catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
}
  }
  
  module.exports = {createUser,loginUser,getallTask}