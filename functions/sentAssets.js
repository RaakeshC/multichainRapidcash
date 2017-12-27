'use strict';

const getMultichainInfo = require('../models/invoke');


exports.getAssets = () => {
    return new Promise((resolve, reject) => {

        console.log("Inside GetDetails");

        getMultichainInfo
        .getChainInfo()
        .then((result) => resolve({
            status: 201,
            message: result.response
        }))
        .catch(err => {
            if (err.code == 11000) {
                reject({
                    status: 409,
                    message: 'Pledge Error'
                });

            } else {

                reject({
                    status: 500,
                    message: 'Internal Server Error !'
                });
            }
        });
    });
}