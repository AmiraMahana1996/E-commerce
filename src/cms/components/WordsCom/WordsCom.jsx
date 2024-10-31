import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Menu,
  MenuButton,
  Modal,
  Option,
  Select,
  Sheet,
  Typography,
} from "@mui/joy";
import {
  Button,
  DialogContent,
  DialogTitle,
  Dropdown,
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  ModalDialog,
  Stack,
} from "@mui/joy";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EmailIcon from "@mui/icons-material/Email";
import IconButton from "@mui/joy/IconButton";
import { Search, VolumeUp } from "@mui/icons-material";

export default function WordsCom({ lessonid, levelidd, languageid }) {
  const [open, setOpen] = React.useState({ status: false, levelid: "" });
  const [openQ, setOpenQ] = React.useState({ status: false, levelid: "" });
  const [data, setData] = useState([]);
  const [gramatik, setGramatik] = useState([]);
  const [formData, setFormData] = useState({
    word: "",
    translation: "",
    phrase: "",
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
      console.log(response.data, "response.data");
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
      console.log(filteredlessons[0].words, "filteredlessons[0].words");
      setData(filteredlessons[0].words);
      // setGramatik(filteredlessons[0].gramatik);
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
      case "word":
        setFormData((prevFormData) => ({
          ...prevFormData,
          word: value,
        }));
        break;
      case "translation":
        setFormData((prevFormData) => ({
          ...prevFormData,
          translation: value,
        }));
        break;
      case "phrase":
        setFormData((prevFormData) => ({
          ...prevFormData,
          phrase: value,
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
      `http://localhost:5000/api/language/addword/${languageid}/${levelidd}/${lessonid}`,
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
      `http://localhost:5000/api/language/addQeustionWords/${languageid}/${levelidd}/${lessonid}`,
      formDataQ
    );
    console.log(open, "oppen");
  };

  return (
    <>
      <Dropdown
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 2,
          ml: 2,
        }}
      >
        <MenuButton
          variant="solid"
          color="primary"
          sx={{
            mr: 2,
          }}
          onClick={() => setOpen({ status: true })}
        >
          Add Word
        </MenuButton>

        <MenuButton
          variant="solid"
          color="primary"
          sx={{
            mr: 2,
          }}
        >
          <a
            href={`/cms/learning/words-quiz/${languageid}/${levelidd}/${lessonid}`}
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

      <Box sx={{ maxWidth: 800, margin: "auto", p: 2 }}>
        <Typography level="h4" sx={{ mb: 4 }}>
          Vocabulary List
        </Typography>

        {/* Controls Section */}
        <br />

        {/* Words List */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {data.map((wordItem) => (
            <Card
              key={wordItem._id}
              variant="outlined"
              sx={{
                "&:hover": { borderColor: "primary.500", boxShadow: "sm" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Typography level="h4">{wordItem.word}</Typography>
                    <IconButton
                      size="sm"
                      variant="plain"
                      color="neutral"
                      // onClick={() => handlePlaySound(wordItem.word)}
                    >
                      <VolumeUp />
                    </IconButton>
                  </Box>
                  <Typography level="body-md" sx={{ color: "text.secondary" }}>
                    {wordItem.translation}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography level="body-sm" sx={{ fontStyle: "italic" }}>
                  {wordItem.phrase}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>

        {data.length === 0 && (
          <Sheet
            variant="soft"
            color="neutral"
            sx={{
              p: 4,
              borderRadius: "sm",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography level="body-lg">No words found</Typography>
          </Sheet>
        )}
      </Box>
      <Modal open={open.status} onClose={() => setOpen({ status: false })}>
        <ModalDialog>
          <DialogTitle>Add new Word</DialogTitle>
          <DialogContent>Fill in the information of the Word.</DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Word</FormLabel>
                <Input
                  name="word"
                  type="text"
                  onChange={handelChange}
                  value={formData.word}
                  autoFocus
                  placeholder="Word"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Translation</FormLabel>
                <Input
                  name="translation"
                  type="text"
                  onChange={handelChange}
                  value={formData.translation}
                  autoFocus
                  placeholder="Translation"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Phrase</FormLabel>
                <Input
                  name="phrase"
                  type="text"
                  onChange={handelChange}
                  value={formData.phrase}
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
