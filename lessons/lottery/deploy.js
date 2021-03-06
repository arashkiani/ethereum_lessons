const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3');
const {interface, bytecode} = require('./compile')
const secrets = require("./secrets.json");

const provider = new HDWalletProvider(
  secrets.mnemonic,
  'https://rinkeby.infura.io/' + secrets.infura
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  //const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({data: bytecode, arguments: ['HI there!']}).send({gas: '1000000', from: accounts[0]});
  //console.log(result.options.address);
}

deploy();
