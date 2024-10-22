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
const Land = () => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({ title: "" });
  const [data, setData] = useState([]);

  const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography["body-sm"],
    padding: theme.spacing(1),
    textAlign: "center",
    borderRadius: 4,
    color: theme.vars.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.background.level1,
    }),
  }));

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
  const handelChange = (e) => {
    const { title, value } = e.target;
    console.log(title, value);
    console.log(open, "oppen");
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

      <Box sx={{ flexGrow: 1, p: 2, bgcolor: "background.surface" }}>
        <Grid
          className="mainGrid"
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ flexGrow: 1 }}
        >
          {data.map((item,index) => (
            <Grid size={4}  key={index}>
              <Item>
                {" "}
                <CardCMS  item={item} />
              </Item>
            </Grid>
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
