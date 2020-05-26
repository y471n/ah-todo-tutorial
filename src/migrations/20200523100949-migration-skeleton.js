'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   await queryInterface.createTable('tasks', {
     guid: {
       type: Sequelize.DataTypes.UUID,
       defaultValue: Sequelize.DataTypes.UUIDV4,
       primaryKey: true
     },
     title: {
       type: Sequelize.DataTypes.STRING(50),
       allowNull: false
     },
     done: {
       type: Sequelize.DataTypes.BOOLEAN,
       defaultValue: false,
       allowNull: false
     }
   })
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   await queryInterface.dropTable('Tasks');
  }
};
