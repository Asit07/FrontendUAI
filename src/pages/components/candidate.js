import { useState } from 'react';
import { ChakraProvider, Box, Heading, Text, Link as ChakraLink, Button } from '@chakra-ui/react';
import Link from 'next/link';
import Navbar from './navbar';

function Candidate() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <>
      <ChakraProvider>
        <Navbar />
        <Box maxW="xl" mx="auto" my="8" p="6" borderWidth="1px" rounded="lg" shadow="lg">
          <Heading as="h1" size="2xl" mb="6">
            Candidate
          </Heading>
          <Text fontSize="xl" mb="4">
            Welcome to the candidate page! Here you can find all the information related to candidates.
          </Text>
          <Box mb="4">
            <Text fontSize="lg" fontWeight="bold" mb="2">
              Interested in applying for a job?
            </Text>
            <ChakraLink href="/components/form" color="blue.500">
              Form
            </ChakraLink>
          </Box>
          <Box mb="4">
            <Text fontSize="lg" fontWeight="bold" mb="2">
              Upload your resume:
            </Text>
            <input type="file" onChange={handleFileSelect} />
          </Box>
          <Box mb="4">
            {selectedFile && (
              <>
                <Text fontSize="lg" fontWeight="bold" mb="2">
                  Selected file:
                </Text>
                <Text>{selectedFile.name}</Text>
              </>
            )}
          </Box>
          <Button colorScheme="blue" mb="8">
            Submit
          </Button>
          <Box>
            <Link href="/">
              <ChakraLink color="gray.500">Back to home</ChakraLink>
            </Link>
          </Box>
        </Box>
      </ChakraProvider>
    </>
  );
}

export default Candidate;
