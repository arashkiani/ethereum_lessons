const assert = require('assert')
const ganache = require('ganache-cli')
const {interface, bytecode} = require('../compile')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider());
let accounts;
let inbox;
beforeEach(async () => {
  //get a list of all accounts
  accounts = await web3.eth.getAccounts();
  //use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
              .deploy({data:bytecode, arguments:['Hi']})
              .send({from:accounts[0], gas:'1000000'});
})
describe('Inbox',()=>{
  it('deploy contract', ()=>{
    assert.ok(inbox.options.address)
  });
  it('contract has a default message', async ()=>{
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi')
  });
  it('change default message using setMessage', async ()=>{
    await inbox.methods.setMessage('bye').send({from: accounts[0]});
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye')
  });
});


/*
How Mocha works:

class Car {
  park() {
    return 'stopped'
  }
  drive() {
    return 'vroom'
  }
}
let car;
beforeEach(() => {
  car = new Car();
})
describe('Car Class', () => {
  it('park function return string', () => {
    assert.equal(car.park(), 'stopped')
  })
  it('drive function return string', () => {
    assert.equal(car.drive(), 'vroom')
  })
})*/
