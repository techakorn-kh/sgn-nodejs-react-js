const xlsx = require('xlsx');
const { Op } = require('sequelize');
const { populationsModel } = require('../models/index');

module.exports = {
    async uploadExcel(req, res) {
        try {
            const workbook = xlsx.readFile(req.file.path);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = xlsx.utils.sheet_to_json(worksheet);

            const arr = [];

            if(data && data.length > 0) {
                for(let i = 0; i < data.length; i++) {
                    arr.push({
                        country_name: data[i]["Country name"],
                        year: Number(data[i]["Year"]),
                        total: Number(data[i]["Population"]),
                        population: Number(data[i]["Population"]),
                        under_age_1: Number(data[i]["Population of children under the age of 1"]),
                        under_age_5: Number(data[i]["Population of children under the age of 5"]),
                        under_age_15: Number(data[i]["Population of children under the age of 15"]),
                        under_age_25: Number(data[i]["Population under the age of 25"]),
                        age_15_to_64: Number(data[i]["Population aged 15 to 64 years"]),
                        older_than_15: Number(data[i]["Population older than 15 years"]),
                        older_than_18: Number(data[i]["Population older than 18 years"]),
                        age_1: Number(data[i]["Population at age 1"]),
                        age_1_to_4: Number(data[i]["Population aged 1 to 4 years"]),
                        age_5_to_9: Number(data[i]["Population aged 5 to 9 years"]),
                        age_10_to_14: Number(data[i]["Population aged 10 to 14 years"]),
                        age_15_to_19: Number(data[i]["Population aged 15 to 19 years"]),
                        age_20_to_29: Number(data[i]["Population aged 20 to 29 years"]),
                        age_30_to_39: Number(data[i]["Population aged 30 to 39 years"]),
                        age_40_to_49: Number(data[i]["Population aged 40 to 49 years"]),
                        age_50_to_59: Number(data[i]["Population aged 50 to 59 years"]),
                        age_60_to_69: Number(data[i]["Population aged 60 to 69 years"]),
                        age_70_to_79: Number(data[i]["Population aged 70 to 79 years"]),
                        age_80_to_89: Number(data[i]["Population aged 80 to 89 years"]),
                        age_90_to_99: Number(data[i]["Population aged 90 to 99 years"]),
                        older_than_100: Number(data[i]["Population older than 100 years"])
                    });
                }
            }

            if(arr.length > 0) {
                await populationsModel.destroy({ truncate: true });

                await populationsModel.bulkCreate(arr, {
                        ignoreDuplicates: true,
                }).catch((err) => {
                    throw err;
                });
            }

            return res.json(arr);
        } catch (err) {
            console.error(err);
        }
    },
    async populationsIndex(req, res) {
        try {
            const resultA = await populationsModel.findAll({
                attributes: ['country_name'],
                group: 'country_name'
            }).catch((err) => {
                throw err;
            });

            const dataset = {};

            if(resultA.length > 0) {
                for(let i = 0; i < resultA.length; i++) {
                    if(resultA[i].country_name.length < 15) {
                        const objA = dataset[resultA[i].country_name] = {};

                        const resultB = await populationsModel.findAll({
                            attributes: ['year', 'total'],
                            where: {
                                country_name: resultA[i].country_name
                            }
                        }).catch((err) => {
                            throw err;
                        });
    
                        if(resultB.length > 0) {
                            for(let j = 0; j < resultB.length; j++) {
                                objA[resultB[j].year] = String(Number(resultB[j].total));
                            }
                        }
                    }
                }
            }

            return res.json(dataset);
        } catch (err) {
            console.error(err);
        }
    }
}