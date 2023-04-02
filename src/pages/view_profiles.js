import { ChakraProvider, Box, SimpleGrid, Text } from "@chakra-ui/react";
import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";
import connection from "@/connection";

function Form() {

    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // Fetch candidates
            const { data } = await connection.get("/candidates/");
            setProfiles(data);
        }
        fetchData();
    });

    return (
        <ChakraProvider>
            <Navbar />
            <Box maxW="1000px" mx="auto" mt="4" mb="4">
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
