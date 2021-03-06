pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] private players;
    address public winner;
    uint public total;

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value >= .001 ether && manager!=msg.sender);
        total = total+msg.value;
        players.push(msg.sender);
    }
    function pickwinner() public restricted {
        uint index = random();
        winner = players[index];
        winner.transfer(this.balance);
        players = new address[](0);
    }
    function random() private view returns(uint){
        return uint(keccak256(block.difficulty, now, players))%players.length;
    }
    modifier restricted(){
        require(msg.sender==manager);
        _;
    }

    function getPlayers() public view returns(address[]){
        return players;
    }
}
