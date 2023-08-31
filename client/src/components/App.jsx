import { ChakraProvider } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { Box } from '@chakra-ui/react';
import UserStorage from './UserStorage';
import UseKeyStorage from '../contracts/UserKeyStorage.json'

function App() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  return (
    <ChakraProvider>
      <Box p={5}>
        <UserStorage provider={provider} contractAddress={UseKeyStorage.address} abi={UseKeyStorage.abi} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
