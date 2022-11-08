// web3 is Javascript type medium to communicate with blockchain and Smart Contracts
var web3; //will be responsible for connecting 
var address = "0x94Bbf76CE91b0b60b51dD278D1687894FF1eEbB4"; //when a smart contract deploy on remix then address we have used 

//connect with metamask
async function Connect(){
    await window.web3.currentProvider.enable();
    web3 = new Web3(window.web3.currentProvider); //inistailze web3
}

if(typeof web3!= 'undefined'){ //if web3 is not undefined the initialize
    web3 = new Web3(window.web3.currentProvider);
}
else{
    web3 = new Web3(new Web3.provider.HttpProvider("HTTP://127.0.0.1:7545"))//directly connecting with ganache environment
}

//use for to make connection of js code with solidity smart contract using EVM bytecode
var abi =[
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "amt",
				"type": "int256"
			}
		],
		"name": "deposite_money",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "amt",
				"type": "int256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
var contract = new web3.eth.Contract(abi, address);

function deposite(){
    var inputval = document.getElementById("amount").value;

    web3.eth.getAccounts().then(function(account){
        return contract.methods.deposite_money(inputval).send({from: account[0]});       
    }).then(function(tmp){
        $("#amount").val("");
        show_balance();
    }).catch(function(tmp){
        alert(tmp);
    })
}

function withdraw(){
    var inputval = document.getElementById("amount").value;

    web3.eth.getAccounts().then(function(account){
        return contract.methods.withdraw(inputval).send({from: account[0]});       

    }).then(function(tmp){
        $("#amount").val("");
        show_balance();
    }).catch(function(tmp){
        alert(tmp);
    })
}

function show_balance(){
    contract.methods.getBalance().call().then(function(balance){
        $("#balance").html(balance)
    })
}