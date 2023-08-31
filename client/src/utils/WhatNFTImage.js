import React, { useEffect, useContext, useState } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import { Avatar, Box, Center, Text } from '@chakra-ui/react'
import TheBUNY from '../contracts/fuji/TheBUNY.json'
import { AppContext } from '../AppContext'
import loading2 from 'react-useanimations/lib/loading2'
import UseAnimations from 'react-useanimations'


const WhatNFTImage = ({size, inputAddress,inputTokenId, inputChainId }) => {
  const { account } = useContext(AppContext)
  const [nftImage, setNFTImage] = useState(null)
 
  let provider
  if (inputChainId === '1') {
    provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/7b0c9a81ffce485b81a8ae728b43e948')
  } else if (inputChainId === '43113') {
    provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc')
  } else if (inputChainId === '41') {
    provider = new ethers.providers.JsonRpcProvider('https://testnet.telos.net/evm')
  } else if (inputChainId === '40') {
    provider = new ethers.providers.JsonRpcProvider('https://telos.net/evm')
  }
  
  useEffect(() => {
    const fetchNFTData = async () => {
      let metadata = {}
      try {
        const contract = new ethers.Contract(inputAddress, TheBUNY.abi, provider)
        let tokenURI = await contract.tokenURI(inputTokenId)
        if (tokenURI.startsWith('ipfs://')) {
          const ipfsGatewayUrl = 'https://ipfs.io/ipfs/' // Replace with your preferred IPFS gateway URL
          const cid = tokenURI.replace('ipfs://', '')
          tokenURI = ipfsGatewayUrl + cid
        }
        const response = await axios.get(tokenURI)
        const { data } = response
        if (!data) {
          throw new Error('No metadata found at provided tokenURI.')
        }
        metadata = data
        let nftImage = metadata.image
         if (nftImage.startsWith('ipfs://')) {
          const ipfsGatewayUrl = 'https://ipfs.io/ipfs/' // Replace with your preferred IPFS gateway URL
          const cid = nftImage.replace('ipfs://', '')
          nftImage = ipfsGatewayUrl + cid
        }
        setNFTImage(nftImage)
      } catch (error) {
        console.error('Unable to fetch NFT data:', error)
      }
    }

    fetchNFTData()
  }, [inputAddress, inputTokenId, inputChainId, account,  provider])

 

  if (!nftImage) {
    return <div>
    <Center>
    <UseAnimations fillColor='#6a14fc' animation={loading2} size={63} speed={3000} strokeColor='orange' wrapperStyle={{ padding: 1 }} />
    </Center>
    <Text fontSize={'x-small'} color="#6a14fc">Ready to load..</Text>

    </div>
  }

  return (
    
      
        <Box w={'auto'}>
        <Avatar size={size} src={nftImage} />
        </Box>
      
    
  )
}

export default WhatNFTImage
