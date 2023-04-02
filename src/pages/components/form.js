import { ChakraProvider, Box, Text, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import Navbar from "./navbar";

function Form() {

  const handleChange = (event) => {
    console.log(event);
  }

  return (
    <ChakraProvider>
      <Navbar />
      <Box maxW="500px" mx="auto">
        <Text fontSize="3xl" fontWeight="bold" mb="4">Candidate Profile</Text>
        <form action="/api/form" method="POST" encType="multipart/form-data">
          <FormControl mb="4">
            <FormLabel>Resume Upload</FormLabel>
            <Input type="file" name="resume" accept="application/pdf" required={true}
              onChange={handleChange}/>
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Email</FormLabel>
            <Input type="email" autoComplete="email" name="email" required={true} />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Name</FormLabel>
            <Input type="name" autoComplete="name" name="name" required={true} />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>First Name</FormLabel>
            <Input type="firstName" autoComplete="firstName" name="firstName" required={true} />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Last Name</FormLabel>
            <Input type="lastName" autoComplete="lastName" name="lastName" required={true} />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Major</FormLabel>
            <Input type="major" autoComplete="major" name="major" required={true} />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>GPA</FormLabel>
            <Input type="gpa" autoComplete="gpa" name="gpa" required={true} />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Graduation Date</FormLabel>
            <Input type="gradDate" autoComplete="gradDate" name="gradDate" required={true} />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Position Type</FormLabel>
            <Input type="posType" autoComplete="posType" name="posType" required={true} />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Sponsorship Needed</FormLabel>
            <Input type="sponsorship" autoComplete="sponsorship" name="sponsorship" required={true} />
          </FormControl>
        </form>
        <Button colorScheme="teal" size="md" type="submit">Submit</Button>
      </Box>
    </ChakraProvider>
  );
}

export default Form;
