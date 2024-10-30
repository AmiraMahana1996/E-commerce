import { Button, Card, CardContent, DialogContent, DialogTitle, Dropdown, FormControl, FormLabel, Input, MenuButton, Modal, ModalDialog, Stack, Typography } from '@mui/joy'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function MarketingPlan() {
    const [open, setOpen] = React.useState({ status: false, levelid: "" });
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        title: "",

    });


      // GET Request - Fetch all Products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/marketing/all`
      );
      setData(response.data);
      console.log(response.data, "linkedin");
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
    
     
        default:
          // Handle other fields
          break;
      }
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setOpen({ status: false });
      console.log(formData, "formData");
      await axios.post(
        `http://localhost:5000/api/marketing/add/`,
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
      Add MarketingPlan
    </MenuButton>
  </Dropdown>
  <br/>
  <br/>

  {data?.map((item) => (
          <>
            <Card variant="soft">
              <CardContent>
                <Typography color="warning" level="h4">
                  Type: {item.title}
                </Typography>
         
              </CardContent>
            </Card>
          </>
        ))}

  <Modal open={open.status} onClose={() => setOpen({ status: false })}>
    <ModalDialog>
      <DialogTitle>Add new marketing Plan</DialogTitle>
      <DialogContent>Fill in the information of the Word.</DialogContent>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Word</FormLabel>
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
  )
}
