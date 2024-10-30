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
  Option,
  Select,
  Stack,
  Switch,
  Typography,
} from "@mui/joy";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function SocialCom({ api, get }) {
  const [open, setOpen] = React.useState({ status: false, levelid: "" });
  const [data, setData] = useState([]);
  const [plan, setplan] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    topic: "",
    content: "",
    idia: "",
    period: "",
    timeToPost: "",
  });
  const [selectedValue, setSelectedValue] = React.useState("aa");
  // GET Request - Fetch all Products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/marketing/all`
      );
      setData(response.data[0][get]);
      setplan(response.data);
      console.log(response.data);
      // setGramatik(filteredlessons[0].gramatik);
    } catch (err) {}
  };

  // Load posts when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const handelChange = (e) => {
    if (e) {
      const fieldName = e.target.name;
      const value = e.target.value;
      switch (fieldName) {
        case "type":
          setFormData((prevFormData) => ({
            ...prevFormData,
            type: value,
          }));
          break;
        case "topic":
          setFormData((prevFormData) => ({
            ...prevFormData,
            topic: value,
          }));
          break;
        case "content":
          setFormData((prevFormData) => ({
            ...prevFormData,
            content: value,
          }));
          break;
        case "idia":
          setFormData((prevFormData) => ({
            ...prevFormData,
            idia: value,
          }));
          break;
        case "period":
          setFormData((prevFormData) => ({
            ...prevFormData,
            period: value,
          }));
          break;
        case "timeToPost":
          setFormData((prevFormData) => ({
            ...prevFormData,
            timeToPost: value,
          }));
          break;
        default:
          setFormData((prevFormData) => ({
            ...prevFormData,
            title: e.target.textContent,
          }));
          break;
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen({ status: false });
    console.log(formData, "formData");
    await axios.put(`http://localhost:5000/api/marketing/${api}`, formData);
    console.log(open, "oppen");
  };
  const [checked, setChecked] = React.useState(false);
  const handelDonePosts = async (e, item) => {
    setChecked(!checked);
    console.log(e.target.value, item, !checked);
    console.log(`http://localhost:5000/api/marketing/done/aa/${item._id}`);
    await axios.put(
      `http://localhost:5000/api/marketing/updatedone/aa/${item._id}`,
      { status: !checked, platform: get }
    );
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
        onClick={() => setOpen({ status: true })}
      >
        <MenuButton
          variant="solid"
          color="primary"
          onClick={() => setOpen({ status: true })}
        >
          Add Content
        </MenuButton>
      </Dropdown>
      <br />
      <br />

      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 2,
        }}
      >
        {data?.map((item) => (
          <>
            <Card variant="soft">
              <CardContent>
                <Typography color="warning" level="h4">
                  Type: {item.type}
                </Typography>
                <Typography color="primary">Topic: {item.topic}</Typography>
                <Typography color="primary">content: {item.content}</Typography>
                <Typography color="primary">Period: {item.period}</Typography>
                <Typography color="primary">
                  Time To Post: {item.timeToPost}
                </Typography>
                <Switch
                  checked={item.done}
                  onChange={(e) => handelDonePosts(e, item)}
                />
              </CardContent>
            </Card>
          </>
        ))}
      </Box>

      <Modal open={open.status} onClose={() => setOpen({ status: false })}>
        <ModalDialog>
          <DialogTitle>Add new topic</DialogTitle>
          <DialogContent>Fill in the information of the Word.</DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Select name="title" onChange={handelChange}>
                {plan.map((item) => (
                  <Option value={item.title}>{item.title}</Option>
                ))}
              </Select>

              <FormControl>
                <FormLabel>type</FormLabel>
                <Input
                  name="type"
                  type="text"
                  onChange={handelChange}
                  value={formData.type}
                  autoFocus
                  placeholder="type"
                />
              </FormControl>

              <FormControl>
                <FormLabel>topic</FormLabel>
                <Input
                  name="topic"
                  type="text"
                  onChange={handelChange}
                  value={formData.topic}
                  autoFocus
                  placeholder="topic"
                />
              </FormControl>

              <FormControl>
                <FormLabel>content</FormLabel>
                <Input
                  name="content"
                  type="text"
                  onChange={handelChange}
                  value={formData.content}
                  autoFocus
                  placeholder="content"
                />
              </FormControl>

              <FormControl>
                <FormLabel>idia</FormLabel>
                <Input
                  name="idia"
                  type="text"
                  onChange={handelChange}
                  value={formData.idia}
                  autoFocus
                  placeholder="idia"
                />
              </FormControl>
              <FormControl>
                <FormLabel>period</FormLabel>
                <Input
                  name="period"
                  type="text"
                  onChange={handelChange}
                  value={formData.period}
                  autoFocus
                  placeholder="period"
                />
              </FormControl>
              <FormControl>
                <FormLabel>timeToPost</FormLabel>
                <Input
                  name="timeToPost"
                  type="text"
                  onChange={handelChange}
                  value={formData.timeToPost}
                  autoFocus
                  placeholder="timeToPost"
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
