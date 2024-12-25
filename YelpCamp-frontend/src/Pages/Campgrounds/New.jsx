import React, { useContext, useEffect, useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Grid,
    Box,
    Alert,
    CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createCampground } from '../../Services/campgrounds';
import { UserContext } from '../../Context/UserContext';

function NewCampground() {
    const { user, loading } = useContext(UserContext); // 从 UserContext 中获取用户状态
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        price: '',
        description: '',
        images: null, // 图片文件
    });
    const [imagePreviews, setImagePreviews] = useState([]); // 预览图片的 URL
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    // 检查用户是否登录
    useEffect(() => {
        if (!loading && !user) {
            navigate('/login'); // 如果未登录，重定向到登录页面
        }
    }, [loading, user, navigate]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'images') {
            setFormData({ ...formData, [name]: files }); // 更新图片文件状态

            // 更新图片预览 URL
            const previews = Array.from(files).map((file) => {
                return URL.createObjectURL(file); // 使用 URL.createObjectURL 生成临时 URL
            });
            setImagePreviews(previews);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(); // 使用 FormData 处理文件和字段
        for (const key in formData) {
            if (key === 'images') {
                Array.from(formData.images || []).forEach((file) => {
                    data.append('image', file);
                });
            } else {
                data.append(`campground[${key}]`, formData[key]);
            }
        }

        try {
            await createCampground(data); // 调用服务方法提交表单数据
            setSuccessMessage('Campground created successfully!');
            navigate('/campgrounds'); // 重定向到所有 Campgrounds 页面
        } catch (err) {
            setError('Failed to create campground');
        }
    };

    if (loading) {
        return <CircularProgress />; // 显示加载状态
    }

    if (!user) {
        return null; // 如果用户未登录，则返回 null（因为已经重定向到登录页面）
    }

    return (
        <Container align="center">
            <Typography variant="h4" align="center" gutterBottom>
                Create New Campground
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <form onSubmit={handleSubmit} >
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    <Grid item xs={8}>
                        <TextField
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            label="Price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            type="number"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                            required
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                        >
                            Upload Images
                            <input
                                type="file"
                                name="images"
                                multiple
                                hidden
                                onChange={handleChange}
                            />
                        </Button>
                    </Grid>
                    {/* 图片预览部分 */}
                    <Grid item xs={8}>
                        <Typography variant="h6">Image Previews</Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginTop: 2 }}>
                            {imagePreviews.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`Preview ${index + 1}`}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        objectFit: 'cover',
                                        borderRadius: 8,
                                    }}
                                />
                            ))}
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={4} textAlign="center">
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </Box>
            </form>
        </Container>
    );
}

export default NewCampground;