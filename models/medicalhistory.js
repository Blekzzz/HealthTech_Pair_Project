'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MedicalHistory.belongsTo(models.User)
    }
  }
  MedicalHistory.init({
    diseasesHistory: DataTypes.STRING,
    medicineAllergy: DataTypes.STRING,
    PatientId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MedicalHistory',
  });
  return MedicalHistory;
};