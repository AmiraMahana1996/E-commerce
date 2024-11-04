import { LightbulbOutlined } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Box,
  Button,
  Card,
  Chip,
  DialogContent,
  DialogTitle,
  Dropdown,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  MenuButton,
  Modal,
  ModalDialog,
  Stack,
  Typography,
} from "@mui/joy";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Gramatik({ lessonid, levelidd, languageid }) {
  const [open, setOpen] = useState({ status: false, levelid: "" });
  const [data, setData] = useState([]);
  const [openQ, setOpenQ] = React.useState({ status: false, levelid: "" });
  const [formData, setFormData] = useState({
    name: "",
    explaination: "",
    explaination2: "",
    examples: "",
    examples2: "",
    examples3: "",
    examples4: "",
    keywords: "",
  });

  const [formDataQ, setFormDataQ] = useState({
    type: "",
    question: "",
    answer: "",
  });
  // GET Request - Fetch all Products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/language/language`
      );
      console.log(response.data);
      const filteredArray = response.data.filter((obj) => {
        console.log(obj._id === languageid);
        return obj._id === languageid;
      });
      console.log(filteredArray[0].levels);
      const filteredlevel = filteredArray[0].levels.filter((obj) => {
        console.log(obj._id === levelidd);
        return obj._id === levelidd;
      });

      const filteredlessons = filteredlevel[0].lessons.filter((obj) => {
        console.log(obj._id === lessonid);
        return obj._id === lessonid;
      });
      setData(filteredlessons[0].gramatik);
    } catch (err) {}
  };

  // Load posts when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const handelChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    switch (fieldName) {
      case "name":
        setFormData((prevFormData) => ({
          ...prevFormData,
          name: value,
        }));
        break;
      case "explaination":
        setFormData((prevFormData) => ({
          ...prevFormData,
          explaination: value,
        }));
        break;
      case "explaination2":
        setFormData((prevFormData) => ({
          ...prevFormData,
          explaination2: value,
        }));
        break;
      case "examples":
        setFormData((prevFormData) => ({
          ...prevFormData,
          examples: value,
        }));
        break;
      case "examples2":
        setFormData((prevFormData) => ({
          ...prevFormData,
          examples2: value,
        }));
        break;
      case "examples3":
        setFormData((prevFormData) => ({
          ...prevFormData,
          examples3: value,
        }));
        break;
      case "examples4":
        setFormData((prevFormData) => ({
          ...prevFormData,
          examples4: value,
        }));
        break;
      default:
        // Handle other fields
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen({ status: false });
    console.log(formData, "formData");
    await axios.put(
      `http://localhost:5000/api/language/addgramatik/${languageid}/${levelidd}/${lessonid}`,
      formData
    );
    console.log(open, "oppen");
  };


  const handelChangeQ = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    switch (fieldName) {
      case "type":
        setFormDataQ((prevFormData) => ({
          ...prevFormData,
          type: value,
        }));
        break;
      case "question":
        setFormDataQ((prevFormData) => ({
          ...prevFormData,
          question: value,
        }));
        break;
      case "answer":
        setFormDataQ((prevFormData) => ({
          ...prevFormData,
          answer: value,
        }));
        break;
      default:
        // Handle other fields
        break;
    }
  };

  const handleSubmitQ = async (event) => {
    event.preventDefault();
    setOpenQ({ status: false });
    console.log(formDataQ, "formData");
    await axios.put(
      `http://localhost:5000/api/language/addQeustiongramatik/${languageid}/${levelidd}/${lessonid}`,
      formDataQ
    );
    console.log(open, "oppen");
  };

  return (
    <>
      <Dropdown
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          mt: 2,
        }}
      >
        <MenuButton
          variant="solid"
          color="primary"
          onClick={() => setOpen({ status: true })}
          sx={{
            mr: 2,
          }}
        >
          Add Gramatik
        </MenuButton>
        <MenuButton
          variant="solid"
          color="primary"
          sx={{
            mr: 2,
          }}
        >
          <a
            href={`/cms/learning/grammer-quiz/${languageid}/${levelidd}/${lessonid}`}
            style={{ color: "#f7f0f0" ,textDecoration:"none"}}
          >
            Start Quiz
          </a>
        </MenuButton>

        <MenuButton
          variant="solid"
          color="primary"
          onClick={() => setOpenQ({ status: true })}
        >
          Add Question
        </MenuButton>
      </Dropdown>

      <br></br>
      <br></br>

      <AccordionGroup sx={{}}>
        {data.map((grammarItem) => (
          <Accordion key={grammarItem._id}>
            <AccordionSummary>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography level="title-lg">{grammarItem.name}</Typography>
                  <Chip size="sm" variant="soft" color="primary">
                    important
                  </Chip>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* Explanation */}
                <Card variant="soft">
                  <Typography
                    level="title-md"
                    startDecorator={<LightbulbOutlined />}
                  >
                    Explanation
                  </Typography>
                  <Typography level="body-md">
                    {grammarItem.explaination}
                  </Typography>

                  <Typography level="body-md">
                    {grammarItem.explaination2}
                  </Typography>
                  <Typography
                    level="body-md"
                    sx={{ color: "text.secondary", mt: 1 }}
                  >
                    {grammarItem.examples}
                  </Typography>
                  <Typography
                    level="body-md"
                    sx={{ color: "text.secondary", mt: 1 }}
                  >
                    {grammarItem.examples2}
                  </Typography>

                  <Typography
                    level="body-md"
                    sx={{ color: "text.secondary", mt: 1 }}
                  >
                    {grammarItem.examples3}
                  </Typography>

                  <Typography
                    level="body-md"
                    sx={{ color: "text.secondary", mt: 1 }}
                  >
                    {grammarItem.examples4}
                  </Typography>

                  <Typography
                    level="body-md"
                    sx={{ color: "text.secondary", mt: 1 }}
                  >
                    {grammarItem.keywords}
                  </Typography>
                </Card>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </AccordionGroup>

      <Modal
        open={open.status}
        onClose={() => setOpen({ status: false })}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ModalDialog
          sx={{
            width: "100%",
            maxWidth: "800px", // Increased width
            minHeight: "600px", // Set minimum height
            p: 3, // Increased padding
            borderRadius: "lg",
            overflow: "auto", // Enable scrolling if needed
          }}
        >
          <DialogTitle>Add new gramatik</DialogTitle>
          <DialogContent>Fill in the information of the Word.</DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Gramatik</FormLabel>
                <Input
                  name="name"
                  type="text"
                  onChange={handelChange}
                  value={formData.name}
                  autoFocus
                  placeholder="Word"
                />
              </FormControl>

              <FormControl>
                <FormLabel>explaination</FormLabel>
                <Input
                  name="explaination"
                  type="text"
                  onChange={handelChange}
                  value={formData.explaination}
                  autoFocus
                  placeholder="Translation"
                />
              </FormControl>
              <FormControl>
                <FormLabel>explaination2</FormLabel>
                <Input
                  name="explaination2"
                  type="text"
                  onChange={handelChange}
                  value={formData.explaination2}
                  autoFocus
                  placeholder="explaination2"
                />
              </FormControl>

              <FormControl>
                <FormLabel>examples</FormLabel>
                <Input
                  name="examples"
                  type="text"
                  onChange={handelChange}
                  value={formData.examples}
                  autoFocus
                  placeholder="Phrase"
                />
              </FormControl>
              <FormControl>
                <FormLabel>examples2</FormLabel>
                <Input
                  name="examples2"
                  type="text"
                  onChange={handelChange}
                  value={formData.examples2}
                  autoFocus
                  placeholder="Phrase"
                />
              </FormControl>
              <FormControl>
                <FormLabel>examples3</FormLabel>
                <Input
                  name="examples3"
                  type="text"
                  onChange={handelChange}
                  value={formData.examples3}
                  autoFocus
                  placeholder="Phrase"
                />
              </FormControl>

              <FormControl>
                <FormLabel>examples4</FormLabel>
                <Input
                  name="examples4"
                  type="text"
                  onChange={handelChange}
                  value={formData.examples4}
                  autoFocus
                  placeholder="Phrase"
                />
              </FormControl>
              <FormControl>
                <FormLabel>keywords</FormLabel>
                <Input
                  name="keywords"
                  type="text"
                  onChange={handelChange}
                  value={formData.keywords}
                  autoFocus
                  placeholder="Phrase"
                />
              </FormControl>

              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>

      <Modal open={openQ.status} onClose={() => setOpenQ({ status: false })}>
        <ModalDialog>
          <DialogTitle>Add new Question</DialogTitle>
          <DialogContent>Fill in the information of the Word.</DialogContent>
          <form onSubmit={handleSubmitQ}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Input
                  name="type"
                  type="text"
                  onChange={handelChangeQ}
                  value={formDataQ.type}
                  autoFocus
                  placeholder="type"
                />
              </FormControl>

              <FormControl>
                <FormLabel>question</FormLabel>
                <Input
                  name="question"
                  type="text"
                  onChange={handelChangeQ}
                  value={formDataQ.question}
                  autoFocus
                  placeholder="question"
                />
              </FormControl>

              <FormControl>
                <FormLabel>answer</FormLabel>
                <Input
                  name="answer"
                  type="text"
                  onChange={handelChangeQ}
                  value={formDataQ.answer}
                  autoFocus
                  placeholder="answer"
                />
              </FormControl>

              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}
