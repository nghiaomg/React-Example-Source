'use client'

import React, { useState } from "react";
import { styled } from "@mui/system";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
  Collapse,
  Menu,
  MenuItem as MuiMenuItem,
  Divider
} from "@mui/material";
import {
  FiMenu,
  FiHome,
  FiSettings,
  FiUser,
  FiMessageSquare,
  FiBell,
  FiChevronDown,
  FiChevronRight,
  FiList,
  FiPlus,
  FiShield,
  FiPieChart,
  FiTrendingUp,
  FiDollarSign,
  FiInbox,
  FiSend,
  FiFile,
  FiLock,
  FiHelpCircle,
  FiLogOut,
  FiMail,
  FiPhone
} from "react-icons/fi";
import { routes } from "../../routers";

const drawerWidth = 240;

const Main = styled("main")(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: open ? drawerWidth : 0,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  paddingTop: theme.spacing(10),
  width: '100%',
  minHeight: '100vh',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column'
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  minHeight: 64
}));

const StyledListItem = styled(ListItem)(({ theme, isChild }) => ({
  margin: '4px 0',
  padding: '10px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  marginLeft: isChild ? '24px' : '0',
  width: 'auto',
  minWidth: 0,
  '&:hover': {
    backgroundColor: 'rgba(25, 118, 210, 0.08)',
    transform: 'translateX(4px)',
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main
    },
    '& .MuiListItemText-root': {
      '& .MuiTypography-root': {
        color: theme.palette.primary.main
      }
    }
  },
  '&.active': {
    backgroundColor: 'rgba(25, 118, 210, 0.12)',
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main
    },
    '& .MuiListItemText-root': {
      '& .MuiTypography-root': {
        color: theme.palette.primary.main,
        fontWeight: 600
      }
    }
  }
}));

