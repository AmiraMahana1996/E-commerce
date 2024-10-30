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
import Box from '@mui/material/Box';

import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';

export default function Steps() {
  const [open, setOpen] = React.useState({ status: false, levelid: "" });
  const [formData, setFormData] = useState({
    number: 0,
    title: "",
    command: "",
    image: "",
    code: "",
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
      case "number":
        setFormData((prevFormData) => ({
          ...prevFormData,
          number: value,
        }));
        break;
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
      case "command":
        setFormData((prevFormData) => ({
          ...prevFormData,
          command: value,
        }));
        break;

      case "image":
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: value,
        }));
        break;
      case "code":
        setFormData((prevFormData) => ({
          ...prevFormData,
          code: value,
        }));
        break;

      default:
        // Handle other fields
        break;
    }
  };
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen({ status: false });
    console.log(formData, "formData");
    await axios.put(
      `http://localhost:5000/api/learning/addSubtopicestep/${path[4]}/${path[5]}/${path[6]}`,
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
          Add Step
        </MenuButton>
      </Dropdown>
      <br />
      <br />
      <Box sx={{ maxWidth: 400 }}>

 
    </Box>
    <Stepper orientation="vertical" sx={{ width: 200 }}>
    {data?.steps?.map((item) => (
            <Step
            indicator={
              <StepIndicator variant="solid" color="neutral">
                {item.number}
              </StepIndicator>
            }
          >
            {item.title}
            <Typography color="danger" level="h4">
              {item.text}
            </Typography>
            <Typography color="danger" level="h4">
              {item.code}
            </Typography>
          </Step>
    ))} 
  
 
      </Stepper>
      {/* {data?.steps?.map((explaination) => (
      
      ))} */}

      <Modal open={open.status} onClose={() => setOpen({ status: false })}>
        <ModalDialog>
          <DialogTitle>Add new Word</DialogTitle>
          <DialogContent>Fill in the information of the Word.</DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>

            <FormControl>
                <FormLabel>Number</FormLabel>
                <Input
                  name="number"
                  type="text"
                  onChange={handelChange}
                  value={formData.number}
                  autoFocus
                  placeholder="number"
                />
              </FormControl>
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
                <FormLabel>command</FormLabel>
                <Input
                  name="command"
                  type="text"
                  onChange={handelChange}
                  value={formData.command}
                  autoFocus
                  placeholder="command"
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
