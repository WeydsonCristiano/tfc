module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      homeTeamId: {
        type: Sequelize.INTEGER.INTEGER,
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER.INTEGER,
      },
      awayTeamId: {
        type: Sequelize.INTEGER.INTEGER,
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER.INTEGER,
      },
      inProgess: {
        type: Sequelize.INTEGER.BOOLEAN,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  },
};
