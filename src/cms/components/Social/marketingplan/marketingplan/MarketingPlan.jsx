import { Button, DialogContent, DialogTitle, Dropdown, FormControl, FormLabel, Input, MenuButton, Modal, ModalDialog, Stack } from '@mui/joy'
import axios from 'axios';
import React, { useState } from 'react'

export default function MarketingPlan() {
    const [open, setOpen] = React.useState({ status: false, levelid: "" });

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
