import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Add,
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
  Grid,
  styled,
  Sheet,
} from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CardCMS from "../card/CardCMS";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardActions from "@mui/material/CardActions";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CardMedia from "@mui/material/CardMedia";
import { useLocation } from "react-router-dom";
const Land = () => {
  const [open, setOpen] = React.useState(false);
  const [openLevelForm, setopenLevelForm] = React.useState({status:false,id:''});
  const [formData, setFormData] = useState({ title: "" });
  const [data, setData] = useState([]);
  const location = useLocation();
  const path = location.pathname.split("/");
  console.log(path)
  // GET Request - Fetch all Products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/language/language`
      );
      console.log(response.data);
      setData(response.data);
    } catch (err) {}
  };

  // Load posts when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(false);
    console.log(open, "oppen");
    await axios.post("http://localhost:5000/api/language/add", formData);
    console.log(open, "oppen");
  };

  const handleSubmitLevel = async (event) => {
    event.preventDefault();
    setopenLevelForm({status:false});
  
    await axios.put(`http://localhost:5000/api/language/addleveltitle/${openLevelForm.id}`, formData);
    console.log(formData,"formData")
    console.log(open, "oppen");
  };
  const handelChange = (e) => {
    const { title, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      title: value,
    }));
  };

  const handelChangeLevel = (e) => {
    console.log(openLevelForm,"openLevelForm")
    const { title, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      title: value,
    }));
  };
  return (
    <>
      <Dropdown>
        <MenuButton
          variant="solid"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Add Language
        </MenuButton>
        <Menu variant="soft" color="primary">
          <MenuItem>German</MenuItem>
          <MenuItem>English</MenuItem>
        </Menu>
      </Dropdown>

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
          {data.map((item, index) => (
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
                <a href={`/cms/langdetails/${item._id}`}>
                  <Button size="small" sx={{ padding: "10px 15px" }}>
                    Learn More
                  </Button>
                </a>

                <Button
                  size="small"
                  sx={{ padding: "10px 15px" }}
                  onClick={() => setopenLevelForm({status:true,id:item._id})}
                >
                  Add Level
                </Button>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Create new language</DialogTitle>
          <DialogContent>
            Fill in the information of the language.
          </DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  name="title"
                  type="text"
                  onChange={handelChange}
                  value={formData.title}
                  autoFocus
                  placeholder="Title"
                />
              </FormControl>

              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>

      <Modal open={openLevelForm.status} onClose={() => setopenLevelForm({status:false})}>
        <ModalDialog>
          <DialogTitle>Create new Level</DialogTitle>
          <DialogContent>
            Fill in the information of the language.
          </DialogContent>
          <form onSubmit={handleSubmitLevel}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  name="title"
                  type="text"
                  onChange={handelChangeLevel}
                  value={formData.title}
                  autoFocus
                  placeholder="Level"
                />
              </FormControl>

              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
      {/* 
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          position: "relative",
          mt: 4, // Add margin-top to make room for the button
        }}
      >
        <CardContent>
          <Typography level="h3">Card Title</Typography>
          <Typography></Typography>
        </CardContent>
      </Card> */}
    </>
  );
};

export default Land;
