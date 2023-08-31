import React, { useState } from 'react';
import { Layout, Space } from 'antd';
import { Box, Center, Flex, HStack, Image, Text } from '@chakra-ui/react';
import { useMetaMask } from './hooks/useMetamask';
import UserStorage from './components/UserStorage';
import UseKeyStorage from './contracts/UserKeyStorage.json';
import FetchPublicEncryptionKey from './components/FetchPublicEncryptionKey';
import { HeaderConnect } from './components/HeaderConnect';
import { formatAddress, formatChainAsNum } from './utils/formatMetamask';
import WhatNetworkName from './utils/WhatNetworkName';
import WhatNetworkSymbol from './utils/WhatNetworkSymbol';
import UserKeyTable from './components/UserKeyTable';
import NetworkSwitcherIconOnly from './components/NetworkSwitcherIconOnly';
import WriteMessage from './components/WriteMessage';
import ViewMessages from './components/ViewMessages';

const { Header, Footer, Content } = Layout;

function App() {
  const { wallet } = useMetaMask();
  const account = wallet.accounts[0];
  const [publicKey, setPublicKey] = useState();

  const handleEncryptionKey = (key) => {
    setPublicKey(key);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout h="100%">
        <Header style={{ ...headerStyle, padding: ['0 1rem', '0 2rem'] }}>
          <Center pt={1}>
            <Flex wrap="wrap" justify="space-between" align="center" maxWidth={1200} m="0 auto">
              <Image src="./buny.png" w={120} mt={-2} />
              <Box fontSize="small" p={2}>
                <Text>{account && formatAddress(account)}</Text>
                <HStack>
                  <Text>{wallet.balance} |</Text>
                  <WhatNetworkSymbol chainId={formatChainAsNum(wallet.chainId)} />
                </HStack>
                <HStack mt={-1}>
                  <Text>({formatChainAsNum(wallet.chainId.toString())})</Text>
                  <WhatNetworkName chainId={formatChainAsNum(wallet.chainId)} />
                  <NetworkSwitcherIconOnly />
                </HStack>
                <HeaderConnect />
              </Box>
            </Flex>
          </Center>
        </Header>
        <Content style={contentStyle}>
          <Center mt={2} mb={2}>
            <Box w="100%" maxWidth={800} px={['1rem', '0']}>
              <Box p={1}>
                <Text p={1} w="100%" bg="white">
                  Public Encryption Key
                </Text>
                <FetchPublicEncryptionKey onPublicKey={handleEncryptionKey} />
              </Box>
              <Box p={1}>
                <Text p={1} w="100%" bg="white" mb={-2}>
                  Contract
                </Text>
                <UserStorage publicKey={publicKey} account={account} contractAddress={UseKeyStorage.address} abi={UseKeyStorage.abi} />
              </Box>
              <Box p={1}>
                <Text p={1} w="100%" bg="white">
                  User Directory
                </Text>
                <UserKeyTable account={account} contractAddress={UseKeyStorage.address} abi={UseKeyStorage.abi} />
              </Box>
            
                <Box p={1}>
                <Text p={1} w="100%" bg="white">
                  View Messages
                </Text>
                <ViewMessages account={account} />
                </Box>
            </Box>
          </Center>
        </Content>
        <Footer style={footerStyle}>Experimental Dapp for educational use only.</Footer>
      </Layout>
    </Space>
  );
}

const headerStyle = {
  color: 'black',
  height: 'auto',
  lineHeight: '20px',
  position: 'fixed',
  zIndex: 9999,
  borderBottom: '1px solid #6a14fc',
  width: '100%',
  backgroundColor: 'white',
};

const contentStyle = {
  lineHeight: '23px',
  marginTop: '80px',
  color: 'black',
  backgroundColor: '#6a14fc',
};

const footerStyle = {
  textAlign: 'center',
  color: 'black',
  height: '20px',
  backgroundColor: 'white',
};

export default App;
