import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { UserContext } from '../Context/UserContext';

function Navbar() {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation(); // 获取当前路径
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    // 处理登出
    const handleLogout = async () => {
        try {
            
            await logout(); // 调用 UserContext 中的 logout 方法
            console.log('User logged out on server'); // 调试日志
            navigate('/campgrounds'); // 登出后跳转到 Campgrounds 页面
        } catch (err) {
            console.error('Logout failed:', err);
            alert('Logout failed. Please try again.');
        }
    };

    // 处理登录
    const handleLogin = () => {
        console.log('Navbar rendering, user:', user);
        navigate('/users/login'); // 跳转到 Login 页面
    };

    // 处理注册
    const handleRegister = () => {
        navigate('/users/register'); // 跳转到 Register 页面
    };

    const NavButton = ({ text, onClick }) => (
        <Button
            color="inherit"
            onClick={onClick}
            sx={{ fontWeight: location.pathname === text.toLowerCase() ? 'bold' : 'normal' }}
        >
            {text}
        </Button>
    );

    const DrawerItem = ({ text, onClick }) => (
        <ListItem button onClick={onClick}>
            <ListItemText primary={text} />
        </ListItem>
    );

    return (
        <AppBar position="static" sx={{ width: '100%' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                    YelpCamp
                </Typography>
                {isMobile ? (
                    <>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                            <List>
                                <DrawerItem text="Home" onClick={() => navigate('/')} />
                                <DrawerItem text="Campgrounds" onClick={() => navigate('/campgrounds')} />
                                {user && <DrawerItem text="New Campground" onClick={() => navigate('/campgrounds/new')} />}
                                {!user ? (
                                    <>
                                        <DrawerItem text="Login" onClick={handleLogin} />
                                        <DrawerItem text="Register" onClick={handleRegister} />
                                    </>
                                ) : (
                                    <DrawerItem text="Logout" onClick={handleLogout} />
                                )}
                            </List>
                        </Drawer>
                    </>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <NavButton text="Home" onClick={() => navigate('/')} />
                        <NavButton text="Campgrounds" onClick={() => navigate('/campgrounds')} />
                        {user && <NavButton text="New Campground" onClick={() => navigate('/campgrounds/new')} />}
                        {!user ? (
                            <>
                                <NavButton text="Login" onClick={handleLogin} />
                                <NavButton text="Register" onClick={handleRegister} />
                            </>
                        ) : (
                            <NavButton text="Logout" onClick={handleLogout} />
                        )}
                    </Box>
                )}
            </Toolbar>
        </AppBar>
        
    );
}

export default Navbar;