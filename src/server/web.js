var Web3 = require("web3");
var fs = require("fs");

// Connect to our local node
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

function deploy(from_address) {

    // web3.eth.defaultAccount = "0x004ec07d2329997267ec62b4166639513386f32e";
    web3.eth.defaultAccount = from_address;
    // read JSON ABI
    var abi = JSON.parse(fs.readFileSync("./erc-20/wasmcontract/TokenInterface.json"));
    var codeHex = '0x' + fs.readFileSync("./erc-20/wasmcontract/erc20.wasm").toString('hex');
    var TokenContract = new web3.eth.Contract(abi, { data: codeHex, from: web3.eth.defaultAccount });
    var TokenDeployTransaction = TokenContract.deploy({ data: codeHex, arguments: [10000000] });
    // Return new promise
    return new Promise(function (resolve, reject) {
        TokenDeployTransaction.send({
            gasLimit: 5000000, from: web3.eth.defaultAccount
        }).then(contract => {
            resolve(contract.options.address);
        }).catch(err => console.log(err));
    })
}

module.exports = {
    deploy
}


