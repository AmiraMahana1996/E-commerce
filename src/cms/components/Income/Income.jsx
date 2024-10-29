import {
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  Dropdown,
  FormControl,
  FormLabel,
  Input,
  MenuButton,
  Modal,
  ModalDialog,
  Stack,
  Typography,
} from "@mui/joy";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Income() {
  const [open, setOpen] = React.useState({ status: false, levelid: "" });
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    balance: 0,
    period: "",
  });
  const [data, setData] = useState([]);
  const [total, settotal] = useState([]);
  const [totalexpense, setotalexpense] = useState([]);
  // GET Request - Fetch all Products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/finance/all`);
      console.log(response.data[0], "response.data");

      setData(response.data[0].income);
      settotal(response.data[0]?.totalIncome);
      setotalexpense(response.data[0]?.totalExpense);
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
      case "type":
        setFormData((prevFormData) => ({
          ...prevFormData,
          type: value,
        }));
        break;
      case "balance":
        setFormData((prevFormData) => ({
          ...prevFormData,
          balance: Number(value),
        }));
        break;
      case "period":
        setFormData((prevFormData) => ({
          ...prevFormData,
          period: value,
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
      `http://localhost:5000/api/finance/addincome/${formData.title}`,
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
          Add Income
        </MenuButton>
      </Dropdown>
      <br />
      <br />
      {/* incoem */}

      {data.map((income) => (
        <>
          <Stack>
            <Typography level="title-lg" fontWeight="bold" color="Primary">
              Type: {income.type}
            </Typography>
            <br />

            <Typography level="title-lg" fontWeight="bold" color="danger">
              Balance: {income.balance}
            </Typography>
            <br />

            <Typography level="title-lg" fontWeight="bold" color="error">
              Period: {income.period}
            </Typography>
          </Stack>
          <Divider />
        </>
      ))}

      <Typography level="title-lg" fontWeight="bold" color="danger">
        Total: {total}
      </Typography>
      <br/>
      <br/>

      <Typography level="title-lg" fontWeight="bold" color="danger">
      Net:   {total-totalexpense}
      </Typography>
      {/* Modal */}

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
                <FormLabel>balance</FormLabel>
                <Input
                  name="balance"
                  type="text"
                  onChange={handelChange}
                  value={formData.balance}
                  autoFocus
                  placeholder="balance"
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

              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}
