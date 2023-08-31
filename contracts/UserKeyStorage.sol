// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserKeyStorage {
    
    struct UserKeyInfo {
        address userAddress;
        string username;
        string encryptedKey;
    }
    
    UserKeyInfo[] public userKeys;
    mapping(address => string) public userToKey;
    mapping(address => string[]) public userMessages; // Mapping to store messages for a specific userAddress
    
    event UserAdded(address indexed userAddress, string username, string encryptedKey);
    event MessageAdded(address indexed userAddress, string message); // Event to log the addition of a new message
    
    function addWallet(address _userAddress, string memory _username, string memory _encryptedKey) public {
        require(bytes(userToKey[_userAddress]).length == 0, "User already exists");
        userKeys.push(UserKeyInfo(_userAddress, _username, _encryptedKey));
        userToKey[_userAddress] = _encryptedKey;
        emit UserAdded(_userAddress, _username, _encryptedKey); 
    }

    function getUserInfo(address _userAddress) public view returns (UserKeyInfo memory) {
        for (uint256 i = 0; i < userKeys.length; i++) {
            if (userKeys[i].userAddress == _userAddress) {
                return userKeys[i];
            }
        }
        revert("User not found");
    }

    function getEncryptedKey(address _userAddress) public view returns (string memory) {
        return userToKey[_userAddress];
    }
    
    function getTotalUsers() public view returns (uint256) {
        return userKeys.length;
    }

    function getAllUsers() public view returns (address[] memory, string[] memory, string[] memory) {
        address[] memory addresses = new address[](userKeys.length);
        string[] memory usernames = new string[](userKeys.length);
        string[] memory encryptedKeys = new string[](userKeys.length);

        for (uint256 i = 0; i < userKeys.length; i++) {
            addresses[i] = userKeys[i].userAddress;
            usernames[i] = userKeys[i].username;
            encryptedKeys[i] = userKeys[i].encryptedKey;
        }

        return (addresses, usernames, encryptedKeys);
    }

    // Function to add a message for a specific userAddress
    function addMessage(address _userAddress, string memory _message) public {
        require(bytes(userToKey[_userAddress]).length != 0, "User not found");
        userMessages[_userAddress].push(_message);
        emit MessageAdded(_userAddress, _message);
    }

    // Function to retrieve all messages for a specific userAddress
    function getMessages(address _userAddress) public view returns (string[] memory) {
        return userMessages[_userAddress];
    }
}
