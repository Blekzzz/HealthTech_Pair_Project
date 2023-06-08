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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "name must be filled"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "description must be filled"
        }
      }
    },
    drug: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "drug must be filled"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Disease',
  });
  return Disease;
};