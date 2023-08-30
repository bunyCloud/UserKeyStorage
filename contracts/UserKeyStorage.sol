// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DTKeyStorage {
    
    struct UserKeyInfo {
        address userAddress;
        string usernname;
        string encryptedKey;
    }
    
    UserKeyInfo[] public userKeys;
    mapping(address => string) public userToKey;
    event UserAdded(address indexed userAddress,string username, string encryptedKey);
    
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
}
