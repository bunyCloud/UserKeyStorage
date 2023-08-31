import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  IconButton,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { UnlockIcon } from '@chakra-ui/icons';

function Decryptor({ encryptedMessage, onDecryptedText }) {
  const [decryptedText, setDecryptedText] = useState('');
  const [inputEncryptedMessage, setInputEncryptedMessage] = useState(encryptedMessage);
  const [error, setError] = useState('');
  const toast = useToast();

  const handleDecrypt = async () => {
    try {
      const ethereum = window.ethereum;
      const decryptedText = await ethereum.request({
        method: 'eth_decrypt',
        params: [inputEncryptedMessage, ethereum.selectedAddress],
      });
      setDecryptedText(decryptedText);
      onDecryptedText(decryptedText)
      setError('');

      // Toast notification for successful decryption
      toast({
        title: "Decryption Successful",
        description: "The message has been decrypted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <Box overflowX="auto"  p={1} fontSize={'small'} >

        <IconButton
  isRound={true}
  variant='solid'
  onClick={handleDecrypt}
  colorScheme='twitter'
  aria-label='Done'
  fontSize='20px'
  icon={<UnlockIcon/>}
/>
    </Box>
  );
}

export default Decryptor;
