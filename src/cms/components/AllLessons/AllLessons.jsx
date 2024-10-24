import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/joy";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
export default function AllLessons() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const paths = location.pathname.split("/");
  const languageid = paths[3];
  const levelid = paths[4];

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/language/language`
      );
      console.log(response.data, "data");
      const filteredArray = response.data.filter(
        (obj) => {
            
            console.log(obj._id === languageid)
           return obj._id === languageid
        }
      );
      console.log(filteredArray[0].levels)
      const filteredlevel = filteredArray[0].levels.filter(
        (obj) => {
            console.log(obj._id === levelid)
            return obj._id === levelid
        }
      );
console.log(filteredlevel,"+++++++")
      setData(filteredlevel[0]);
      console.log(data);
    } catch (err) {}
  };

  // Load posts when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          bgcolor: "background.surface",
          padding: "30px",
        }}
      >
        <Grid
          className="mainGrid"
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ flexGrow: 1 }}
        >
          {data?.lessons?.map((item, index) => (
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image="/deutsch.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <a
                  href={`/cms/lessonDetails/${paths[3]}/${paths[4]}/${item._id}`}
                >
                  <Button size="small" sx={{ padding: "10px 15px" }}>
                    Learn More
                  </Button>
                </a>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </Box>
    </>
  );
}
