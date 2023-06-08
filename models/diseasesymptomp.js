'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiseaseSymptomp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DiseaseSymptomp.init({
    DiseaseId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Diseases',
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
    SymptompId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Symptomps',
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }
  }, {
    sequelize,
    modelName: 'DiseaseSymptomp',
  });
  return DiseaseSymptomp;
};