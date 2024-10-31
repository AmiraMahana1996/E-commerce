import { Box, Button, Card, CardContent, DialogContent, DialogTitle, Dropdown, FormControl, FormLabel, Input, MenuButton, Modal, ModalDialog, Stack, Switch, Typography } from "@mui/joy";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function TopicDetails() {
  const [open, setOpen] = React.useState({ status: false, levelid: "" });
  const [formData, setFormData] = useState({
    title: "",
    subtopicExpliant:""
  });

  const [data, setData] = useState([]);
  const location = useLocation();

  const path = location.pathname.split("/");
console.log(path,"pathpath")



const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/learning/getbyid/${path[4]}`
      );
      console.log(response.data.topics);
     
      const filteredArray =response.data.topics.filter(
        (obj) => {
            
            console.log(obj._id === path[5])
           return obj._id === path[5]
        }
      );
      setData(filteredArray[0].subTopic);
      console.log(filteredArray,"filteredArray")
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
      case "title":
        setFormData((prevFormData) => ({
          ...prevFormData,
          title: value,
        }));
        break;

        case "subtopicExpliant":
          setFormData((prevFormData) => ({
            ...prevFormData,
            subtopicExpliant: value,
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
      `http://localhost:5000/api/learning/addSubtopic/${path[4]}/${path[5]}`,
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
          Add Subtopic
        </MenuButton>
      </Dropdown>

      <br />
      <br />

      <Box
        sx={{
          width: "100%",
          maxWidth: 1000,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 2,
        }}
      >
        {data?.map((item) => (
          <>
            <Card variant="soft">
              <CardContent>
                <Typography color="danger" level="h2">
                  {item.title}
                </Typography>
           
                <Typography color="secandary">
                  Explain: {item.subtopicExpliant}
                </Typography>
                <Switch checked={true} />
                <br />

          

                <Button type="secondary">
                  <a href={`/cms/learning/learning-details/${path[4]}/${path[5]}/${item._id}`} className="continuebtn">
                    Continue..
                  </a>
                </Button>
              </CardContent>
            </Card>
          </>
        ))}
      </Box>
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
                <FormLabel>subtopicExpliant</FormLabel>
                <Input
                  name="subtopicExpliant"
                  type="text"
                  onChange={handelChange}
                  value={formData.subtopicExpliant}
                  autoFocus
                  placeholder="subtopicExpliant"
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
