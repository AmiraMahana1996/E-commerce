import * as React from 'react';
import {
  Sheet,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Typography,
  Box,
  Divider,
  Avatar,
  IconButton,
  Drawer,
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
} from '@mui/joy';

// Import icons
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const DRAWER_WIDTH = 280;

// Custom hook for handling responsive behavior
const useResponsive = () => {
  const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 900);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 900);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isDesktop;
};

const ResponsiveSidebar = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isDesktop = useResponsive();

  const mainMenuItems = [
    { text: 'Language', icon: <HomeRoundedIcon />,link:"/cms/land" },
    { text: 'Financial', icon: <AnalyticsRoundedIcon /> ,link:"/cms/finance"},
    { text: 'Marketing', icon: <PeopleRoundedIcon /> ,link:"/cms/marketing"},
    { text: 'Learning Technical', icon: <PeopleRoundedIcon /> ,link:"/cms/learning"},
    { text: 'Health', icon: <PeopleRoundedIcon /> ,link:"/cms/health"},
  
  ];

  const secondaryMenuItems = [
    { text: 'Settings', icon: <SettingsRoundedIcon /> },
    { text: 'Support', icon: <SupportRoundedIcon /> },
  ];

  const SidebarContent = () => (
    <>
      {/* Logo & Brand */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Sheet
          sx={{
            width: 40,
            height: 40,
            borderRadius: 'md',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'primary.softBg',
            color: 'primary.solidBg',
          }}
        >
          <Typography level="h4">A</Typography>
        </Sheet>
        <Typography level="h4">Admin Panel</Typography>
        {!isDesktop && (
          <IconButton
            variant="plain"
            color="neutral"
            onClick={() => setMobileOpen(false)}
            sx={{ ml: 'auto' }}
          >
            <CloseRoundedIcon />
          </IconButton>
        )}
      </Box>

      {/* User Profile */}
      <Box sx={{ p: 2 }}>
        <Sheet
          sx={{
            borderRadius: 'md',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            bgcolor: 'background.level1',
          }}
        >
          <Avatar
            size="lg"
            src="https://i.pravatar.cc/40"
            sx={{ '--Avatar-size': '40px' }}
          />
          <Box>
            <Typography level="title-sm">John Doe</Typography>
            <Typography level="body-sm">Admin</Typography>
          </Box>
        </Sheet>
      </Box>

      {/* Main Menu */}
      <List
        sx={{
          '--ListItem-radius': '8px',
          '--List-gap': '4px',
          px: 2,
        }}
      >
        {mainMenuItems.map((item, index) => (
          <ListItem key={item.text}>
            <ListItemButton
              selected={index === selectedIndex}
              onClick={() => {
                setSelectedIndex(index);
                if (!isDesktop) setMobileOpen(false);
              }}
              sx={{
                p: 2,
                '&.Mui-selected': {
                  bgcolor: 'primary.softBg',
                  color: 'primary.solidBg',
                  '&:hover': {
                    bgcolor: 'primary.softHoverBg',
                  },
                },
              }}
            >
              <ListItemDecorator sx={{ color: 'inherit' }}>
                {item.icon}
              </ListItemDecorator>
              <ListItemContent>
                <Typography><a href={item.link}>{item.text}</a></Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        ))}
          
      </List>
   
      <Divider sx={{ my: 2 }} />

      {/* Secondary Menu */}
      <List
        sx={{
          '--ListItem-radius': '8px',
          '--List-gap': '4px',
          px: 2,
        }}
      >
      
        {secondaryMenuItems.map((item) => (
          <ListItem key={item.text}>
            <ListItemButton
              onClick={() => !isDesktop && setMobileOpen(false)}
              sx={{
                p: 2,
                '&:hover': {
                  bgcolor: 'background.level1',
                },
              }}
            >
              <ListItemDecorator>{item.icon}</ListItemDecorator>
              <ListItemContent>
                <Typography>{item.text}</Typography>
            
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    
      {/* Logout Button */}
      <Box sx={{ p: 2, mt: 'auto' }}>
        <ListItemButton
          variant="soft"
          color="danger"
          sx={{
            borderRadius: 'md',
            p: 2,
          }}
        >
          <ListItemDecorator>
            <LogoutRoundedIcon />
          </ListItemDecorator>
          <ListItemContent>Logout</ListItemContent>
        </ListItemButton>
      </Box>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {!isDesktop && (
        <IconButton
          variant="outlined"
          color="neutral"
          onClick={() => setMobileOpen(true)}
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 999,
          }}
        >
          <MenuRoundedIcon />
        </IconButton>
      )}

      {/* Desktop Sidebar */}
      {isDesktop ? (
        <Sheet
          sx={{
            width: DRAWER_WIDTH,
            height: '100vh',
            borderRight: '1px solid',
            borderColor: 'divider',
            position: 'fixed',
            top: 0,
            left: 0,
            bgcolor: 'background.surface',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
          }}
        >
          <SidebarContent />
        </Sheet>
      ) : (
        // Mobile Drawer
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              bgcolor: 'background.surface',
            },
          }}
        >
          <SidebarContent />
        </Drawer>
      )}
    </>
  );
};

export default ResponsiveSidebar;