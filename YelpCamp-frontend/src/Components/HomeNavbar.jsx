import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserContext } from '../Context/UserContext'; // 引入 UserContext

function HomeNavbar() {
    const { user, logout } = useContext(UserContext); // 获取用户状态和登出功能

    const linkStyle = {
        padding: '0.25rem 0',
        fontWeight: '700',
        color: 'rgba(255, 255, 255, 0.5)',
        marginLeft: '1rem',
        borderBottom: '0.25rem solid transparent',
        textDecoration: 'none', // 移除默认链接的下划线
    };

    const activeLinkStyle = {
        color: 'white',
        borderBottomColor: 'white',
    };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: 'transparent', boxShadow: 'none', width: '100%', margin: 'auto' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h5" component="div">
                    YelpCamp
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    
                    <Link to="/campgrounds" style={linkStyle} activeStyle={activeLinkStyle}>
                        Campgrounds
                    </Link>
                    {/* 根据用户登录状态显示按钮 */}
                    {!user ? (
                        <>
                            <Link to="/users/login" style={linkStyle} activeStyle={activeLinkStyle}>
                                Login
                            </Link>
                            <Link to="/users/register" style={linkStyle} activeStyle={activeLinkStyle}>
                                Register
                            </Link>
                        </>
                    ) : (
                        <Link to="/users/logout" style={linkStyle} activeStyle={activeLinkStyle} onClick={logout}>
                            Logout
                        </Link>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default HomeNavbar;