import { ChakraProvider, Box, Text, FormControl, FormLabel, Input, Select, Button, Checkbox, HStack, Tag, TagRightIcon, TagLabel, Flex, Wrap, WrapItem, Center, useToast } from "@chakra-ui/react";
import { useState, createRef } from "react";
import FilePicker from "chakra-ui-file-picker";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import Navbar from "@/components/navbar";
import connection from "@/connection";

function Form() {

  const eventID = "6428ea8e7b3bf388a402450f";

  const toast = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("");
  const [degree, setDegree] = useState("");
  const [gpa, setGPA] = useState("");
  const [graduationDate, setGraduationDate] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [seekingPosition, setPositionType] = useState(0);
  const [seekingSponsorship, setSeekingSponshorship] = useState(false);

  const resume_input = createRef();

  const handleChange = async (event) => {
    // Ignore if no files listed
    if (event.length === 0) return;
    // Construct form data
    const formData = new FormData();
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

  const submitProfile = async (event) => {
    event.preventDefault();
    // Construct form data
    const file = resume_input.current.state.files[0];
    const model = { email, name, skills, major: [major], degree: [degree],
      graduation_date: graduationDate, gpa,
      seeking_position: seekingPosition, seeking_sponsorship: seekingSponsorship,
      event: eventID,
    }
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("model", JSON.stringify(model));
    await connection.post("/candidates/", formData);
    submitSuccess();
  }

  const submitSuccess = () => {
    toast({
      title: "Candidate profile received!",
      status: "success",
    });
    // Reset form
    setName("");
    setEmail("");
    setMajor("");
    setDegree("");
    setGPA("");
    setGraduationDate("");
    setSkills([]);
    setPositionType(0);
    setSeekingSponshorship(false);
  }

  return (
    <ChakraProvider>
      <Navbar/>
      <Box maxW="500px" mx="auto" mt="4" mb="4">
        <Text fontSize="3xl" fontWeight="bold" mb="4">Candidate Profile</Text>
        <form onSubmit={submitProfile}>
          <FormControl mb="4">
            <FormLabel>Resume Upload</FormLabel>
            <FilePicker
              onFileChange={handleChange}
              placeholder="Upload Resume"
              multipleFiles={false}
              accept="application/pdf"
              ref={resume_input}
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
            <Input type="text" name="degree" required={true} value={degree}
              onChange={(event) => setDegree(event.target.value)}/>
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Major</FormLabel>
            <Input type="text" name="major" required={true} value={major}
              onChange={(event) => setMajor(event.target.value)}/>
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
            <Select value={seekingPosition} onChange={(event) => setPositionType(event.target.value)}>
              <option value={0}>Internship</option>
              <option value={1}>Full-time</option>
            </Select>
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Seeking Sponsorship</FormLabel>
            <Checkbox value={seekingSponsorship} onChange={(event) => setSeekingSponshorship(event.target.value)}/>
          </FormControl>
          <Button colorScheme="blue" type="submit">Submit</Button>
        </form>
      </Box>
    </ChakraProvider>
  );
}

export default Form;
