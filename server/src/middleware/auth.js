 const jwt = require("jsonwebtoken")
 const {User,Todo} = require("../dbConfig/dbconnection");

 
    exports.authentication = function (req, res, next) {
    try {
      // let tokenCheck = req.rawHeaders[3].replace("Bearer ", "");
    
      // if (!tokenCheck) {
      //   return res
      //     .status(400)
      //     .send({ status: false, msg: "unauthenticated user" });
      // }
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).send('Unauthorized');
      }
      const tokenCheck = authHeader.split(' ')[1];
  
      jwt.verify(tokenCheck, "itsatoken", (err, decode) => {
        if (err) {
          let msg =
            err.message == "jwt expired"
              ? "Token is Expired !!! "
              : "Token is Invalid !!!";
  
          return res.status(401).send({ status: false, msg: msg });
        }
        req.decode = decode.userId;
  
        next();
      });
    } catch (err) {
      return res.status(500).send({
        status: false,
        msg: "Server Error  authentication!!!",
        ErrMsg: err.message,
      });
    }
  };
  
  
  exports.authorization = async function (req, res, next) {
    try {   
           
         let taskId = req.params.taskId
         console.log(taskId, "taskId")
         let findtask = await Todo.findOne({ where: { id: taskId} })
         console.log(findtask.userId)
        if (findtask.userId == req.decode) {
          next();
        } else {
          return res
            .status(403)
            .send({ status: false, msg: "not Authorized User!!!" });
        }
    } catch (err) {
      return res.status(500).send({
        status: false,
        msg: "Server Error authorization !!!",
        err: err.message,
      });
    }
  };
