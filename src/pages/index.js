import { useState } from "react";
import {
  ChakraProvider,
  Heading,
  Link as ChakraLink,
  Button,
  Input,
  VStack,
  Box,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import Navbar from "../components/navbar";
import QRCode from "qrcode.react";

function Event() {

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [events, setEvents] = useState([]);

  const addEvent = () => {
    const newEvent = {
      name: eventName,
      date: eventDate,
      startTime: eventStartTime,
      endTime: eventEndTime,
      candidates: [],
    };
    setEvents([...events, newEvent]);
    setEventName("");
    setEventDate("");
    setEventStartTime("");
    setEventEndTime("");
  };

  const removeEvent = (index) => {
    const newEvents = [...events];
    newEvents.splice(index, 1);
    setEvents(newEvents);
  };

  const eventIsExpired = (event) => {
    const now = new Date();
    const eventEnd = new Date(`${event.date} ${event.endTime}`);
    return eventEnd < now;
  };

  const filteredEvents = events.filter((event) => !eventIsExpired(event));

  return (
    <ChakraProvider>
      <Navbar />
      <div className="container">
        <Heading as="h1" size="2xl" mb="10">
          Events
        </Heading>

        <VStack spacing={4} align="stretch" mb="8">
          <Box>
            <Input
              placeholder="Event name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </Box>
          <Box>
            <Input
              placeholder="Event date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </Box>
          <Box>
            <Input
              placeholder="Event start time"
              value={eventStartTime}
              onChange={(e) => setEventStartTime(e.target.value)}
            />
          </Box>
          <Box>
            <Input
              placeholder="Event end time"
              value={eventEndTime}
              onChange={(e) => setEventEndTime(e.target.value)}
            />
          </Box>
          <Box>
            <Button colorScheme="blue" onClick={addEvent}>
              Add Event
            </Button>
          </Box>
        </VStack>

        {filteredEvents.length > 0 ? (
          <VStack spacing={8} align="stretch">
            {filteredEvents.map((event, index) => (
              <Box
                key={index}
                p="6"
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
              >
                <Heading as="h2" size="xl" mb="4">
                  {event.name}
                </Heading>
                <Text fontSize="lg" mb="4">
                  {`${event.date} ${event.startTime}-${event.endTime}`}
                </Text>
                <QRCode value={event.name} />
                <Button
                  colorScheme="red"
                  size="sm"
                  mt="4"
                  onClick={() => removeEvent(index)}
                >
                Remove
                </Button>
                <Link  href="/components/form">
                    <Text ml={{ base: 0, md: 2 }} mr={{ base: 2, md: 0 }} mt={{ base: 2, md: 0 }} fontSize={{ base: 'xl', md: 'lg' }} fontWeight="bold" cursor="pointer">
                        Fill Form
                    </Text>
                </Link>
                </Box>
                ))}
            </VStack>
                ) : (
                  <Text fontSize="lg" mb="4">
                  No events added yet.
                  </Text>
                  )}
                  <Link href="/">
                  <ChakraLink color="blue.500" fontSize="xl">
                    Back to home
                  </ChakraLink>
                </Link>
              </div>
            
              <style jsx>{`
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 50px 20px;
                  text-align: center;
                }
              `}</style>
    </ChakraProvider>
    );
}

export default Event;            