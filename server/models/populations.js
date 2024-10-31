const {  DataTypes } = require('sequelize');
const { sequelize } = require('../connect')


const populations = sequelize.define('populations', {
    country_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    },
    population: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    },
    under_age_1: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    },
    under_age_5: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    },
    under_age_15: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    },
    under_age_25: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    },
    age_15_to_64: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    },
    older_than_15: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    },
    older_than_18: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    },
    age_1: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    },
    age_1_to_4: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    },
    age_5_to_9: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    },
    age_10_to_14: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    },
    age_15_to_19: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    },
    age_20_to_29: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    },
    age_30_to_39: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    },
    age_40_to_49: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    },
    age_50_to_59: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    },
    age_60_to_69: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    },
    age_70_to_79: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    },
    age_80_to_89: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    },
    age_90_to_99: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    },
    older_than_100: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['country_name', 'year']
        }
    ]
});

populations.sync({ alter: true });

module.exports = populations