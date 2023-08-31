import React, { useState } from 'react'
import { ethers } from 'ethers'
import { Box, Button, Input, FormControl, FormLabel, VStack, useToast, Text, HStack } from '@chakra-ui/react'

function UserStorage({publicKey, account, contractAddress, abi }) {
  
  const userAddress = account;
  const [username, setUsername] = useState('')
  const toast = useToast()


  const addUser = async () => {
    try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    const contractWithSigner = contract.connect(signer)
    const result = await contractWithSigner.addWallet(userAddress, username, publicKey)
    console.log(result)
    toast({
      title: 'Transaction successful',
      description: `User added Successfully minted! Reload page to continue. Transaction hash: ${result.hash}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  } catch (error) {
    toast({
      title: 'Transaction failed',
      description: error.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }}




  return (
    <VStack spacing={4}>
      <Box bg='ghostwhite' w="100%" mt={2} p={4} border='0.5px solid silver'>
      <Box  p={4} border='0.5px solid silver' bg='white'>
        <Text fontSize={'small'}>Network: Telos Testnet</Text>
        <HStack>
        <Text fontSize={'small'}>Contract: User Storage</Text>
        <Button variant={'link'} size={'sm'} colorScheme='twitter' href={`https://testnet.teloscan.io/address/${contractAddress}`}>View on Explorer</Button>
        </HStack>
        </Box>
        {publicKey && (
          <>
          {/*
        <FormControl>
          <FormLabel>User Address</FormLabel>
          <Text border='0.5px solid silver' p={2} fontSize={'small'} w='100%' bg='ghostwhite'>
            {account}
          </Text>
    
        </FormControl>
        <FormControl>
          <FormLabel>Encrypted Key</FormLabel>
          <Text border='0.5px solid silver' p={2} fontSize={'small'} w='100%' bg='ghostwhite'>
            {publicKey}
          </Text>
          </FormControl>
        */}
        
        <FormControl mt={2} p={2}>
          <Text>Create a username to add your account to directory listing.</Text>
          <Input bg="white" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        
          <Button mt={1} w="100%" colorScheme="twitter" onClick={addUser}>
          Add Wallet
        </Button>
      </>
        )}
        
     
      </Box>
    </VStack>
  )
}

export default UserStorage
