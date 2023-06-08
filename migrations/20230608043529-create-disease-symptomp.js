'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DiseaseSymptomps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      DiseaseId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Diseases"
          }
        }
      },
      SymptompId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Symptomps"
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DiseaseSymptomps');
  }
};