import React, { useState } from "react";
import { Input, IconButton, Tabs, Tab, useTheme, Box, TabPanel } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import "./style.css";
import axios from "axios";
import { AppBlockingSharp } from "@mui/icons-material";
import TopMenu from "../components/header/TopMenu";

export default function Language() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://german-verbs-api.onrender.com/german-verbs-api?verb=${searchTerm}`
      );
      setResults(response.data.data);
      console.log(response, searchTerm);
    } catch (err) {
      setError("An error occurred while searching. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };
  const [value, setValue] = React.useState(2);
  const theme = useTheme();
 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <>
 <TopMenu />

      <div className="container_Search">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={loading}
          endDecorator={
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          }
          sx={{ width: 300 }}
        />
      </div>
      
      <div>
      </div>
    </>
  );
}
