import { ChakraProvider, Box, Heading, Link, Text, VStack } from '@chakra-ui/react';
import Navbar from './navbar';
import countMajor from './../../images/count_major.png';
import countDegree from './../../images/count_degree.png';

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
            <Text fontSize="lg" fontWeight="bold">Charts:</Text>
            <Box bg="gray.200" p={6} borderRadius={6}>
              <img src={countMajor} alt="Major Count" />
            </Box>
            <Box bg="gray.200" p={6} borderRadius={6}>
              <img src={countDegree} alt="Degree Count" />
            </Box>
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default Analysis;
