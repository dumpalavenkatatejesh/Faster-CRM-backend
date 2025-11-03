const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Enquiry = sequelize.define('Enquiry', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: true },
  courseInterest: { type: DataTypes.STRING, allowNull: true },
  claimedBy: { type: DataTypes.INTEGER, allowNull: true } // FK to Employee.id (nullable)
}, {
  timestamps: true
});

module.exports = Enquiry;
