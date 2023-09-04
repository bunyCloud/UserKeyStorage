import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { Box, Text, Center, List, ListItem, useToast, FormControl, HStack, Tag } from '@chakra-ui/react'
import UserKeyStorage from '../contracts/UserKeyStorage.json'
import Decryptor from './Decryptor'
import { formatAddress } from './../utils/formatMetamask'

function ViewMessages({ account }) {
  const [decryptedText, setDecryptedText] = useState([])
  const [msgIds, setMsgIds] = useState([]);
const [messageContents, setMessageContents] = useState([]);

  const toast = useToast()
  const contractAddress = UserKeyStorage.address
  const contractABI = UserKeyStorage.abi

  useEffect(() => {
    async function fetchMessages() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractABI, signer)
      try {
        const [fetchedMessageIDs, fetchedMessages] = await contract.getMessages(account);
setMsgIds(fetchedMessageIDs);
setMessageContents(fetchedMessages);

      } catch (error) {
       console.log('errors not tears')
      }
    }

    fetchMessages()
  }, [account, contractABI, contractAddress, toast])

  function handleDecryptedText(index, decryptedMessage) {
    setDecryptedText((prev) => {
      const updatedTexts = [...prev]
      updatedTexts[index] = decryptedMessage
      return updatedTexts
    })
  }
  return (
    <Box overflowX="auto" w='auto' bg="ghostwhite" p={4} fontSize={'small'} border="0.5px solid silver">
      <FormControl>
        <HStack>
          <Text as="b">Viewing Message for Account:</Text>
          <Text bg="white" p={1} noOfLines={2} overflow={'auto'} border="0.5px solid silver">
            {account && <>{formatAddress(account)}</>}
          </Text>
        </HStack>
      </FormControl>

      {messageContents.length > 0 && (
  <Box mt={4} mb={2}>
    <List spacing={3} w='100%'>
      {messageContents.map((message, index) => (
        <ListItem key={index} border='0.5px solid silver'>
          <Center>
            <Text noOfLines={1}>
              {message && (
                <>
                
                <HStack gap='6px' p={1} mb={2} border='1px solid silver' bg='white' w='100%'>
                <Tag variant={'outline'} colorScheme='blackAlpha' size={'sm'}>
                  <Text>
                   # {msgIds.toString()}
                  </Text>
                </Tag>
                <Center>
                
                  {!decryptedText[index] ? (
                    <>
                      <Text  w={'auto'} p={2}>**************************************</Text>
                    </>
                  ) : (
                    <>
                      
                        <Text  noOfLines={1} overflow={'auto'} p={1} bg="yellow" w={260} mb={1}>
                          {decryptedText[index] && <p>{decryptedText[index]}</p>}
                        </Text>
                      
                    </>
                  )}
                  <Decryptor encryptedMessage={message} onDecryptedText={(decryptedMessage) => handleDecryptedText(index, decryptedMessage)} />
                </Center>
                </HStack>
                </>
              )}
            </Text>
          </Center>
        </ListItem>
      ))}
    </List>
  </Box>
)}

    </Box>
  )
}

export default ViewMessages
