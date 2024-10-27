
import { LightbulbOutlined } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Box, Button, Card, Chip, DialogContent, DialogTitle, Dropdown, FormControl, FormLabel, IconButton, Input, MenuButton, Modal, ModalDialog, Stack, Typography } from '@mui/joy';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Gramatik({ lessonid, levelidd, languageid }) {
    const [open, setOpen] = useState({ status: false, levelid: "" });
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        explaination: "",
        examples: "",
    });

    // GET Request - Fetch all Products
    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/language/language`
            );
            console.log(response.data);
            const filteredArray = response.data.filter(
                (obj) => {

                    console.log(obj._id === languageid)
                    return obj._id === languageid
                }
            );
            console.log(filteredArray[0].levels)
            const filteredlevel = filteredArray[0].levels.filter(
                (obj) => {
                    console.log(obj._id === levelidd)
                    return obj._id === levelidd
                }
            );

            const filteredlessons = filteredlevel[0].lessons.filter(
                (obj) => {
                    console.log(obj._id === lessonid)
                    return obj._id === lessonid
                }
            );
            setData(filteredlessons[0].gramatik);

        } catch (err) { }
    };

    // Load posts when component mounts
    useEffect(() => {
        fetchProducts();
    }, []);


    const handelChange = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        switch (fieldName) {
            case "name":
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    name: value,
                }));
                break;
            case "explaination":
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    explaination: value,
                }));
                break;
            case "examples":
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    examples: value,
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
            `http://localhost:5000/api/language/addgramatik/${languageid}/${levelidd}/${lessonid}`,
            formData
        );
        console.log(open, "oppen");
    };




    return (
        <>
            <Dropdown sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 1,
                mt: 2
            }}>
                <MenuButton
                    variant="solid"
                    color="primary"

                    onClick={() => setOpen({ status: true })}
                >
                    Add Gramatik
                </MenuButton>

            </Dropdown>

<br></br>
<br></br>

            <AccordionGroup
        sx={{
         
        }}
      >
        {data.map((grammarItem) => (
          <Accordion key={grammarItem._id}>
            <AccordionSummary>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                width: '100%'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography level="title-lg">{grammarItem.name}</Typography>
                  <Chip size="sm" variant="soft" color="primary">
                    {grammarItem.level}
                  </Chip>
                </Box>
               
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Explanation */}
                <Card variant="soft">
                  <Typography level="title-md" startDecorator={<LightbulbOutlined />}>
                    Explanation
                  </Typography>
                  <Typography level="body-md">
                    {grammarItem.explaination}
                  </Typography>
                  <Typography level="body-md" sx={{ color: 'text.secondary', mt: 1 }}>
                  explanationTranslate
                  </Typography>
                </Card>

          

              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </AccordionGroup>

      <Modal open={open.status} onClose={() => setOpen({ status: false })}>
        <ModalDialog>
          <DialogTitle>Add new gramatik</DialogTitle>
          <DialogContent>
            Fill in the information of the Word.
          </DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Gramatik</FormLabel>
                <Input
                  name="name"
                  type="text"
                  onChange={handelChange}
                  value={formData.name}
                  autoFocus
                  placeholder="Word"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Translation</FormLabel>
                <Input
                  name="explaination"
                  type="text"
                  onChange={handelChange}
                  value={formData.explaination}
                  autoFocus
                  placeholder="Translation"
                />
              </FormControl>

              <FormControl>
                <FormLabel>examples</FormLabel>
                <Input
                  name="examples"
                  type="text"
                  onChange={handelChange}
                  value={formData.examples}
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
