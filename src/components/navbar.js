import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Flex, Box, Text, Link, IconButton } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box bg="teal.500" w="100%">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem"
        color="white"
      >
        <Flex align="center">
          <Text fontSize="2xl" fontWeight="bold">
            My App
          </Text>
        </Flex>
        <Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
          {isOpen ? <CloseIcon color="white" /> : <HamburgerIcon color="white" />}
        </Box>
        <Box
          display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
        >
          <Link as={NextLink} href="/">
            <Text ml={{ base: 0, md: 2 }} mr={{ base: 2, md: 0 }} mt={{ base: 2, md: 0 }} fontSize={{ base: 'xl', md: 'lg' }} fontWeight="bold" cursor="pointer">
              Home
            </Text>
          </Link>
          <Link as={NextLink} href="/components/form">
            <Text ml={{ base: 0, md: 2 }} mr={{ base: 2, md: 0 }} mt={{ base: 2, md: 0 }} fontSize={{ base: 'xl', md: 'lg' }} fontWeight="bold" cursor="pointer">
              Form
            </Text>
          </Link>
          <Link as={NextLink} href="/components/analysis">
            <Text ml={{ base: 0, md: 2 }} mr={{ base: 2, md: 0 }} mt={{ base: 2, md: 0 }} fontSize={{ base: 'xl', md: 'lg' }} fontWeight="bold" cursor="pointer">
              Analytics
            </Text>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}

export default Navbar;
