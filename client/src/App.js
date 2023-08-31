import { Center, ChakraProvider, HStack, Image, Text } from '@chakra-ui/react'

import { useState } from 'react'
import HomepageLayout from './components/layout/HomepageLayout'

function App() {



  return (
    <ChakraProvider>
    
    {/*
    <Center>
    <Box w='auto' maxWidth={800}>
      <Center pt={1} pb={0} mb={-10} bg="ghostwhite" borderBottom='1px solid silver' >
      <HStack gap={'33px'}>
      <Image src={'./buny.png'} w={120}/>
        <Box fontSize={'small'}>
          <Text>{account && (<>{formatAddress(account)}</>)}</Text>
          <HStack>
            <Text>{wallet.balance}</Text>
            <WhatNetworkSymbol chainId={formatChainAsNum(wallet.chainId)} />
          </HStack>

          <HStack>
            <Text>{formatChainAsNum(wallet.chainId.toString())}</Text>
            <WhatNetworkName chainId={formatChainAsNum(wallet.chainId)} />
            <NetworkSwitcherIconOnly />
          </HStack>
          
          <HeaderConnect />
        </Box>
      </HStack>
      </Center>

      <Box p={10} mb={-30} >
      <Text>
        Public Encryption Key
      </Text>
        <FetchPublicEncryptionKey onPublicKey={handleEncryptionKey} />
      </Box>
      <Box p={10} mt={-15}>
      <Text>Contract</Text>
        <UserStorage publicKey={publicKey}  account={account} contractAddress={UseKeyStorage.address} abi={UseKeyStorage.abi} />
      </Box>
      <Box p={10} mt={-15}>
      <Text>User Directory</Text>
        <UserKeyTable account={account} contractAddress={UseKeyStorage.address} abi={UseKeyStorage.abi} />
      </Box>
      </Box>
      </Center>
    */}
    <HomepageLayout />
    </ChakraProvider>
  )
}

export default App
