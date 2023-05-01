const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/mysql.config');
const City = require('./city.model');

const Result = sequelize.define('Result', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    city_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    niche: {
        type: DataTypes.STRING,
        allowNull: false
    },
    impressions: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gmaps_reviews: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gmaps_website: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gmaps_name: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gmaps_organic: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gorg_title: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gorg_domain: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Result.associate = function (models) {
    Result.belongsTo(sequelize.models.City, {
        foreignKey: 'city_id',
        as: 'city',
    });
};

module.exports = Result;
