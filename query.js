let multichain = require("multichain-node")({
    port: 2660,
    host: '127.0.0.1',
    user: "multichainrpc",
    pass: "DwbnjAQ3pxvpBC9TxkApaYkFtgUrzC5bTqqmQyTEtUnQ"
 });


function readRequest(params) {
    
  return new Promise((resolve) => {
        var address = params.address;
          
  multichain.getAddressBalances({address:address}, (err, res) => {
        console.log(res)
        if(err == null){
         return resolve({voteCount:res[0].qty,name:res[0].name});
        }else{
            console.log(err)
        }
    })

})
  
 }






module.exports = {

   readRequest:readRequest
    

};