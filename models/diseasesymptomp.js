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
    DiseaseId: DataTypes.INTEGER,
    SymptompId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DiseaseSymptomp',
  });
  return DiseaseSymptomp;
};