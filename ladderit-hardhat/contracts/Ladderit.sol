// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Ladderit {

    struct User {

        address client;
        string  name;
    }

    mapping (address => User) public users;

    event UserName (string indexed name);

    function getUserName(string memory _name) public {
        require(bytes(users[msg.sender].name).length == 0, "User already registered");
        User storage user = users[msg.sender];
        user.name = _name;
        user.client = msg.sender;
        emit UserName(user.name);
    }

    function updateUserName(string memory _name) public {
        require(bytes(users[msg.sender].name).length > 0 );
        User storage user = users[msg.sender];
        user.name = _name;
        user.client = msg.sender;
        emit UserName(user.name);
    }
}