const assert = require('assert')
const ganache = require('ganache-cli')
const {interface, bytecode} = require('../compile')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider());
let accounts;
let lottery;
beforeEach(async () => {
  //get a list of all accounts
  accounts = await web3.eth.getAccounts()
  //use one of those accounts to deploy the contract
  lottery = await new web3.eth.Contract(JSON.parse(interface)).deploy({data: bytecode}).send({from: accounts[0], gas: '1000000'})
})

describe('lottery Contract:', () => {

  it('deploy contract', () => {
    assert.ok(lottery.options.address)
  })

  it('allows one account to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('0.02', 'ether')
    });
    const players = await lottery.methods.getPlayers().call({from: accounts[1]});
    assert.equal(accounts[1], players[0]);
    assert.equal(1, players.length);
  });

  it('allows multiple accounts to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('0.02', 'ether')
    });
    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei('0.02', 'ether')
    });
    const players = await lottery.methods.getPlayers().call({from: accounts[1]});
    assert.equal(accounts[1], players[0]);
    assert.equal(accounts[2], players[1]);
    assert.equal(2, players.length);
  });

  it('minimum ether is required', async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[2],
        value: web3.utils.toWei('0', 'ether')
      });
      throw false;
    } catch (err) {
      assert(err);
    }
  });

  it('making sure manager can not participate', async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei('0.02', 'ether')
      })
      throw false;
    } catch(err){
      assert(err);
    }
  });


});
