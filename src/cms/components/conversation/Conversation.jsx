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
} from "@mui/joy";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css"
export default function Conversation({ lessonid, levelidd, languageid }) {
  const [open, setOpen] = React.useState({ status: false, levelid: "" });
  const [data, setData] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    personA: "",
    personATranslate: "",
    flag: "",
  });

  // GET Request - Fetch all Products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/language/language`
      );
      console.log(response.data, "response.data");
      const filteredArray = response.data.filter((obj) => {
        console.log(obj._id === languageid);
        return obj._id === languageid;
      });
      console.log(filteredArray[0].levels);
      const filteredlevel = filteredArray[0].levels.filter((obj) => {
        console.log(obj._id === levelidd);
        return obj._id === levelidd;
      });

      const filteredlessons = filteredlevel[0].lessons.filter((obj) => {
        console.log(obj._id === lessonid);
        return obj._id === lessonid;
      });
      console.log(filteredlessons[0].words, "filteredlessons[0].words");
      setData(filteredlessons[0].conversations);
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
      case "personA":
        setFormData((prevFormData) => ({
          ...prevFormData,
          personA: value,
        }));
        break;
      case "personATranslate":
        setFormData((prevFormData) => ({
          ...prevFormData,
          personATranslate: value,
        }));
        break;
      case "flag":
        setFormData((prevFormData) => ({
          ...prevFormData,
          flag: value,
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
      `http://localhost:5000/api/language/addCon/${languageid}/${levelidd}/${lessonid}`,
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
          Add conversation
        </MenuButton>
      </Dropdown>
      <br />
      <br />
      <div className="space-y-4">
        {data.map((entry) => (
          <div
            key={entry._id}
            className="group hover:bg-gray-50 p-3 rounded-lg transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                  <bold>
                    <span className="font-large text-gray-900 person">
                      {entry.title}
                    </span>
                  </bold>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <bold>
                    <span className="font-large text-gray-900 persont">
                      {entry.personA}
                    </span>
                    <p className="text-gray-700 leading-relaxed persontext">
                  {entry.personATranslate}
                </p>
                  </bold>
                </div>

          
                {entry.flag && (
                  <>
                    <Divider />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

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
                  placeholder="Word"
                />
              </FormControl>

              <FormControl>
                <FormLabel>personA</FormLabel>
                <Input
                  name="personA"
                  type="text"
                  onChange={handelChange}
                  value={formData.personA}
                  autoFocus
                  placeholder="Translation"
                />
              </FormControl>

              <FormControl>
                <FormLabel>personATranslate</FormLabel>
                <Input
                  name="personATranslate"
                  type="text"
                  onChange={handelChange}
                  value={formData.personATranslate}
                  autoFocus
                  placeholder="Phrase"
                />
              </FormControl>

              <FormControl>
                <FormLabel>flag</FormLabel>
                <Input
                  name="flag"
                  type="text"
                  onChange={handelChange}
                  value={formData.flag}
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
