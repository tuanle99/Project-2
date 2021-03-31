const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Task extends Model {}

Task.init(
    // Model Column and Details Layout
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        user_assigned_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        is_complete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:false
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        created_by: {
            type: DataTypes.INTEGER,
            // references: {
            //     model: 'user',
            //     key: 'id',
            // },
        },
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            reference: {
                model: 'project',
                key: 'id',
            },
        },
    },

    // Model Options
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'task',
    }
);

module.exports = Task;