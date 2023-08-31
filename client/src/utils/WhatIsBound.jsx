import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import BunyERC6551Registry from '../contracts/fuji/BunyERC6551Registry.json'
import { HStack, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'

function WhatIsBound({ accountAddress }) {
  const [isActive, setIsActive] = useState(false)
  const [implementation, setImplementation] = useState('')
  const [chainID, setChainID] = useState('')
  const [tokenContractAddress, setTokenContractAddress] = useState('')
  const [tokenID, setTokenID] = useState('')
  const [salt, setSalt] = useState('')

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        setIsActive(false)
        const provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc')
        const registryContract = new ethers.Contract(BunyERC6551Registry.address, BunyERC6551Registry.abi, provider)
        const accountDetails = await registryContract.getAccountDetails(accountAddress)
        
        console.log('Account found')
        console.log(`Implementation address: ${accountDetails[0]}`)
        setImplementation(accountDetails[0])
        
        console.log(`Chain ID: ${accountDetails[1].toString()}`)
        setChainID(accountDetails[1].toString())
        
        console.log(`Token contract address: ${accountDetails[2]}`)
        setTokenContractAddress(accountDetails[2])
        
        console.log(`Token ID: ${accountDetails[3].toString()}`)
        setTokenID(accountDetails[3].toString())
        
        console.log(`Salt: ${accountDetails[4].toString()}`)
        setSalt(accountDetails[4].toString())
        
        if(accountDetails[3] >= 1) {
          setIsActive(true)
        }
      } catch (error) {
        console.error('Error checking account:', error)
      }
    }

    fetchAccountDetails(accountAddress)
  }, [accountAddress])

  return (
    <>
    <HStack>
      <Text>Token Bound?</Text>
      <Text h="auto" w="auto">
        {isActive.toString()}
      </Text>
    </HStack>
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Property</Th>
          <Th>Value</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Implementation Address</Td>
          <Td>{implementation}</Td>
        </Tr>
        <Tr>
          <Td>Chain ID</Td>
          <Td>{chainID}</Td>
        </Tr>
        <Tr>
          <Td>Token Contract Address</Td>
          <Td>{tokenContractAddress}</Td>
        </Tr>
        <Tr>
          <Td>Token ID</Td>
          <Td>{tokenID}</Td>
        </Tr>
        <Tr>
          <Td>Salt</Td>
          <Td>{salt}</Td>
        </Tr>
      </Tbody>
    </Table>
  </>
  )
}

export default WhatIsBound
