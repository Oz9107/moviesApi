const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Directors = sequelize.define("directors", {
  firstName: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

module.exports = Directors;
