const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todoapp', 'root', 'Sd@191212', {
  host: 'localhost',
  dialect: 'mysql',
});


sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require('../models/userModle')(sequelize, Sequelize)
db.Todo = require('../models/todoModle')(sequelize, Sequelize)

db.User.hasMany(db.Todo, { foreignKey: 'userId', onDelete: 'cascade' });
db.Todo.belongsTo(db.User, { foreignKey: 'userId' });

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})







module.exports = db
