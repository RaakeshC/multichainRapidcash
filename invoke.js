let multichain = require("multichain-node")({
    port:  2660,
    host: '127.0.0.1',
    user: "multichainrpc",
    pass: "ETMYV3RyfBNqwwdg8JwXJbeV6dGjw3dz9Ekq4yJPYkH9"
 });


function savetransaction(params) {
  
   return new Promise((resolve) => {
        var response;

  var TransactionDetails = params.transactionDetails;

   
  multichain.sendAssetFrom({from:TransactionDetails.from,to:TransactionDetails.to,asset:"Rapidcash",qty:TransactionDetails.qty}, (err, res) => {
        console.log(res)
        if(err == null){
         return resolve({response:res});
        }else{
            console.log(err)
        }
    })

})
  
 }
 module.exports = {
    savetransaction: savetransaction
    

};