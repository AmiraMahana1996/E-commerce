import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  Input,
  Typography,
} from "@mui/joy";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function QuizWords() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [show, setShow] = useState({ id: "", show: false });
  const [score, setScore] = useState(0);
  const [answerTrue, setanswerTrue] = useState({ id: "", answer: false });
  const path = location.pathname.split("/");
  const languageid = path[4];
  const levelid = path[5];
  const lessonid = path[6];
  console.log(path, "path");
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/language/language`
      );

      const filteredArray = response.data.filter((obj) => {
        console.log(obj._id === languageid);
        return obj._id === languageid;
      });
      console.log(filteredArray[0].levels);
      const filteredlevel = filteredArray[0].levels.filter((obj) => {
        console.log(obj._id === levelid);
        return obj._id === levelid;
      });

      const filteredlessons = filteredlevel[0].lessons.filter((obj) => {
        console.log(obj._id === lessonid);
        return obj._id === lessonid;
      });
      console.log(filteredlessons[0], "filteredlessons[0].words");
      setData(filteredlessons[0].wordsQuiz);
      // setGramatik(filteredlessons[0].gramatik);
    } catch (err) {}
  };

  // Load posts when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const handelAnswer = (e, wordItem, id) => {
    console.log(
      wordItem,
      id,
      e.target.value === wordItem.answer && id === wordItem.id
    );

    if (e.target.value === wordItem.answer && id === wordItem._id) {
      setanswerTrue({ id: id, answer: true });
      setScore(score + 1);
    } else {
      setanswerTrue({ answer: true });
    }
  };

  const showanser = (item, id) => {
    if (item._id === id) {
      setShow({ id: id, show: true });
    }
  };
  return (
    <>
      <Typography level="h4" sx={{ color: "text.secondary" }}>
        Total: {data.length}
      </Typography>
      <br />
      <Typography level="h2" color="primary">
        {" "}
        Score: {score}
      </Typography>

      {data.map((wordItem) => (
        <>
          <Card
            key={wordItem._id}
            variant="outlined"
            sx={{
              "&:hover": { borderColor: "primary.500", boxShadow: "sm" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexFlow: "column",
                gap: 2,
                borderColor: "success",
              }}
            >
              <Typography level="h4" sx={{ color: "text.secondary" }}>
                {wordItem.type}
              </Typography>
              <Typography level="body-md" sx={{ color: "text.secondary" }}>
                {wordItem.question}
              </Typography>
              <FormControl>
                <Input
                  name="answer"
                  type="text"
                  onChange={(e) => handelAnswer(e, wordItem, wordItem._id)}
                  autoFocus
                  placeholder="type"
                />
              </FormControl>
              {show.show && show.id == wordItem._id && (
                <>
                  <Typography level="body-md" color="danger">
                    {wordItem.answer}
                  </Typography>
                </>
              )}
              <Button onClick={() => showanser(wordItem, wordItem._id)}>
                {" "}
                Show Answer
              </Button>
              {answerTrue.answer && answerTrue.id === wordItem._id && (
                <Typography level="h4" color="success">
                  عاااااش
                </Typography>
              )}
            </Box>
          </Card>
          <br />
        </>
      ))}
    </>
  );
}
