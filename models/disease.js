'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Disease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Disease.belongsTo(models.User)
      Disease.belongsToMany(models.Symptomp, { onDelete: 'cascade', hooks: true, through: 'DiseaseSymptomps' })
    }

    static dateFind(date) {
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      if (day < 10) {
        day = "" + day
      } 
      if (month < 10) {
        month = "0" + month
      }

      return day + "-" + month + "-" + year
    }
  }
  Disease.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    drug: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Disease',
  });
  return Disease;
};