import { Home, Input, Settings } from "@mui/icons-material";
import {
  Button,
  Card,
  DialogContent,
  DialogTitle,
  Dropdown,
  FormControl,
  FormLabel,
  MenuButton,
  Modal,
  ModalDialog,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";
import Workout from "./Workout";
import axios from "axios";

export default function Health() {
  const [iconTab, setIconTab] = React.useState(0);
  const [open, setOpen] = React.useState({ status: false, levelid: "" });

  const [formData, setFormData] = useState({
    word: "",
    translation: "",
    phrase: "",
  });

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
      `http://localhost:5000/api/language/addword/`,
      formData
    );
    console.log(open, "oppen");
  };







  return (
    <>
      <br />
      <Card className="p-4">
        <Typography className="mb-2 font-semibold">To be healthy</Typography>
        <Tabs
          value={iconTab}
          onChange={(event, value) => setIconTab(value)}
          className="bg-white"
        >
          <TabList>
            <Tab>
              <Home className="mr-2 h-4 w-4" />
              Workout
            </Tab>
            <Tab>
              <Settings className="mr-2 h-4 w-4" />
              Skin Care
            </Tab>
            <Tab>
              <Settings className="mr-2 h-4 w-4" />
              Body Care
            </Tab>
            <Tab>
              <Settings className="mr-2 h-4 w-4" />
              Hair Care
            </Tab>
            <Tab>
              <Settings className="mr-2 h-4 w-4" />
              Vitamins
            </Tab>
            <Tab>
              <Settings className="mr-2 h-4 w-4" />
              Self-education
            </Tab>
            <Tab>
              <Settings className="mr-2 h-4 w-4" />
              New Plan
            </Tab>
          </TabList>
          <TabPanel value={0}>
            <div className="p-4">
              <Typography>
                <Workout />
              </Typography>
            </div>
          </TabPanel>
          <TabPanel value={1}>
            <div className="p-4">
              <Typography></Typography>
            </div>
          </TabPanel>
          <TabPanel value={2}>
            <div className="p-4">
              <Typography></Typography>
            </div>
          </TabPanel>
          <TabPanel value={3}>
            <div className="p-4">
              <Typography></Typography>
            </div>
          </TabPanel>
          <TabPanel value={4}>
            <div className="p-4">
              <Typography></Typography>
            </div>
          </TabPanel>
          <TabPanel value={5}>
            <div className="p-4">
              <Typography></Typography>
            </div>
          </TabPanel>
          <TabPanel value={6}>
            <div className="p-4">
              <Typography>
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
                    Add New Plan
                  </MenuButton>
                </Dropdown>
              </Typography>
            </div>
          </TabPanel>
        </Tabs>
      </Card>

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
    </>
  );
}
