import {
  Button,
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
} from "@mui/joy";
import axios from "axios";
import React, { useState } from "react";

export default function Linkedin() {
  const [open, setOpen] = React.useState({ status: false, levelid: "" });

  const [formData, setFormData] = useState({
    title: "",
    translation: "",
    phrase: "",
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
    await axios.put(`http://localhost:5000/api/language/addword/`, formData);
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

      <Modal open={open.status} onClose={() => setOpen({ status: false })}>
        <ModalDialog>
          <DialogTitle>Add new Word</DialogTitle>
          <DialogContent>Fill in the information of the Word.</DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Select defaultValue="dog" name="title" onChange={handelChange}>
                <Option value="amira">amira</Option>
      
              </Select>
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
