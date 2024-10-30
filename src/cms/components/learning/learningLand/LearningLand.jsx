import {
  Box,
  Button,
  Card,
  CardContent,
  DialogContent,
  DialogTitle,
  Dropdown,
  FormControl,
  FormLabel,
  Input,
  MenuButton,
  Modal,
  ModalDialog,
  Stack,
  Switch,
  Typography,
} from "@mui/joy";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css"
export default function LearningLand() {
  const [open, setOpen] = React.useState({ status: false, levelid: "" });
  const [formData, setFormData] = useState({
    title: "",
    durationToLearn: "",
  });
  const [data, setData] = useState([]);

  // GET Request - Fetch all Products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/learning/all`
      );

      setData(response.data);
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
      case "durationToLearn":
        setFormData((prevFormData) => ({
          ...prevFormData,
          durationToLearn: value,
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
    await axios.post(`http://localhost:5000/api/learning/add`, formData);
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
          Add Learning
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
                <Typography color="primary">
                  Topic: {item.durationToLearn}
                </Typography>
                <Switch checked={true} />
                <br/>
                <br/>
              
                <Button type="secondary"><a href={`/cms/learning/learning-details/${item._id}`} className="continuebtn">Continue..</a></Button>
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
                <FormLabel>durationToLearn</FormLabel>
                <Input
                  name="durationToLearn"
                  type="text"
                  onChange={handelChange}
                  value={formData.durationToLearn}
                  autoFocus
                  placeholder="durationToLearn"
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
