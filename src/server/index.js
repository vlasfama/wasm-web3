const express = require('express');
const path = require('path')
const os = require('os');
const app = express();
const dc = require('./web');
const cc = require('./web-transfer')
var bodyParser = require('body-parser')
app.use(express.static('dist'));
app.use(bodyParser.json())

//deploy contract
app.post('/api/deployContract', function (req, res, next) {
    return dc.deploy(req.body.from)
        .then(function (contract_address) {
            return res.send({ success: true, contract: contract_address });
        })
        .catch(next);
});

//get the total supply
app.post('/api/gettotalSupply', function (req, res, next) {
    return cc.totalSupply(req.body.contract).then(function (total_supply) {
        return res.json({ success: true, totalsupply: total_supply });
    }).catch(next);

})

//get balance
app.post('/api/balanceof', function (req, res, next) {
    return cc.balanceOf(req.body.contract, req.body.from).then(function (total_bal) {
        res.json({ success: true, balance: total_bal });
    }).catch(next);

})

//send
app.post('/api/transfer', function (req, res, next) {
    return cc.transfer(req.body.contract, req.body.to, req.body.amount).then(function (status) {
        console.log(status)
        res.json({ success: true, status: status });
    }).catch(next);
})


app.get('/api/getAccountList', function (req, res, next) {
    return cc.transfer(req.body.contract, req.body.to, req.body.amount).then(function (status) {
        console.log(status)
        res.json({ success: true, status: status });
    }).catch(next);
})

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
