import React, { useState } from 'react'
import { Layout, Space } from 'antd'
import { Box, Center, Flex, Grid, GridItem, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import { useMetaMask } from './hooks/useMetamask'
import UserStorage from './components/UserStorage'
import UserKeyStorage from './contracts/UserKeyStorage.json'
import FetchPublicEncryptionKey from './components/FetchPublicEncryptionKey'
import UserKeyTable from './components/UserKeyTable'
import NetworkSwitcherIconOnly from './components/NetworkSwitcherIconOnly'
import ViewMessages from './components/ViewMessages'
import ModelViewer from './components/ModelViewer'
import AddressMenu from './components/AddressMenu'
import { QuestionOutlineIcon } from '@chakra-ui/icons'
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton } from '@chakra-ui/react'

const { Header, Footer, Content } = Layout

function App() {
  const { wallet } = useMetaMask()
  const account = wallet.accounts[0]
  const [publicKey, setPublicKey] = useState()

  const handleEncryptionKey = (key) => {
    setPublicKey(key)
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout h="100%">
        <Header style={{ ...headerStyle, padding: ['0 0rem', '0 0rem'] }}>
          <Center pt={1}>
            <Flex wrap="wrap" justify="space-between" align="center" m="0 auto">
              <div></div>

              <Grid templateColumns="repeat(5, 1fr)" gap={18} w="100%" minWidth={360}>
                <GridItem colSpan={2}>
                  <HStack gap="auto" w={'auto'} h={14}>
                    {/*
                    <Image src="./buny-head.png" w={'50px'} mt={-2} />
                    */}
                    <model-viewer
                      style={{
                        width: '75px',
                        height: '75px',

                        backgroundColor: 'transparent',
                      }}
                      camera-orbit="calc(0rad + env(window-scroll-y) * 4rad)"
                      src="/buny-logo-2.glb"
                      ar
                      alt="Buny.cloud"></model-viewer>
                    <ModelViewer />
                  </HStack>
                </GridItem>
                <GridItem colStart={4} colEnd={6} h="auto" mt={-1}>
                  <VStack gap="auto" mt={1}>
                    <NetworkSwitcherIconOnly />
                    <AddressMenu account={account} balance={wallet.balance} />
                  </VStack>
                </GridItem>
              </Grid>
            </Flex>
          </Center>
        </Header>
        <Content style={contentStyle}>
          <Center mt={2} mb={2}>
            <Box w="100%" maxWidth={600} px={['1rem', '0']} p={2} m={4}>
              <Box p={1}>
                <Grid templateColumns="repeat(5, 1fr)" gap={4} bg="white">
                  <GridItem colSpan={2} h="10">
                    <Text p={2}>Contract</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={6} h="10"></GridItem>
                </Grid>

                <UserStorage publicKey={publicKey} account={account} contractAddress={UserKeyStorage.address} abi={UserKeyStorage.abi} />
              </Box>

              <Box p={1}>
                <Grid templateColumns="repeat(5, 1fr)" gap={4} bg="white">
                  <GridItem colSpan={2} h="10">
                    <Text p={2}>Public Key</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={6} h="10">
                    <Center>
                      <Popover isLazy>
                        <PopoverTrigger>
                          <IconButton variant="ghost" colorScheme="twitter" aria-label="Call Sage" fontSize="20px" icon={<QuestionOutlineIcon />} />
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverHeader fontWeight="semibold">Public Encryption Key</PopoverHeader>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverBody fontSize={'small'}>
                            Requests that the user share their public encryption key. Returns a public encryption key, or rejects if the user denies the
                            request. The public key is computed using the NaCl implementation of the X25519_XSalsa20_Poly1305 algorithm.
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </Center>
                  </GridItem>
                </Grid>

                <FetchPublicEncryptionKey onPublicKey={handleEncryptionKey} />
              </Box>

              <Box p={1}>
                <Grid templateColumns="repeat(5, 1fr)" gap={4} bg="white">
                  <GridItem colSpan={2} h="10">
                    <Text p={2}>User Directory</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={6} h="10">
                    <Center>
                      <Popover isLazy>
                        <PopoverTrigger>
                          <IconButton variant="ghost" colorScheme="twitter" aria-label="Call Sage" fontSize="20px" icon={<QuestionOutlineIcon />} />
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverHeader fontWeight="semibold">User Directory</PopoverHeader>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverBody fontSize={'small'}>
                            SmartContract directory of usernames and their corresponding wallet address and public encryption key. Click a username to send an
                            encrypted message.
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </Center>
                  </GridItem>
                </Grid>
                <UserKeyTable account={account} contractAddress={UserKeyStorage.address} abi={UserKeyStorage.abi} />
              </Box>

              <Box p={1}>
                <Grid templateColumns="repeat(5, 1fr)" gap={4} bg="white">
                  <GridItem colSpan={2} h="10">
                    <Text p={2}>View Messages</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={6} h="10">
                    <Center>
                      <Popover isLazy>
                        <PopoverTrigger>
                          <IconButton variant="ghost" colorScheme="twitter" aria-label="Call Sage" fontSize="20px" icon={<QuestionOutlineIcon />} />
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverHeader fontWeight="semibold">Messages</PopoverHeader>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverBody fontSize={'small'}>
                            <Text>All encrypted messages sent to connected account are displayed here.</Text>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </Center>
                  </GridItem>
                </Grid>
                <ViewMessages account={account} />
              </Box>
            </Box>
          </Center>
        </Content>
        <Footer style={footerStyle}>Experimental Dapp for educational use only.</Footer>
      </Layout>
    </Space>
  )
}

const headerStyle = {
  color: 'black',
  //height: 'auto',
  lineHeight: '12px',
  position: 'fixed',
  zIndex: 9999,
  borderBottom: '2px solid #6a14fc',
  width: '100%',
  backgroundColor: 'white',
}

const contentStyle = {
  lineHeight: '23px',
  marginTop: '40px',
  color: 'black',
  padding: '12px',
  backgroundColor: '#6a14fc',
}

const footerStyle = {
  textAlign: 'center',
  color: 'black',
  height: '10px',
  backgroundColor: 'white',
}

export default App
