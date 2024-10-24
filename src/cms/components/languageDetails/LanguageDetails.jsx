import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Modal,
  ModalDialog,
  Stack,
  Typography,
} from "@mui/joy";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useSearchParams } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
export default function LanguageDetails() {
  const [open, setOpen] = React.useState({ status: false, levelid: "" });
  const location = useLocation();
  const [formData, setFormData] = useState({
    title: "",
    number: "",
    image: "",
  });
  const pathId = location.pathname.split("/").pop();
  console.log(pathId);
  const [data, setData] = useState([]);
  // GET Request - Fetch all Products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/language/getone/${pathId}`
      );
      console.log(response.data);
      setData(response.data);
      console.log(data);
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
      case "number":
        setFormData((prevFormData) => ({
          ...prevFormData,
          number: value,
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
    console.log(formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen({ status: false });
    console.log(formData, "pathId");
    await axios.put(
      `http://localhost:5000/api/language/addlesson/${pathId}/${open.levelid}`,
      formData
    );
    console.log(open, "oppen");
  };
  console.log(open.levelid,"open.levelid")
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          bgcolor: "background.surface",
          padding: "30px",
        }}
      >
        <Grid
          className="mainGrid"
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ flexGrow: 1 }}
        >
          {data.levels?.map((item, index) => (
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image="/deutsch.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                {/* <a href={`/cms/lessonDetails/${pathId}/${item._id}`}> */}
                <a href={`/cms/alllessons/${pathId}/${item._id}`}>
                  <Button size="small" sx={{ padding: "10px 15px" }}>
                    Learn More
                  </Button>
                </a>

                <Button
                  size="small"
                  sx={{ padding: "10px 15px" }}
                  onClick={() => setOpen({ status: true, levelid: item._id })}
                >
                  Add Lesson
                </Button>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </Box>
      <Modal open={open.status} onClose={() => setOpen({ status: false })}>
        <ModalDialog>
          <DialogTitle>Create new language</DialogTitle>
          <DialogContent>
            Fill in the information of the language.
          </DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  type="text"
                  onChange={handelChange}
                  value={formData.title}
                  autoFocus
                  placeholder="Title"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Number</FormLabel>
                <Input
                  name="number"
                  type="text"
                  onChange={handelChange}
                  value={formData.number}
                  autoFocus
                  placeholder="Number"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input
                  name="image"
                  type="text"
                  onChange={handelChange}
                  value={formData.image}
                  autoFocus
                  placeholder="Image"
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
