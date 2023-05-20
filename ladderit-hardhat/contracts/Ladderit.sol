// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Ladderit {

    struct User {

        address client;
        string  name;
    }

    mapping(uint256 => bool) private dailyTasks;

    event TaskCompleted (uint256 indexed taskID);
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


    function completeTask (uint256 taskID) public {
        require(!dailyTasks[taskID], "Task already completed.");
        dailyTasks[taskID] = true;
        emit TaskCompleted(taskID);
    }

    function isTaskCompleted (uint256 taskID) public view returns(bool){
        return dailyTasks[taskID];
    }
}