import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import {
    Container,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    CardMedia,
    Box,
    Alert,
} from '@mui/material';

function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { login, error, loading } = useContext(UserContext); // 从 Context 获取方法和状态
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData); // 调用 UserContext 的 login 方法
        navigate('/campgrounds'); // 成功后跳转到营地页面
    };

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Card sx={{ width: '100%', maxWidth: 400, boxShadow: 3 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image="https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
                    alt="Login"
                />
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Login
                    </Typography>
                    {error && (
                        <Box mb={2}>
                            <Alert severity="error">{error}</Alert>
                        </Box>
                    )}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            fullWidth
                            sx={{ marginTop: 2 }}
                            disabled={loading} // 防止重复提交
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}

export default Login;