import React from 'react';
import { Flex, Box, Text, Link } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box bg="blue.500" w="100%">
      <Flex
        as="nav"
        align="center"
        wrap="wrap"
        padding="1rem"
        gap={4}
        color="white"
      >
        <Link as={NextLink} href="/">
          <Text fontSize="2xl" fontWeight="bold">
            ResumeParser
          </Text>
        </Link>

        <Link as={NextLink} href="/form">
          <Text fontSize={{ base: 'xl', md: 'lg' }}>
            Submit Profile
          </Text>
        </Link>

      </Flex>
    </Box>
  );
}

export default Navbar;
