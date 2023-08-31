import { useState, useEffect } from 'react';
import { Button, Image, Text, Tooltip } from '@chakra-ui/react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react';

const NetworkSwitcherIconOnly = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to keep track of whether the menu is open

  const switchNetwork = async (chainId) => {
    try {
      if (!window.ethereum) {
        throw new Error('Metamask not installed or not accessible.');
      }
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (currentChainId === chainId) {
        console.log('Already on the desired network.');
        return;
      }
      const isSupportedNetwork = await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x' + chainId.toString(16), // Use the chainId directly here
            chainName: chainId === 40 ? 'Telos Mainnet' : 'Telos Testnet', // Use the appropriate chain name
            nativeCurrency: {
              name: 'Telos',
              symbol: 'TLOS',
              decimals: 18,
            },
            rpcUrls: [
              'https://testnet.telos.net/evm',
              'https://mainnet.telos.net/evm' // RPC URL for Telos Mainnet (Chain ID 40)
               // RPC URL for Telos Testnet (Chain ID 41)
            ],
            blockExplorerUrls: [
              'https://testnet.telos.bloks.io/', // Block explorer URL for Telos Mainnet
              'https://telos.net' // Block explorer URL for Telos Testnet
            ],
          },
        ],
      });
  
      if (!isSupportedNetwork) {
        throw new Error('The network you are trying to switch to is not supported by Metamask.');
      }
  
      // Switch to the desired network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x' + chainId.toString(16) }], // Use the chainId directly here
      });
  
      console.log('Network switched successfully.');
    } catch (error) {
      console.error('Failed to switch network:', error);
    }
  };
  
  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleMainnetChange = async () => {
    setSelectedNetwork('Telos Mainnet');
  };

  const handleTestnetChange = async () => {
    setSelectedNetwork('Telos Testnet');
  };

  useEffect(() => {
    const handleNetworkSwitch = async () => {
      if (selectedNetwork === 'Telos Mainnet') {
        await switchNetwork(40);
      } else if (selectedNetwork === 'Telos Testnet') {
        await switchNetwork(41);
      }
    };

    if (selectedNetwork !== '') {
      handleNetworkSwitch();
    }
  }, [selectedNetwork]);

  return (
    <Menu onOpen={handleMenuOpen} onClose={handleMenuClose} >

      <Tooltip hasArrow label="Switch Network" bg="#c1cfd8" color="black">
        <MenuButton size={'auto'} bg={'transparent'} as={Button} __css={{ _hover: { boxShadow: 'none' } }}>
          <model-viewer 
            style={{
              width: '33px',
              height: '33px',
              marginTop: '-3px',
              backgroundColor: 'transparent',
            }}
            src="/telos.glb"
            poster="/telos.png"
            shadow-intensity="0.99" 
            auto-rotate={selectedNetwork === 'Telos Mainnet' ? true : false}
            shadow-softness="0.57"
          >
          </model-viewer>
        </MenuButton>
      </Tooltip>
      <MenuList zIndex={99999}>
        <MenuItem minH='48px' onClick={handleTestnetChange} zIndex={99999}>
          <Image boxSize='2rem' borderRadius='full' src='/telos.png' mr='6px' />
          <Text>Telos Testnet</Text>
        </MenuItem>
        <MenuItem minH='40px' onClick={handleMainnetChange} zIndex={99999}>
          <Image boxSize='2rem' borderRadius='full' src='/telos.png' mr='6px' />
          <Text>Telos Mainnet</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NetworkSwitcherIconOnly;