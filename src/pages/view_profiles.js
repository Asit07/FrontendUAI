import { ChakraProvider, Box, SimpleGrid, Text, FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";
import connection from "@/connection";

function Form() {

    const [profiles, setProfiles] = useState([]);
    const [minGPA, setMinGPA] = useState(0.0);
    
    const fetch = async () => {
        // Fetch candidates
        const { data } = await connection.get("/candidates/", {
            params: {min_gpa: minGPA},
        });
        setProfiles(data);
    }

    useEffect(() => {
        fetch();
    }, [minGPA]);

    return (
        <ChakraProvider>
            <Navbar />
            <Box maxW="1000px" mx="auto" mt="4" mb="4">
                <FormControl mb="4">
                    <FormLabel>Minimum GPA</FormLabel>
                    <NumberInput value={minGPA} onChange={(value) => setMinGPA(value)}>
                        <NumberInputField/>
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <SimpleGrid columns={2} spacing={10}>
                    {profiles.map(profile => (
                        <Box borderWidth={2} borderRadius={4} p={4}>
                            <Text fontSize="lg" fontWeight="bold">
                                {profile.name}
                            </Text>
                            <Text fontSize="sm" color="gray">
                                {profile.email}
                            </Text>
                            <Text fontSize="sm" color="gray">
                                {profile.degree}
                            </Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>
        </ChakraProvider>
    );
}

export default Form;
