'use strict';


const bcSdk = require('../query.js');

exports.readRequest = (address) => {
   return new Promise((resolve, reject) => {
       console.log("entering into readRequest function.......!")
      
     bcSdk.readRequest({
        address: address
       })

    .then((balance) => {
    

        return resolve({
               status: 200,
               count: balance
           })
       })

    .catch(err => {

        if (err.code == 401) {

            return reject({
                   status: 401,
                   message: 'cant fetch !'
               });

        } else {
               console.log("error occurred" + err);

            return reject({
                   status: 500,
                   message: 'Internal Server Error !'
               });
           }
       })
   })
};