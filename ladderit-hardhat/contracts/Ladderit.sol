// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IMyNFT {
    function balanceOf(address owner) external view returns (uint256);
    function mint() external;
}

interface IMyCoin {
    function coinMint(uint256 amount) external;
}

contract Ladderit {
    IMyNFT nftContract;
    IMyCoin coinContract;

    struct User {
        address client;
        string name;
        string[] tasks;
    }

    mapping(uint256 => bool) dailyTasks;
    mapping(address => User) public users;
    mapping(string => bool) public isTaken;
    mapping(uint256 => uint256) public countTaskCompleted;
    mapping(address => uint256) public dailyTaskLimit;
    uint256 dailyLimit = 1;

    event TaskCompleted(uint256 indexed taskID);
    event UserName(string indexed name);

    constructor(address _nftContract, address _coinContract) {
        nftContract = IMyNFT(_nftContract);
        coinContract = IMyCoin(_coinContract);
    }

    function addTask(string calldata _task) external {
        require(
            msg.sender == users[msg.sender].client,
            "You have to register first"
        );
        User storage user = users[msg.sender];
        require(
            users[msg.sender].tasks.length < 5,
            "Maximum task limit reached"
        );
        user.tasks.push(_task);
    }

    function getTasks(address user) external view returns (string[] memory) {
        return users[user].tasks;
    }

    function getUserName(address user) external view returns (string memory) {
        return users[user].name;
    }

    function delTask(uint256 taskIndex) external returns (string memory) {
        User storage user = users[msg.sender];
        require(taskIndex < user.tasks.length, "Invalid task index");
        require(user.client == msg.sender, "You are not allowed");
        string memory selectedTask = user.tasks[taskIndex];
        for(uint i = taskIndex; i < user.tasks.length - 1; i++) {
            user.tasks[i] = user.tasks[i+1];
        }
        user.tasks.pop();
        return selectedTask;
    }

    /**
     * @notice Adds the name of the newly registered person
     * @dev Cannot register with a previously saved name
     * @param _name name of the user
     */
    function setUsername(string calldata _name) external {
        User storage user = users[msg.sender];
        require(!isTaken[_name], "Name is already taken");
        user.name = _name;
        user.client = msg.sender;
        require(
            bytes(users[msg.sender].name).length > 0,
            "Name cannot be empty"
        );
        isTaken[_name] = true;

        emit UserName(user.name);
    }

    /**
     * @notice Update the name of the registered user
     * @dev You need to be registered to use. You cannot take a name that has been taken.
     * @param _name name of the user
     */
    function updateUserName(string calldata _name) external {
        User storage user = users[msg.sender];
        isTaken[user.name] = false;
        require(!isTaken[_name], "Name is already taken");
        require(bytes(user.name).length > 0, "You are not registered");
        user.name = _name;
        user.client = msg.sender;
        require(
            bytes(users[msg.sender].name).length > 0,
            "Name cannot be empty"
        );
        isTaken[_name] = true;
        emit UserName(user.name);
    }

    /**
     * @notice make task completed
     * @param taskID is the ID of task that allows us to understand which task we are going to complete.
     * @dev The task is limited to be performed only once per day, which is enforced by the 'dailyLimit'.
     * The condition of whether the task has been completed or not can be checked using the 'dailyTaskLimit' mapping.
     * After completing the task, the value becomes 1. To track how many times the task has been completed, the 'countTaskCompleted' mapping is used.
     * The value increases by 1 each time the task is completed. When this value reaches 3, the person who completed the task becomes eligible to receive a Bronze NFT.
     * When this value reaches 5, the person who completed the task becomes eligible to receive a Silver NFT.
     */
    function completeTask(uint256 taskID) external {
        require(
            dailyTaskLimit[msg.sender] < dailyLimit,
            "You have completed your task today."
        );
        dailyTasks[taskID] = true;
        dailyTaskLimit[msg.sender]++;
        countTaskCompleted[taskID]++;
        emit TaskCompleted(taskID);
        if (countTaskCompleted[taskID] == 1) {
            earnBronzeNFT();
        }
        if (countTaskCompleted[taskID] == 5) {
            earnSilverNFT();
        }
        if (countTaskCompleted[taskID] == 7) {
            earnGoldNFT();
        }
    }

    /**
     * @notice It checks whether the task has been completed or not.
     * @dev To be able to check if the task has been completed daily, it is assigned to dailyTaskLimit because when the dailyTaskLimit is 1,
     *  it means that the task has been completed for that day. By using the 'if' keyword, if the value is 1, it returns true; otherwise, it returns false.
     */
    function isTaskCompleted() external view returns (bool) {
        return dailyTaskLimit[msg.sender] == 1;
    }

    function resetDailyLimit() external {
        dailyTaskLimit[msg.sender] = 0;
    }

    function earnBronzeNFT() private {
        nftContract.mint();
        coinContract.coinMint(10);
    }

    function earnSilverNFT() private {
        nftContract.mint();
        coinContract.coinMint(20);
    } 


    function earnGoldNFT() private {
        nftContract.mint();
        coinContract.coinMint(30);
    }

    function balanceOf(address account) external view returns (uint256) {
        return nftContract.balanceOf(account);
    }
}