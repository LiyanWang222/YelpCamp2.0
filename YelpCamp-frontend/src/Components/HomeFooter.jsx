import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function HomeFooter() {
    return (
        <Box
            component="footer"
            sx={{
                mt: 'auto',
                py: 2,
                backgroundColor: 'transparent', // 背景色透明
                width: '100%', // 确保填满宽度
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body1" align="center">
                    © 2024 YelpCamp, All Rights Reserved
                </Typography>
            </Container>
        </Box>
    );
}

export default HomeFooter;