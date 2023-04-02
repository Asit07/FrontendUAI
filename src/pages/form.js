import { ChakraProvider, Box, Text, FormControl, FormLabel, Input, Select, Button, Checkbox, HStack, Tag, TagRightIcon, TagLabel, Flex, Wrap, WrapItem, Center } from "@chakra-ui/react";
import { useState } from "react";
import FilePicker from "chakra-ui-file-picker";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import Navbar from "@/components/navbar";
import connection from "@/connection";

function Form() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [degree, setDegree] = useState("");
  const [gpa, setGPA] = useState("");
  const [graduationDate, setGraduationDate] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [positionType, setPositionType] = useState("");
  const [seekingSponsorship, setSeekingSponshorship] = useState("");

  const handleChange = async (event) => {
    // Ignore if no files listed
    if (event.length === 0) return;
    // Construct form data
    let formData = new FormData();
    formData.append("resume_upload", event[0]);
    const { data } = await connection.post("/parse/", formData);
    // Populate form using data
    setName(data.name);
    setEmail(data.email);
    setDegree(data.degree);
    setSkills(data.skills);
  }

  const removeSkill = (skill) => {
    const index = skills.indexOf(skill);
    const modified = [...skills];
    modified.splice(index, 1);
    setSkills(modified);
  }

  const addSkill = (skill) => {
    setSkills([...skills, skill]);
  }

  const processSkillInput = () => {
    if (skillInput === "") return;
    addSkill(skillInput);
    setSkillInput("");
  }

  return (
    <ChakraProvider>
      <Navbar/>
      <Box maxW="500px" mx="auto" mt="4" mb="4">
        <Text fontSize="3xl" fontWeight="bold" mb="4">Candidate Profile</Text>
        <form action="/api/form" method="POST" encType="multipart/form-data">
          <FormControl mb="4">
            <FormLabel>Resume Upload</FormLabel>
            <FilePicker
              onFileChange={handleChange}
              placeholder="Upload Resume"
              multipleFiles={false}
              accept="application/pdf"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" required={true} value={email}
              onChange={(event) => setEmail(event.target.value)}/>
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" required={true} value={name}
              onChange={(event) => setName(event.target.value)}/>
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Degree</FormLabel>
            <Input type="text" name="major" required={true} value={degree}
              onChange={(event) => setDegree(event.target.value)}/>
          </FormControl>
          <FormControl mb="4">
            <FormLabel>GPA</FormLabel>
            <Input type="text" name="gpa" required={true} value={gpa}
              onChange={(event) => setGPA(event.target.value)}/>
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Graduation Date</FormLabel>
            <Input type="text" name="graduation_date" required={true} value={graduationDate}
              onChange={(event) => setGraduationDate(event.target.value)}/>
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Skills</FormLabel>
            <Wrap spacing={2} mb={2}>
              {skills.map((skill) => (
                <WrapItem>
                  <Center>
                    <Tag key={skill}>
                      <TagRightIcon boxSize="12px" as={MinusIcon} mr="1" onClick={() => removeSkill(skill)}/>
                      <TagLabel>{skill}</TagLabel>
                    </Tag>
                  </Center>
                </WrapItem>
              ))}
            </Wrap>
            <Flex gap={2}>
              <Input type="text" value={skillInput} placeholder="Add Skill..."
                onChange={(event) => setSkillInput(event.target.value)}/>
              <Button leftIcon={<AddIcon/>} onClick={processSkillInput}>
                Add Skill
              </Button>
            </Flex>
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Seeking Position</FormLabel>
            <Select value={positionType} onChange={(event) => setPositionType(event.target.value)}>
              <option value={0}>Internship</option>
              <option value={1}>Full-time</option>
            </Select>
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Seeking Sponsorship</FormLabel>
            <Checkbox value={seekingSponsorship} onChange={(event) => setSeekingSponshorship(event.target.value)}/>
          </FormControl>
        </form>
        <Button colorScheme="teal" size="md" type="submit">Submit</Button>
      </Box>
    </ChakraProvider>
  );
}

export default Form;
