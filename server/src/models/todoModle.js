module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define('Todo', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      task: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description:{
        type:Sequelize.STRING,
        allowNull:false
      },
      status: {
        type: Sequelize.ENUM('done', 'pending', 'in progress', 'completed'),
        defaultValue: 'pending',
        allowNull: false,
      },
    }, {
      timestamps: true,
    });
  
  
    return Todo;
  };
  