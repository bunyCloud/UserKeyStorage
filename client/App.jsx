import { ChakraProvider } from '@chakra-ui/react';
import { ethers } from 'ethers';
import UserKeyStorage from './UserKeyStorage';

function App() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  return (
    <ChakraProvider>
      <Box p={5}>
        <UserKeyStorage provider={provider} contractAddress="YOUR_CONTRACT_ADDRESS_HERE" />
      </Box>
    </ChakraProvider>
  );
}

export default App;
