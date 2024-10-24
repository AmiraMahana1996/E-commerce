import React from "react";

import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";

import { Typography } from "@mui/joy";
import ResponsiveSidebar from "../../components/sidebar/ResponsiveSidebar";
import Land from "../../components/land/Land";
import LanguageDetails from "../../components/languageDetails/LanguageDetails";
export default function CMSHome({ children }) {
  const currentPath = window.location.pathname;
  console.log(currentPath, "currentPath");
  // Custom hook for responsive behavior
  const useResponsive = () => {
    const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 900);

    React.useEffect(() => {
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 900);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isDesktop;
  };
  const isDesktop = useResponsive();

  return (
    <CssVarsProvider>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <ResponsiveSidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: isDesktop ? "280px" : 0,
            p: 3,
            pt: !isDesktop ? 8 : 3,
          }}
        >
          <Typography level="h2">Dashboard Content</Typography>
          {children}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
