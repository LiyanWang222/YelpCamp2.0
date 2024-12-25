import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeNavbar from '../Components/HomeNavbar'; // 引入 HomeNavbar 组件
import HomeFooter from '../Components/HomeFooter'; // 引入 HomeFooter 组件

function Home() {
    return (
        <Box
            sx={{
                height: '100vh',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url("https://images.unsplash.com/photo-1559521783-1d1599583485?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                textShadow: '0 0.05rem 0.1rem rgba(0, 0, 0, 0.5)',
                boxShadow: 'inset 0 0 5rem rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between', // 确保 Navbar 在顶部，Footer 在底部，中间内容居中
            }}
        >
            {/* HomeNavbar 可以作为首页的导航栏 */}
            <HomeNavbar />

            {/* 主要内容部分 */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexGrow: 1, // 让主要内容部分在剩余空间中垂直居中 
                    textAlign: 'center'
                }}>
                <Typography variant="h1" component="h1"
                    sx={{
                        fontSize: '3rem', // 调整标题字体大小
                        fontWeight: 'bold',
                        color: 'white'
                    }}
                    gutterBottom>
                    YelpCamp
                </Typography>
                <Typography variant="h6"
                    component="p"
                    gutterBottom
                    sx={{
                        fontSize: '1.25rem', // 调整段落字体大小
                        color: 'white'
                    }}>
                    Welcome to YelpCamp! <br />
                    Jump right in and explore our many campgrounds. <br />
                    Feel free to share some of your own and comment on others!
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/campgrounds"
                    sx={{
                        color: '#333',
                        backgroundColor: 'white',
                        fontWeight: 'bold',
                        textShadow: 'none',
                        mt: 3,
                    }}
                >
                    View Campgrounds
                </Button>
            </Box>

            <HomeFooter />
        </Box>
    );
}

export default Home;