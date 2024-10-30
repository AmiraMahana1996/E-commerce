import {
  Button,
  DialogContent,
  DialogTitle,
  Dropdown,
  FormControl,
  FormLabel,
  Input,
  MenuButton,
  ModalDialog,
  Stack,
  Modal,
  Card,
  CardContent,
  Typography,
} from "@mui/joy";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Implementation() {
  const [open, setOpen] = React.useState({ status: false, levelid: "" });
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    code: "",
    image: "",
  });
  const location = useLocation();

  const path = location.pathname.split("/");

  const [data, setData] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/learning/getbyid/${path[4]}`
      );
      console.log(response.data.topics, "explanation");

      const filteredArray = response.data.topics.filter((obj) => {
        console.log(obj._id === path[5]);
        return obj._id === path[5];
      });

      const filteredArraysubtopics = filteredArray[0].subTopic.filter((obj) => {
        console.log(obj._id === path[5]);
        return obj._id === path[6];
      });
      console.log(response.data.topics, "filteredArrayfilteredArray");
      console.log(path[5], filteredArraysubtopics[0], "dd");
      // setGramatik(filteredlessons[0].gramatik);
      setData(filteredArraysubtopics[0]);
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
      case "title":
        setFormData((prevFormData) => ({
          ...prevFormData,
          title: value,
        }));
        break;
      case "text":
        setFormData((prevFormData) => ({
          ...prevFormData,
          text: value,
        }));
        break;
      case "code":
        setFormData((prevFormData) => ({
          ...prevFormData,
          code: value,
        }));
        break;

      case "image":
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: value,
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
      `http://localhost:5000/api/learning/addSubtopiceimplementation/${path[4]}/${path[5]}/${path[6]}`,
      formData
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
        >
          Add Implementation
        </MenuButton>
      </Dropdown>
      <br />
      <br />
      {data?.implementation?.map((explaination) => (
        <Card variant="soft">
          <CardContent>
            <Typography color="danger" level="h2">
              {explaination.title}
            </Typography>
            <Typography color="primary"> {explaination.text}</Typography>

            <Typography color="sucsess">code: {explaination.code}</Typography>
            <Typography color="sucsess"> {explaination.image}</Typography>
          </CardContent>
        </Card>
      ))}

      <Modal open={open.status} onClose={() => setOpen({ status: false })}>
        <ModalDialog>
          <DialogTitle>Add new Word</DialogTitle>
          <DialogContent>Fill in the information of the Word.</DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>title</FormLabel>
                <Input
                  name="title"
                  type="text"
                  onChange={handelChange}
                  value={formData.title}
                  autoFocus
                  placeholder="title"
                />
              </FormControl>

              <FormControl>
                <FormLabel>text</FormLabel>
                <Input
                  name="text"
                  type="text"
                  onChange={handelChange}
                  value={formData.text}
                  autoFocus
                  placeholder="text"
                />
              </FormControl>

              <FormControl>
                <FormLabel>code</FormLabel>
                <Input
                  name="code"
                  type="text"
                  onChange={handelChange}
                  value={formData.code}
                  autoFocus
                  placeholder="code"
                />
              </FormControl>

              <FormControl>
                <FormLabel>image</FormLabel>
                <Input
                  name="image"
                  type="text"
                  onChange={handelChange}
                  value={formData.image}
                  autoFocus
                  placeholder="image"
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
