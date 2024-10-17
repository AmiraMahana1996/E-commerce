import React, { useEffect, useState } from "react";
import TopMenu from "../../components/header/TopMenu";
import CardCom from "../../components/card/CardCom";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import axios from "axios";
import { Box, Grid } from "@mui/joy";
import "./homeStyle.css";
const API_BASE_URL = "https://fakestoreapi.com"; //  API endpoint
export default function HomeCom() {
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography["body-sm"],
    padding: theme.spacing(1),
    textAlign: "center",
    borderRadius: 4,
    color: theme.vars.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.background.level1,
    }),
  }));

  // GET Request - Fetch all Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/products`);
      console.log(response);
      setproducts(response.data);
      setError(null);
    } catch (err) {
      setError("Error fetching posts: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load posts when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <TopMenu />
      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {/* Loading Indicator */}
      {loading && <div className="text-center py-4">Loading...</div>}

      <div className="productsCon">
        <Box sx={{ flexGrow: 1, p: 2, bgcolor: "background.surface" }}>
          <Grid
          className="mainGrid"
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ flexGrow: 1 }}
          >
            {products.map((product) => (
              <Grid size={4}>
                <Item>
                  {" "}
                  <CardCom
                    key={product.id}
                    title={product.title}
                    desc={product.description}
                    image={product.image}
                  />
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
}
