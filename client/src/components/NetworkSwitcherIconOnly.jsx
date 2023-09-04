import { useState, useEffect } from 'react';
import { Button, HStack, Image, Text, Tooltip } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

const NetworkSwitcherIconOnly = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('Telos Testnet');
  const [provider, setProvider] = useState('https://testnet.telos.net/evm');
  
  const switchNetwork = async (network) => {
    try {
      const networkData = {
        'Telos Mainnet': { chainId: 40, rpcUrl: 'https://mainnet.telos.net/evm' },
        'Telos Testnet': { chainId: 41, rpcUrl: 'https://testnet.telos.net/evm' },
        'Fuji Testnet': { chainId: 43113, rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc' },
        'Avalanche Mainnet': { chainId: 43114, rpcUrl: 'https://api.avax.network/ext/bc/C/rpc' }
      };

      const { chainId, rpcUrl } = networkData[network];
      setProvider(rpcUrl);

      if (!window.ethereum) {
        throw new Error('Metamask not installed or not accessible.');
      }
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (parseInt(currentChainId, 16) === chainId) {
        console.log('Already on the desired network.');
        return;
      }
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x' + chainId.toString(16),
            chainName: network,
            nativeCurrency: {
              name: 'Telos',
              symbol: 'TLOS',
              decimals: 18,
            },
            rpcUrls: [rpcUrl],
            blockExplorerUrls: [/* Add the appropriate block explorer URLs based on the network */],
          },
        ],
      });

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x' + chainId.toString(16) }],
      });
    } catch (error) {
      console.error('Failed to switch network:', error);
    }
  };

  useEffect(() => {
    switchNetwork(selectedNetwork);
  }, [selectedNetwork]);

  return (
    <Menu>
      <Tooltip hasArrow label="Switch Network" bg="#c1cfd8" color="black">
        <MenuButton size={'auto'} bg={'transparent'} as={Button}>
          <HStack>
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
            ></model-viewer>
            <Text>{selectedNetwork}</Text>
          </HStack>
        </MenuButton>
      </Tooltip>
      <MenuList zIndex={99999}>
        <MenuItem minH='48px' onClick={() => setSelectedNetwork('Telos Testnet')} zIndex={99999}>
          <Image boxSize='2rem' borderRadius='full' src='/telos.png' mr='6px' />
          <Text>Telos Testnet</Text>
        </MenuItem>
        <MenuItem minH='48px' onClick={() => setSelectedNetwork('Fuji Testnet')} zIndex={99999}>
          <Image boxSize='2rem' borderRadius='full' src='/avax.png' mr='6px' />
          <Text>Fuji Testnet</Text>
        </MenuItem>
        <MenuItem minH='40px' onClick={() => setSelectedNetwork('Telos Mainnet')} zIndex={99999}>
          <Image boxSize='2rem' borderRadius='full' src='/telos.png' mr='6px' />
          <Text>Telos Mainnet</Text>
        </MenuItem>
        <MenuItem minH='40px' onClick={() => setSelectedNetwork('Avalanche Mainnet')} zIndex={99999}>
          <Image boxSize='2rem' borderRadius='full' src='/avax.png' mr='6px' />
          <Text>Avalanche Mainnet</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NetworkSwitcherIconOnly;
