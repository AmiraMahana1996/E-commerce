import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  Typography,
  IconButton,
  Drawer,
  Sheet,
} from "@mui/joy";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { Cart } from "../cart/Cart";




const TopMenu = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Langauge", href: "/language" },
    { label: "Services", href: "/cart" },
    { label: "About", href: "#" },
    { label: "Cms", href: "/cms/land" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Sheet
      variant="outlined"
      sx={{
        width: "100%",
        boxShadow: "sm",
        bgcolor: "background.surface",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "8px 16px",
        }}
      >
        {/* Logo */}
        <Typography
          level="h4"
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            mr: 4,
          }}
        >
          Amira
        </Typography>
        {/* <Cart/> */}
        {/* Desktop Menu */}
        <List
          role="menubar"
          orientation="horizontal"
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2,
          }}
        >
          {menuItems.map((item) => (
            <ListItem key={item.label}>
              <ListItemButton
                component="a"
                href={item.href}
                sx={{
                  borderRadius: "md",
                  "&:hover": {
                    bgcolor: "primary.softBg",
                    color: "primary.main",
                  },
                }}
              >
                {item.label}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
     {/* <Cart/> */}
        {/* Mobile Menu Button */}
        <IconButton
          variant="outlined"
          color="neutral"
          onClick={handleDrawerToggle}
          sx={{ display: { xs: "block", md: "none" } }}
        >

<a href="/cart"><MenuRoundedIcon /></a>
     


        </IconButton>

        {/* Mobile Drawer - Fixed with Joy UI props */}
        <Drawer
          variant="soft" // Changed from "temporary" to "soft"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          slotProps={{
            content: {
              sx: {
                bgcolor: "background.surface",
                p: 2,
                boxShadow: "lg",
                width: 280,
              },
            },
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-content": {
              boxSizing: "border-box",
            },
          }}
        >
          <Box sx={{ width: 280 }}>
            {/* Drawer Header */}
            <Box
              sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}
            >
              <Typography level="h4" sx={{ color: "primary.main" }}>
                Menu
              </Typography>
            </Box>

            {/* Drawer Content */}
            <List
              sx={{
                mt: 2,
                "& .MuiListItem-root": {
                  mb: 1,
                },
              }}
            >
              {menuItems.map((item) => (
                <ListItem key={item.label}>
                  <ListItemButton
                    component="a"
                    href={item.href}
                    onClick={handleDrawerToggle}
                    sx={{
                      borderRadius: "md",
                      "&:hover": {
                        bgcolor: "primary.softBg",
                        color: "primary.main",
                      },
                    }}
                  >
                    {item.label}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    </Sheet>
  );
};

export default TopMenu;
