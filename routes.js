//here only routing is done
'use strict';
const sendassets = require('./functions/savetransaction');
const getbalance = require('./functions/readbalance');
const cors = require('cors');

var request = require('request-promise');
var mongoose = require('mongoose');




var express = require('express');

var Promises = require('promise');
let multichain = require("multichain-node")({
    port:  2660,
    host: '127.0.0.1',
    user: "multichainrpc",
    pass: "DwbnjAQ3pxvpBC9TxkApaYkFtgUrzC5bTqqmQyTEtUnQ"
 });

module.exports = router => {
    // file upload API
    
   
   
   //saveVoteA -  routes user input to function saveVoteA.
    router.post("/sendAsset", (req, res) => {
        
       var  transactiondetails = req.body.transactiondetails;
        console.log("transactiondetails" + transactiondetails);
        
        var object={"from":transactiondetails.from,"to":transactiondetails.to,"qty":transactiondetails.qty}
        sendassets.savetransaction(object)
                    .then(result => {
                                        res
                                            .status(200)
                                            .json({
                                                "message": "cash sent successsfully",
                                                "txid": result.query
                                            });
                                    })
    });
    router.post("/generateAddress", (req, res1) => {
        
        multichain.getNewAddress((err, res) => {
            console.log(res)
            if(err == null){
                res1
                .status(200)
                .json({
                  
                    "address": res
                });
            }else{
                console.log(err)
            }
        })
    
    })

    router.post("/getAddress", (req, res1) => {
        
        multichain.getAddresses((err, res) => {
            console.log(res)
            if(err == null){
                res1
                .status(200)
                .json({
                  
                    "address": res
                });
            }else{
                console.log(err)
            }
        })
    
    })
 
router.post('/getbalance', cors(), (req, res) => {
      
        const address = req.body.address;
        
      
        
       if (!address || !address.trim() ) {
            res
                .status(400)
                .json({
                    message: 'Invalid Request !'
                });
        } else {
           
            getbalance
                .readRequest(address)
                .then(function(result) {
                   var assetdetails ={ qty:result.count.voteCount,name:result.count.name};
                 res
                                .status(200)
                                .json({
                                   "assetdetails":assetdetails
                                   
                                });
                
                })
                
                         
                        
                   
                   .catch(err => res.status(err.status).json({
                        message: err.message
                    }));
            };

    });
    
 
  
}