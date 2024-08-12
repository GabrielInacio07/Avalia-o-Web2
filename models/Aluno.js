const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');
const Personal = require('./Personal');

const Aluno = sequelize.define('Aluno', {
    nomeAluno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idadeAluno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    emailAluno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    personalMatricula: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: 'Personals',
            key: 'matricula',
        }
    }
});

Aluno.belongsTo(Personal, { foreignKey: 'matricula', targetKey: 'matricula' });

module.exports = Aluno;
