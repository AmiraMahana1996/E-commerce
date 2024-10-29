
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
export default function Expense() {
    const [open, setOpen] = React.useState({ status: false, levelid: "" });
    const [formData, setFormData] = useState({
      title: "",
      type: "",
      amount: 0,

    });
    const [data, setData] = useState([]);
    const [total, settotal] = useState([]);
    const [totalincome, settotalIncome] = useState([]);
  
    // GET Request - Fetch all Products
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/finance/all`);
        console.log(response.data, "response.ss");
  
        setData(response.data[0]?.expense);
        settotal(response.data[0]?.totalExpense)
        settotalIncome(response.data[0]?.totalIncome)
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
        case "amount":
          setFormData((prevFormData) => ({
            ...prevFormData,
            amount: Number(value),
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
        `http://localhost:5000/api/finance/addexpense/${formData.title}`,
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
            Add Expense
          </MenuButton>
        </Dropdown>
  <br/>
  <br/>
        {/* incoem */}
        {data?.map((income) => (
               <>
             <Stack>
             <Typography level="title-lg" fontWeight="bold" color="Primary">
                Type:  {income.type}
               </Typography>
               <br/>
  
               <Typography level="title-lg" fontWeight="bold" color="danger">
               Amount:   -{income.amount}
               </Typography>
               <br/>
  
         
             </Stack>
             <Divider/>
             </>
        ))}
                    <Typography level="title-lg" fontWeight="bold" color="danger">
               Total:   {total}
               </Typography>
               <br/>
               <br/>
               <Typography level="title-lg" fontWeight="bold" color="danger">
               Net:   {totalincome-total}
           
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
                  <FormLabel>amount</FormLabel>
                  <Input
                    name="amount"
                    type="text"
                    onChange={handelChange}
                    value={formData.amount}
                    autoFocus
                    placeholder="amount"
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
