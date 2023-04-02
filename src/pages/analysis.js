import { ChakraProvider, Box, Heading, Link, Text, VStack } from '@chakra-ui/react';
import Navbar from '../components/navbar';

function Analysis() {
  return (
    <ChakraProvider>
    <Navbar/>
      <Box maxW="xl" mx="auto" p={6}>
        <Heading as="h1" size="2xl" mb={6}>
          Analytics
        </Heading>
        <VStack spacing={4} align="start">
          <Box>
            <Text fontSize="lg" fontWeight="bold">Welcome to the Analytics page!</Text>
            <Text mt={2}>Here you can view data and insights about the resumes submitted through our form.</Text>
          </Box>
          <Box>
            <Text fontSize="lg" fontWeight="bold">Example Chart:</Text>
            <Box bg="gray.200" p={6} borderRadius={6}>
              {/* Replace with your chart component */}
              <Text>Chart goes here</Text>
            </Box>
          </Box>
          <Link href="/" fontSize="xl">
            Back to home
          </Link>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default Analysis;
