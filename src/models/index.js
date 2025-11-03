const sequelize = require('../config/database');
const Employee = require('./employee');
const Enquiry = require('./enquiry');

// Associations
Employee.hasMany(Enquiry, { foreignKey: 'claimedBy' });
Enquiry.belongsTo(Employee, { foreignKey: 'claimedBy', as: 'owner' });

module.exports = {
  sequelize,
  Employee,
  Enquiry
};
