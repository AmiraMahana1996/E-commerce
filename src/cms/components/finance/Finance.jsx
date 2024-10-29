import { Home, Person, Settings } from "@mui/icons-material";
import {
  Button,
  Card,
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
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import WordsCom from "../WordsCom/WordsCom";
import Income from "../Income/Income";
import axios from "axios";
import Expense from "../expense/Expense";

export default function Finance() {
  const [iconTab, setIconTab] = React.useState(0);
  const [open, setOpen] = React.useState({ status: false, levelid: "" });
  const [totalIncome, settotalIncome] = React.useState(0);
  const [totalExpense, settotalExpense] = React.useState(0);
  const [formData, setFormData] = useState({
    title: "",
  });

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

      default:
        // Handle other fields
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen({ status: false });
    console.log(formData, "formData");
    await axios.post(`http://localhost:5000/api/finance/add`, formData);
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
          Add New Finance
        </MenuButton>
      </Dropdown>
      <br />
      <br />

      <Card className="p-4">
        <Typography className="mb-2 font-semibold">Lesson</Typography>
        <Tabs
          value={iconTab}
          onChange={(event, value) => setIconTab(value)}
          className="bg-white"
        >
          <TabList>
            <Tab>
              <Home className="mr-2 h-4 w-4" />
              Income
            </Tab>
            <Tab>
              <Settings className="mr-2 h-4 w-4" />
              Expense
            </Tab>
            <Tab>
              <Settings className="mr-2 h-4 w-4" />
              Saving
            </Tab>
          </TabList>
          <TabPanel value={0}>
            <div className="p-4">
              <Typography>
                <Income />
              </Typography>
            </div>
          </TabPanel>
          <TabPanel value={1}>
            <div className="p-4">
              <Typography>
                <Expense />
              </Typography>
            </div>
          </TabPanel>
          <TabPanel value={2}>
            <div className="p-4">
              <Typography>ss</Typography>
            </div>
          </TabPanel>
          <TabPanel value={3}>
            <div className="p-4">
              <Typography>ss</Typography>
            </div>
          </TabPanel>
          <TabPanel value={4}>
            <div className="p-4">
              <Typography>ss</Typography>
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

              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}
