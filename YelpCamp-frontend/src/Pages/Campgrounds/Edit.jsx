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
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getCampground, updateCampground } from '../../Services/campgrounds';
import { UserContext } from '../../Context/UserContext';

function EditCampground() {
    const { id } = useParams();
    const { user, loading: userLoading } = useContext(UserContext);
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        price: '',
        description: '',
        images: null,
        deleteImages: [],
    });
    const [existingImages, setExistingImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCampground = async () => {
            try {
                const data = await getCampground(id);
                setFormData({
                    title: data.title,
                    location: data.location,
                    price: data.price,
                    description: data.description,
                    images: null,
                    deleteImages: [],
                });
                setExistingImages(data.images || []);
            } catch (err) {
                console.error('Error fetching campground:', err);
                setError('Failed to load campground data');
            } finally {
                setLoading(false);
            }
        };

        fetchCampground();
    }, [id]);

    useEffect(() => {
        if (!userLoading && !user) {
            navigate('/login');
        }
    }, [userLoading, user, navigate]);

    const handleChange = (e) => {
        const { name, value, files, checked } = e.target;
        if (name === 'images') {
            const newImages = Array.from(files);
            const newPreviews = newImages.map((file) => ({
                url: URL.createObjectURL(file),
                isTemp: true,
            }));
            setFormData((prev) => ({ ...prev, images: newImages }));
            setExistingImages((prev) => [...prev, ...newPreviews]);
        } else if (name.startsWith('deleteImages')) {
            const filename = value;
            setFormData((prev) => ({
                ...prev,
                deleteImages: checked
                    ? [...prev.deleteImages, filename]
                    : prev.deleteImages.filter((img) => img !== filename),
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        // Add new images
        Array.from(formData.images || []).forEach((file) => {
            data.append('image', file);
        });

        // Add images to delete
        formData.deleteImages.forEach((filename) => {
            data.append('deleteImages[]', filename);
        });

        // Add other form data
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'images' && key !== 'deleteImages') {
                data.append(`campground[${key}]`, value);
            }
        });

        try {
            await updateCampground(id, data);
            setSuccessMessage('Campground updated successfully!');
            navigate(`/campgrounds/${id}`);
        } catch (err) {
            console.error('Error updating campground:', err);
            setError('Failed to update campground');
        }
    };

    if (loading || userLoading) {
        return <CircularProgress />;
    }

    if (!user) {
        return null;
    }

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Edit Campground
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <form onSubmit={handleSubmit} align="center">
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
                            Upload New Images
                            <input
                                type="file"
                                name="images"
                                multiple
                                hidden
                                onChange={handleChange}
                            />
                        </Button>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="h6" gutterBottom>
                            Existing Images
                        </Typography>
                        {existingImages.map((img, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                <img
                                    src={img.url}
                                    alt={`Campground Image ${index + 1}`}
                                    style={{ width: 100, height: 100, marginRight: 16 }}
                                />
                                {!img.isTemp && (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name={`deleteImages-${index}`}
                                                value={img.filename}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="Delete?"
                                    />
                                )}
                            </Box>
                        ))}
                    </Grid>
                </Grid>
                <Box mt={4} textAlign="center">
                    <Button variant="contained" color="primary" type="submit">
                        Update Campground
                    </Button>
                </Box>
            </form>
        </Container>
    );
}

export default EditCampground;