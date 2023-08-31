import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast
} from '@chakra-ui/react';

function UserKeyTable({contractAddress, abi }) {
  const [users, setUsers] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider('https://testnet.telos.net/evm')

    async function fetchUsers() {
      if (!provider) {
        toast({
          title: "Error",
          description: "Ethereum provider not found",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      const contract = new ethers.Contract(contractAddress, abi, provider);

      try {
        const [addresses, usernames, encryptedKeys] = await contract.getAllUsers();
        const userList = addresses.map((address, index) => ({
          address,
          username: usernames[index],
          encryptedKey: encryptedKeys[index]
        }));
        setUsers(userList);
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }

    fetchUsers();
  }, [ contractAddress, abi, toast]);

  return (
    <Box overflowX="auto" bg='ghostwhite' p={1} fontSize={'small'} border='0.5px solid silver'>
      <Table size={'sm'} variant="simple">
        <Thead>
          <Tr>
          <Th>Username</Th>
            <Th>User Address</Th>
            
            <Th>Encrypted Key</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, index) => (
            <Tr key={index}>
            <Td>{user.username}</Td>
              <Td>{user.address}</Td>
              <Td>{user.encryptedKey}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default UserKeyTable;
