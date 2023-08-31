import React, {useState} from 'react';
import { Layout, Space } from 'antd';
import { Box } from '@chakra-ui/react'
import { useMetaMask } from '../../hooks/useMetamask'
import { Center, HStack, Image, Text } from '@chakra-ui/react'
import UserStorage from '../UserStorage'
import UseKeyStorage from '../../contracts/UserKeyStorage.json'
import FetchPublicEncryptionKey from '../FetchPublicEncryptionKey'
import { HeaderConnect } from '../HeaderConnect'
import { formatAddress, formatChainAsNum } from '../../utils/formatMetamask'
import WhatNetworkName from '../../utils/WhatNetworkName'
import WhatNetworkSymbol from '../../utils/WhatNetworkSymbol'
import UserKeyTable from '../UserKeyTable'
import NetworkSwitcherIconOnly from '../NetworkSwitcherIconOnly'

const { Header, Footer, Content } = Layout;


const headerStyle = {
  //textAlign: 'center',
  color: 'black',
  height: 'auto',
  //paddingInline: 50,
  lineHeight: '20px',
  position:'fixed',
  zIndex: 9999,
  //borderBottom:'1px solid silver',
  width: '100%',
  backgroundColor: 'white',
};


const contentStyle = {
    //textAlign: 'center',
    //minHeight: 120,
    lineHeight: '23px',
    marginTop: '80px',
    color: 'black',
    backgroundColor: '#6a14fc',
  };

  const footerStyle = {
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'white',
  };

  function HomepageLayout(){

    const { wallet } = useMetaMask()
    const account = wallet.accounts[0]
    const [publicKey, setPublicKey] = useState();

    const handleEncryptionKey = (key) => {
      setPublicKey(key)
      // Do something with the key
    };
  

return (
    <>
        <Space
direction="vertical"
style={{
  width: '100%',
}}
size={[0, 48]}
>
<Layout h='100%'>
<Header style={headerStyle}>
<Center pt={1}   >
      <HStack gap={'13px'}>
      <Image src={'./buny.png'} w={120} mt={-2}/>
        <Box fontSize={'small'} p={2}>
          <Text>{account && (<>{formatAddress(account)}</>)}</Text>
          <HStack>
            <Text>{wallet.balance}</Text>
            <WhatNetworkSymbol chainId={formatChainAsNum(wallet.chainId)} />
          </HStack>

          <HStack mt={-1}>
            <Text>{formatChainAsNum(wallet.chainId.toString())}</Text>
            <WhatNetworkName chainId={formatChainAsNum(wallet.chainId)} />
            <NetworkSwitcherIconOnly />
          </HStack>
          
          <HeaderConnect />
        </Box>
      </HStack>
      </Center>
</Header>
<Content style={contentStyle}>  <Center mt={2} mb={2}>
    <Box w='auto' maxWidth={800}  >
    
      <Box p={1} >
      <Text p={1} w='100%' bg='white'>
        Public Encryption Key
      </Text>
        <FetchPublicEncryptionKey onPublicKey={handleEncryptionKey} />
      </Box>

      <Box p={1} >
      <Text p={1} w='100%' bg='white' mb={-2}>Contract</Text>
        <UserStorage publicKey={publicKey}  account={account} contractAddress={UseKeyStorage.address} abi={UseKeyStorage.abi} />
      </Box>
      
      <Box p={1} >
      <Text p={1} w='100%' bg='white'>User Directory</Text>
        <UserKeyTable account={account} contractAddress={UseKeyStorage.address} abi={UseKeyStorage.abi} />
      </Box>
      
      </Box>
      </Center></Content>
<Footer style={footerStyle}>Footer</Footer>
</Layout>
</Space>
    </>
)
  }

export default HomepageLayout