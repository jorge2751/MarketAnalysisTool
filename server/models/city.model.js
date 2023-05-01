const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/mysql.config');
const Result = require('./result.model');
const State = require('./state.model');

const City = sequelize.define('City', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    state_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    population: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

City.associate = function (models) {
    City.hasMany(models.Result, {
        foreignKey: 'city_id',
        as: 'results',
        onDelete: 'CASCADE',
    });

    City.belongsTo(models.State, {
        foreignKey: 'state_id',
        as: 'state',
    });
};

module.exports = City;