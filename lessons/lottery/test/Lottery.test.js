const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const {interface, bytecode} = require('../compile');
const web3 = new Web3(ganache.provider());
let accounts;
let lottery;
beforeEach(async () => {
  //get a list of all accounts
  accounts = await web3.eth.getAccounts()
  //use one of those accounts to deploy the contract
  lottery = await new web3.eth.Contract(JSON.parse(interface))
              .deploy({data:bytecode})
              .send({from:accounts[0], gas:'1000000'})
})

describe('lottery Contract:',()=>{
  it('deploy contract', ()=>{
    assert.ok(inbox.options.address)
  });
});
