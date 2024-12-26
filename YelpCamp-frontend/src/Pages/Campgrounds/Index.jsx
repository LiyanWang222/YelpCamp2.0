import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import mapboxgl from 'mapbox-gl'; // 引入 Mapbox
import { getCampgrounds } from '../../Services/campgrounds';
import { Link, useNavigate } from 'react-router-dom';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN; // 替换为你的 Mapbox Token

function CampgroundsIndex() {
    const [campgrounds, setCampgrounds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // 加载 Campgrounds 数据
    useEffect(() => {
        const fetchCampgrounds = async () => {
            try {
                const data = await getCampgrounds();
                setCampgrounds(data);
            } catch (err) {
                setError('Failed to load campgrounds');
            } finally {
                setLoading(false);
            }
        };

        fetchCampgrounds();
    }, []);

    // 初始化 Mapbox 地图
    useEffect(() => {
        if (campgrounds.length > 0) {
            const map = new mapboxgl.Map({
                container: 'cluster-map', // 对应 HTML 的 id
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-100.486052, 37.830348], // 地图初始中心点
                zoom: 3, // 地图初始缩放级别
            });

            // 添加地图上的点标记
            campgrounds.forEach((campground) => {
                if (campground.geometry?.coordinates?.length === 2) {
                    const popup = new mapboxgl.Popup({ offset: 25 })
                        .setHTML(`
                            <h3>${campground.title}</h3>
                            <p>${campground.location}</p>
                            <button id="popup-button-${campground._id}" style="color: blue; text-decoration: underline; background: none; border: none; cursor: pointer;">
                                View Details
                            </button>
                        `);

                    new mapboxgl.Marker({ color: 'blue' })
                        .setLngLat(campground.geometry.coordinates) // 设置点的位置
                        .setPopup(popup) // 绑定弹窗
                        .addTo(map);

                    // 添加事件监听器到按钮
                    setTimeout(() => {
                        const button = document.getElementById(`popup-button-${campground._id}`);
                        if (button) {
                            button.addEventListener('click', () => {
                                navigate(`/campgrounds/${campground._id}`);
                            });
                        }
                    }, 0); // 确保弹窗完全渲染后再添加事件监听器
                } else {
                    console.error('Invalid geometry for campground:', campground);
                }
            });

            // 添加地图缩放和旋转控件
            map.addControl(new mapboxgl.NavigationControl());
        }
    }, [campgrounds, navigate]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Container>
            {/* 地图容器 */}
            <div id="cluster-map" style={{ height: '400px', width: '100%', marginBottom: '20px' }}></div>

            {/* Campgrounds 列表 */}
            <Typography variant="h4" align="center" gutterBottom>
                All Campgrounds
            </Typography>
            <Grid container spacing={4}>
                {campgrounds.map((campground) => (
                    <Grid item xs={12} sm={6} md={4} key={campground._id}>
                        <Card>
                            {/* 图片显示 */}
                            <CardMedia
                                component="img"
                                height="200"
                                image={
                                    campground.images?.length
                                        ? campground.images[0].url
                                        : 'https://res.cloudinary.com/douqbebwk/image/upload/v1600103881/YelpCamp/lz8jjv2gyynjil7lswf4.png'
                                }
                                alt={campground.title}
                            />
                            <CardContent>
                                {/* 标题和描述 */}
                                <Typography variant="h5">{campground.title}</Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                                    {campground.location}
                                </Typography>
                                {/* 按钮 */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component={Link} // 使用 Link 组件
                                    to={`/campgrounds/${campground._id}`} // React Router 的 to 属性
                                >
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default CampgroundsIndex;