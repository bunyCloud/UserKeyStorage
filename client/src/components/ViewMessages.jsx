import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { Box, Text, Center, Grid, GridItem, List, ListItem, useToast, FormControl, FormLabel, HStack } from '@chakra-ui/react'
import UserKeyStorage from '../contracts/UserKeyStorage.json'
import Decryptor from './Decryptor'

function ViewMessages({account}) {
  const [decryptedText, setDecryptedText] = useState('')
  const [messages, setMessages] = useState([])
  const toast = useToast()
  const contractAddress = UserKeyStorage.address
  const contractABI = UserKeyStorage.abi

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(contractAddress, contractABI, signer)

  useEffect(() => {
    async function fetchMessages() {
      try {
        const fetchedMessages = await contract.getMessages(account)
        setMessages(fetchedMessages)
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }

    fetchMessages()
  }, [account, contract, toast])

  return (
    <Box overflowX="auto" bg="ghostwhite" p={4} fontSize={'small'} border="0.5px solid silver">
      <FormControl>
        <HStack>
        <Text as='b'>
        Viewing Message for Account:
        </Text>
        <Text bg='white' p={1} noOfLines={2} overflow={'auto'} border='0.5px solid silver'>
          {account}
        </Text>
        </HStack>
      </FormControl>

      {messages.length > 0 && (
        <Box mt={4} mb={2}>
          <List spacing={3}>
            {messages.map((message, index) => (
              <ListItem key={index}  >
                <Grid h="auto" templateRows="repeat(1, 1fr)" templateColumns="repeat(5, 1fr)" gap={'auto'} bg='white' border='0.5px solid silver' pb={-2}>
                  <GridItem colSpan={4} >
                    <Text noOfLines={1} ml={2} mt={2} overflow={'auto'} p={1} bg="white" mb={-1}>
                      {message}
                    </Text>
                    <Text ml={2} noOfLines={1} overflow={'auto'} p={2} bg="yellow" w='100%' mb={1}>
                  {decryptedText && (
                    <>
                      <p>Decrypted: {decryptedText}</p>
                    </>
                  )}
                </Text>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1}>
                  <Center>
                  <Box mt={1}>
                    <Decryptor encryptedMessage={message} onDecryptedText={setDecryptedText} />
                    </Box>
                  </Center>
                  </GridItem>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  )
}

export default ViewMessages
