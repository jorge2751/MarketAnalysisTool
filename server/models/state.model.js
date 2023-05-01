const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/mysql.config');
const City = require('./city.model');

const State = sequelize.define('State', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    min_population: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    max_population: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

State.associate = function (models) {
    State.hasMany(models.City, {
        foreignKey: 'state_id',
        as: 'cities',
        onDelete: 'CASCADE',
    });
};

module.exports = State;