const SidebarItem = ({ item, level = 0 }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (item.children) {
      setOpen(!open);
    } else {
      navigate(item.id);
    }
  };

  const isActive = location.pathname === item.id || 
    (item.children?.some(child => location.pathname === child.id));

  return (
    <>
      <StyledListItem
        onClick={handleClick}
        className={isActive ? 'active' : ''}
        sx={{ 
          mx: 1,
          pl: level * 2 + 2,
          pr: 1,
          overflow: 'hidden',
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 36,
            color: isActive ? 'primary.main' : 'text.secondary'
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText 
          primary={item.text}
          primaryTypographyProps={{
            sx: {
              fontSize: '0.875rem',
              fontWeight: isActive ? 600 : 400,
              color: isActive ? 'primary.main' : 'text.primary',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }
          }}
        />
        {item.children && (
          <Box 
            component="span" 
            sx={{ 
              ml: 'auto',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {open ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
          </Box>
        )}
      </StyledListItem>
      
      {item.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List 
            component="div" 
            disablePadding
            sx={{ overflow: 'hidden' }}
          >
            {item.children.map((child) => (
              <SidebarItem 
                key={child.id} 
                item={child} 
                level={level + 1}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const MasterLayout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { 
      id: "/", 
      text: "Dashboard", 
      icon: <FiHome size={20} /> 
    },
    { 
      id: "/users", 
      text: "Users", 
      icon: <FiUser size={20} />, 
      children: [
        { id: "/users", text: "List Users", icon: <FiList size={20} /> },
        { id: "/users/create", text: "Create User", icon: <FiPlus size={20} /> },
        { id: "/users/roles", text: "User Roles", icon: <FiShield size={20} /> }
      ]
    },
    { 
      id: "/analytics", 
      text: "Analytics", 
      icon: <FiPieChart size={20} />,
      children: [
        { id: "/analytics/traffic", text: "Traffic", icon: <FiTrendingUp size={20} /> },
        { id: "/analytics/revenue", text: "Revenue", icon: <FiDollarSign size={20} /> }
      ]
    },
    { 
      id: "/messages", 
      text: "Messages", 
      icon: <FiMessageSquare size={20} />,
      children: [
        { id: "/messages/inbox", text: "Inbox", icon: <FiInbox size={20} /> },
        { id: "/messages/sent", text: "Sent", icon: <FiSend size={20} /> },
        { id: "/messages/drafts", text: "Drafts", icon: <FiFile size={20} /> }
      ]
    },
    { 
      id: "/settings", 
      text: "Settings", 
      icon: <FiSettings size={20} />,
      children: [
        { id: "/settings/profile", text: "Profile", icon: <FiUser size={20} /> },
        { id: "/settings/security", text: "Security", icon: <FiLock size={20} /> },
        { id: "/settings/notifications", text: "Notifications", icon: <FiBell size={20} /> }
      ]
    }
  ];

  const drawer = (
    <Box 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <DrawerHeader>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1633409361618-c73427e4e206"
            alt="Company Logo"
            style={{ width: 40, height: 40, borderRadius: "50%" }}
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1633409361618-c73427e4e206";
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Dashboard
          </Typography>
        </Box>
      </DrawerHeader>

      <List 
        sx={{ 
          flex: 1,
          px: 2,
          py: 1,
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#666',
          },
        }}
      >
        {menuItems.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </List>

      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <StyledListItem button onClick={() => handleMenuClick('/settings')}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <FiSettings size={20} />
          </ListItemIcon>
          <ListItemText 
            primary="Settings"
            primaryTypographyProps={{
              sx: { fontSize: '0.875rem' }
            }}
          />
        </StyledListItem>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: open && !isMobile ? `calc(100% - ${drawerWidth}px)` : "100%",
          ml: open && !isMobile ? `${drawerWidth}px` : 0,
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
          }),
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 'none',
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2,
              color: 'text.secondary'
            }}
          >
            <FiMenu />
          </IconButton>
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ 
              flexGrow: 1,
              color: 'text.primary',
              fontWeight: 500
            }}
          >
            {routes.find(route => route.path === location.pathname)?.title || 'Dashboard'}
          </Typography>
          <IconButton 
            color="inherit" 
            aria-label="notifications"
            sx={{ 
              color: 'text.secondary',
              mx: 1
            }}
          >
            <FiBell />
          </IconButton>
          <IconButton 
            color="inherit" 
            aria-label="user profile"
            onClick={handleClick}
            aria-controls={openMenu ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
            sx={{ ml: 1 }}
          >
            <Avatar
              alt="User Profile"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
              sx={{ 
                width: 32, 
                height: 32,
                border: 1,
                borderColor: 'divider'
              }}
            />
          </IconButton>

          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.12))',
                mt: 1.5,
                width: 320,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ p: 2, pb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  alt="User Profile"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                  sx={{ 
                    width: 48, 
                    height: 48,
                    mr: 2,
                    border: 1,
                    borderColor: 'divider'
                  }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    John Doe
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Administrator
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="body2" sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  mb: 0.5,
                  color: 'text.secondary'
                }}>
                  <FiMail style={{ marginRight: 8 }} /> john.doe@example.com
                </Typography>
                <Typography variant="body2" sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: 'text.secondary'
                }}>
                  <FiPhone style={{ marginRight: 8 }} /> +1 234 567 890
                </Typography>
              </Box>
            </Box>

            <Divider />

            <MuiMenuItem sx={{ py: 1.5 }}>
              <ListItemIcon>
                <FiUser size={20} />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </MuiMenuItem>

            <MuiMenuItem sx={{ py: 1.5 }}>
              <ListItemIcon>
                <FiSettings size={20} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </MuiMenuItem>

            <MuiMenuItem sx={{ py: 1.5 }}>
              <ListItemIcon>
                <FiHelpCircle size={20} />
              </ListItemIcon>
              <ListItemText primary="Help & Support" />
            </MuiMenuItem>

            <Divider />

            <MuiMenuItem sx={{ py: 1.5, color: 'error.main' }}>
              <ListItemIcon>
                <FiLogOut size={20} style={{ color: 'currentColor' }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MuiMenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={isMobile ? false : open}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
      >
        {drawer}
      </Drawer>

      <Main>
        {children}
      </Main>
    </Box>
  );
};

export default MasterLayout;