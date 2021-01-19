var Web3 = require("web3");
var fs = require("fs");
var acc = "0x004ec07d2329997267ec62b4166639513386f32e";
// Connect to our local node
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


//get the total supply
function totalSupply(contract_adrress) {
    var contract_address = contract_adrress;
    var abi = JSON.parse(fs.readFileSync("./erc-20/wasmcontract/TokenInterface.json"));
    var Contract = new web3.eth.Contract(abi, contract_address);
    return new Promise(function (resolve, reject) {
        Contract.methods.totalSupply().call
            ().then(total_supply => {
                resolve(total_supply);
            }).catch(err => {
                reject(err)
            });
    })
}

//get the balance
function balanceOf(contract_adrress, from_address) {
    var contract_address = contract_adrress;
    var abi = JSON.parse(fs.readFileSync("./erc-20/wasmcontract/TokenInterface.json"));
    var Contract = new web3.eth.Contract(abi, contract_address);
    // Return new promise
    return new Promise(function (resolve, reject) {
        // Do async job
        Contract.methods.balanceOf(from_address).call().then(total_balance => {
            resolve(total_balance);
        }).catch(err => {
            reject(err)
        });
    })
}

//get transfer
function transfer(contract, to_address, amount) {
    var contract_address = contract;
    var abi = JSON.parse(fs.readFileSync("./erc-20/wasmcontract/TokenInterface.json"));
    var Contract = new web3.eth.Contract(abi, contract_address);
    return new Promise(function (resolve, reject) {
        Contract.methods.transfer(to_address, amount).call().then(value => {
            resolve(value);
        }).catch(err => {
            reject(err)
        });
    })
}

module.exports = {
    totalSupply, balanceOf, transfer
}



