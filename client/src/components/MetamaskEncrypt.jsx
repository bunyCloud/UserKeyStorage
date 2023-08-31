import {
  Box,
  Button,
  Input,
  HStack,
  Text,
  Center,
  Wrap,
  useClipboard,
  WrapItem,
  VStack,
  useToast,
  IconButton,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useMetaMask } from '../../hooks/useMetamask';
import axios from 'axios';
import { CopyIcon } from '@chakra-ui/icons';

function MetamaskEncrypt() {
  const { wallet, hasProvider, isConnecting, connectMetaMask, clearError } =
    useMetaMask();
  const [encryptionKey, setEncryptionKey] = useState('');
  const [fetchedAccounts, setFetchedAccounts] = useState([]);
  const [error, setError] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [cleartext, setCleartext] = useState('');
  const { onCopy, hasCopied } = useClipboard(encryptedMessage);
  const [decryptedText, setDecryptedText] = useState();
  const [inputEncryptedMessage, setInputEncryptedMessage] = useState('');
  const [inputAddress, setInputAddress] = useState(fetchedAccounts[0]);

  const toast = useToast();

  const handleCopyClick = () => {
    onCopy();
    if (hasCopied) {
      toast({
        title: 'Text Copied',
        description: 'The text has been copied to the clipboard.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const ethereum = window.ethereum;

        if (!ethereum) {
          throw new Error('MetaMask not detected');
        }

        const enabledAccounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        setFetchedAccounts(enabledAccounts);
        setError('');
        //  onAccountsFetched(enabledAccounts); // Pass the accounts to the parent component
      } catch (err) {
        setError('An error occurred while fetching accounts');
        console.error(err);
      }
    }

    fetchAccounts();
  }, []);

  // Request public encryption key for connected wallet
  const handleRequestKey = async () => {
    const ethereum = window.ethereum;
    const response = await ethereum.request({
      method: 'eth_getEncryptionPublicKey',
      params: [fetchedAccounts[0]],
    });
    setEncryptionKey(response);
  };

  // handle encryption
  const handleEncryption = async () => {
    try {
      const response = await axios.post('http://localhost:5000/encrypt', {
        encryptionKey,
        cleartext,
      });
      setEncryptedMessage(response.data.encryptedMessage);
    } catch (error) {
      console.error('Error encrypting message:', error);
    }
  };

  const handleDecrypt = async () => {
    try {
      const ethereum = window.ethereum;
      const decryptedText = await ethereum.request({
        method: 'eth_decrypt',
        params: [encryptedMessage, ethereum.selectedAddress],
      });
      setDecryptedText(decryptedText);
      setError('');
    } catch (error) {
      setCleartext('');
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <>
      
      <Center>
      <Text fontSize="xl" fontWeight="bold">
            Metamask: Encrypt/Decrypt
          </Text>
      </Center>
      <Wrap spacing={4} justify="center" h="100%">
          
          <Box mb={4} bg="white" border="1px solid silver" p={8}>
            <HStack>
                <WrapItem w="200px" h="300px" border="1px solid silver">

                <VStack w="100%">
                  <Box mt={2} mb={2} p={4} w="100%" bg="white">
                    <Text as="b">Fetch my Public Encryption Key</Text>
                    <Button
                      mt={1}
                      w="100%"
                      colorScheme="twitter"
                      size="xs"
                      onClick={handleRequestKey}
                    >
                      Request
                    </Button>

                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    {encryptionKey && (
                      <div>
                        <Text mt={2} bg="ghostwhite" fontSize={'12px'} p={2}>
                          <p>My Encryption Key:</p>
                          <code>{encryptionKey.toString()}</code>
                        </Text>
                      </div>
                    )}
                  </Box>
                </VStack>
              </WrapItem>



                <WrapItem w="200px" h="300px" border="1px solid silver">

                <Center>
                  <Box mt={2} mb={2} p={4} w="100%" bg="white">
                    <Text as="b">Message to Encrypt</Text>
                    <Input
                      value={cleartext}
                      variant={'filled'}
                      onChange={(e) => setCleartext(e.target.value)}
                      placeholder="Enter text to encrypt"
                      mb={2}
                      size={'xs'}
                    />
                    <Text as="b">Public Encryption Key</Text>
                    <Input
                      variant={'filled'}
                      value={encryptionKey}
                      onChange={(e) => setEncryptionKey(e.target.value)}
                      placeholder="Enter encryption key"
                      mb={2}
                      size={'xs'}
                    />
                    <Button
                      size="xs"
                      w="100%"
                      colorScheme="twitter"
                      onClick={handleEncryption}
                    >
                      Encrypt
                    </Button>
                  </Box>
                </Center>
              </WrapItem>
              {encryptedMessage && (
                <>
                    <WrapItem w="200px" h="300px" border="1px solid silver">

                    <Center>
                      <Box
                        mt={2}
                        mb={2}
                        p={4}
                        w="100%"
                        bg="white"
                      >
                        <HStack>
                        <Text as="b">Encrypted</Text>  <div>
                          <IconButton
        icon={<CopyIcon />}
        size={'sm'}
        variant={'unstyled'}
        aria-label="Copy text"
        onClick={handleCopyClick}
        ml={2}
      >
        {hasCopied ? 'Copied' : 'Copy'}
      </IconButton>
                          </div>
                        </HStack>
                        <div style={{ marginTop: '5px' }}>
                          <Text
                            noOfLines={8}
                            w={160}
                            
                            bg='ghostwhite'
                            overflow={'auto'}
                            mb={2}
                          >
                          <div>  {encryptedMessage}</div>
                       
                          
                        
                          </Text>
                         
                        </div>
                      </Box>
                    </Center>
                  </WrapItem>
                </>
              )}

                <WrapItem w="200px" h="300px" border="1px solid silver">

                <Box mt={2} mb={2} p={4} w="100%" maxWidth={600} bg="white">
                  <div>
                    <Text as="b">Decrypt Message</Text>
                    <Input
                      value={inputEncryptedMessage}
                      onChange={(e) => setInputEncryptedMessage(e.target.value)}
                      placeholder="Enter encrypted message"
                      mb={2}
                      size={'xs'}
                      variant={'filled'}
                    />
                    <Button
                      w={'100%'}
                      colorScheme="twitter"
                      size={'xs'}
                      onClick={handleDecrypt}
                    >
                      Decrypt
                    </Button>
                    <div>
                      {decryptedText && (
                        <>
                          <p>Decrypted: {decryptedText}</p>
                        </>
                      )}
                      <p> {error && <>Error:{error}</>}</p>
                    </div>
                  </div>
                </Box>
              </WrapItem>
            </HStack>
          </Box>
        </Wrap>
      </>
  );
}

export default MetamaskEncrypt;
