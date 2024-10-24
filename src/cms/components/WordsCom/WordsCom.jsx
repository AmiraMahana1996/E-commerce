import { Menu, MenuButton, Modal } from '@mui/joy'
import { Button, DialogContent, DialogTitle, Dropdown, FormControl, FormLabel, Input, MenuItem, ModalDialog, Stack } from '@mui/joy'
import axios from 'axios';
import React, { useState } from 'react'

export default function WordsCom({lessonid,levelidd}) {
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
        console.log(formData);
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        setOpen({ status: false });
        console.log(formData, "pathId");
        await axios.put(
          `http://localhost:5000/api/language/addlesson/${levelidd}/${lessonid}`,
          formData
        );
        console.log(open, "oppen");
      };

  return (
   <>
       <Dropdown>
        <MenuButton
          variant="solid"
          color="primary"
          onClick={() => setOpen({status: true})}
        >
          Add Word
        </MenuButton>
   
      </Dropdown>

      <Modal open={open.status} onClose={() => setOpen({ status: false })}>
        <ModalDialog>
          <DialogTitle>Add new Word</DialogTitle>
          <DialogContent>
            Fill in the information of the Word.
          </DialogContent>
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
  )
}
