const { Sequelize, Model, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
    schema: process.env.DB_SCHEMA_NAME,
  }
);

class CompanyModel extends Model {}
CompanyModel.init(
  {
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    c_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: process.env.DB_TABLE_NAME,
    timestamps: false,
  }
);

module.exports = { sequelize, CompanyModel };
