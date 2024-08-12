const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');

const Personal = sequelize.define('Personal', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    matricula: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Personal;
