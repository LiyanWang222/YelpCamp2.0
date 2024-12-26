import React, { useState, useEffect, useContext } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    TextField,
    Box,
    Alert,
    Snackbar,
    CircularProgress,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { useParams, useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import Rating from '@mui/material/Rating';

import { getCampground, deleteCampground } from '../../Services/campgrounds';
import { createReview, deleteReview } from '../../Services/review';
import { UserContext } from '../../Context/UserContext'; // 引入 UserContext

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function CampgroundShow() {
    const { id } = useParams();
    const { user: currentUser } = useContext(UserContext); // 从 UserContext 获取当前用户
    const [campground, setCampground] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newReview, setNewReview] = useState({ rating: 1, body: '' });
    const [message, setMessage] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar 控制
    const handleSnackbarClose = () => {
        setOpenSnackbar(false); // 手动关闭 Snackbar
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (currentUser && campground?.author) {
            const userId = currentUser.user?.id; // 获取 user 对象中的 id
            console.log('Current User ID:', userId);
            console.log('Campground Author ID:', campground.author._id);
            console.log('Condition:', userId === campground.author._id.toString());
        } else {
            console.log('Data not fully loaded yet.');
        }
    }, [currentUser, campground]);

    // 获取营地数据
    useEffect(() => {
        const fetchCampgroundData = async () => {
            try {
                const data = await getCampground(id);
                setCampground(data);
            } catch (err) {
                console.error('Error fetching campground:', err);
                setError('Failed to load campground data');
            } finally {
                setLoading(false);
            }
        };

        fetchCampgroundData();
    }, [id]);

    // 初始化 Mapbox 地图
    useEffect(() => {
        if (campground?.geometry?.coordinates) {
            const mapContainer = document.getElementById('map');
            if (mapContainer) mapContainer.innerHTML = ''; // 清空地图容器

            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: campground.geometry.coordinates,
                zoom: 10,
            });

            new mapboxgl.Marker()
                .setLngLat(campground.geometry.coordinates)
                .addTo(map);
        }
    }, [campground]);

    const handleDelete = async () => {
        try {
            await deleteCampground(id);
            navigate('/campgrounds');
        } catch (err) {
            setError('Failed to delete campground');
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const reviewData = {
                review: { ...newReview },
            };

            // 提交评论
            await createReview(id, reviewData);

            // 再次获取完整的 campground 数据
            const updatedCampground = await getCampground(id);
            setCampground(updatedCampground); // 更新营地数据
            setNewReview({ rating: 1, body: '' }); // 重置评论表单
            setMessage('Review submitted successfully!');
            setOpenSnackbar(true); // 打开 Snackbar
        } catch (err) {
            console.error('Error submitting review:', err);
            setError('Failed to submit review');
        }
    };

    const handleReviewDelete = async (reviewId) => {
        try {
            await deleteReview(id, reviewId);
            setCampground((prev) => ({
                ...prev,
                reviews: prev.reviews.filter((review) => review._id !== reviewId),
            }));
            setMessage('Review deleted successfully!');
            setOpenSnackbar(true); // 打开 Snackbar
        } catch (err) {
            console.error('Error deleting review:', err);
            setError('Failed to delete review');
        }
    };

    if (loading) return <CircularProgress />; // 加载指示器
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container >
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            <Grid container spacing={4}>
                {/* 左侧内容：轮播图和详情 */}
                <Grid item xs={12} md={6}>
                    {campground?.images?.length > 0 ? (
                        <Carousel>
                            {campground.images.map((img, index) => (
                                <CardMedia
                                    key={index}
                                    component="img"
                                    height="300"
                                    image={img.url}
                                    alt={`Campground Image ${index + 1}`}
                                />
                            ))}
                        </Carousel>
                    ) : (
                        <Typography>No Images Available</Typography>
                    )}
                    <Card sx={{ marginTop: 3 }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                {campground?.title || 'Untitled'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                {campground?.description || 'No description provided.'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Location: {campground?.location || 'Unknown'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Price: ${campground?.price || 0} / night
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                                Submitted by: {campground?.author?.username || 'Unknown'}
                            </Typography>
                        </CardContent>
                        {currentUser && currentUser.user.id === campground?.author?._id && (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
                                <Button
                                    variant="contained"
                                    color="info"
                                    onClick={() => navigate(`/campgrounds/${id}/edit`)}
                                >
                                    Edit
                                </Button>
                                <Button variant="contained" color="error" onClick={handleDelete}>
                                    Delete
                                </Button>
                            </Box>
                        )}
                    </Card>
                </Grid>

                {/* 右侧内容：地图和评论 */}
                <Grid item xs={12} md={6}>
                    <Box id="map" sx={{ height: 300, marginBottom: 3 }}></Box>
                    <Box component="form" onSubmit={handleReviewSubmit} sx={{ marginBottom: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Leave a Review
                        </Typography>
                        <Rating
                            name="review[rating]"
                            value={newReview.rating}
                            onChange={(e, value) => setNewReview({ ...newReview, rating: value })}
                            required
                        />
                        <TextField
                            label="Review Text"
                            name="review[body]"
                            fullWidth
                            multiline
                            rows={3}
                            value={newReview.body}
                            onChange={(e) => setNewReview({ ...newReview, body: e.target.value })}
                            required
                            sx={{ marginY: 2 }}
                        />
                        <Button variant="contained" color="success" type="submit">
                            Submit
                        </Button>
                    </Box>
                    {campground?.reviews?.length > 0 ? (
                        campground.reviews.map((review) => (
                            <Card key={review._id} sx={{ marginBottom: 2 }}>
                                <CardContent>
                                    <Typography variant="h6">{review?.author?.username || 'Anonymous'}</Typography>
                                    <Rating value={review.rating} readOnly />
                                    <Typography>{review.body}</Typography>
                                    {currentUser && currentUser.user.id === review?.author?._id && (
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleReviewDelete(review._id)}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography>No reviews yet.</Typography>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}

export default CampgroundShow;