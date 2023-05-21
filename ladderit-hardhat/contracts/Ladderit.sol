// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Ladderit {

    struct User {

        address client;
        string  name;
    }

    struct Task {
        string description;
    }

    mapping(uint256 => bool) private dailyTasks;

    event TaskCompleted (uint256 indexed taskID);

    mapping (address => User) public users;

    mapping (string => bool) public isTaken;

    event UserName (string indexed name);
    
    
    mapping(address => Task[]) public userTasks;

    function getUserName(string memory _name) public {
        User storage user = users[msg.sender];
        require(!isTaken[_name], "Name is already taken");
        user.name = _name;
        user.client = msg.sender;
        require(bytes(users[msg.sender].name).length > 0, "Name cannot be empty");
        isTaken[_name] = true;
        emit UserName(user.name);
    }
    
    function addTask(string memory _description) public {
        require(userTasks[msg.sender].length < 5, "Maximum task limit reached");
        Task memory newTask = Task(_description);
        userTasks[msg.sender].push(newTask);
    }

    function getTasks() public view returns (Task[] memory) {
        return userTasks[msg.sender];
    }
    
    function delTask(uint256 taskIndex) public {
        require(taskIndex < userTasks[msg.sender].length, "Invalid task index");
        
        userTasks[msg.sender][taskIndex] = userTasks[msg.sender][userTasks[msg.sender].length - 1];
        userTasks[msg.sender].pop();
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