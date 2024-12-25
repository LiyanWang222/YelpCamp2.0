const Campground = require('../models/campground');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({}).populate('popupText');
    res.json(campgrounds); // 返回 JSON 数据
};

module.exports.createCampground = async (req, res, next) => {
    try {
        const geoData = await geocoder.forwardGeocode({
            query: req.body.campground.location,
            limit: 1
        }).send();
        const campground = new Campground(req.body.campground);
        campground.geometry = geoData.body.features[0].geometry;
        campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
        campground.author = req.user._id;
        await campground.save();
        res.status(201).json({ message: 'Successfully created a new campground!', campground });
    } catch (error) {
        next(error); // 将错误传递给全局错误处理器
    }
};

module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: { path: 'author' }
    }).populate('author');
    if (!campground) {
        return res.status(404).json({ error: 'Cannot find that campground!' });
    }
    res.json(campground); // 返回露营地详情的 JSON 数据
};

module.exports.updateCampground = async (req, res) => {
    try {
        const { id } = req.params;
        const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { new: true });
        const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
        campground.images.push(...imgs);
        await campground.save();
        if (req.body.deleteImages) {
            for (let filename of req.body.deleteImages) {
                await cloudinary.uploader.destroy(filename);
            }
            await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
        }
        res.json({ message: 'Successfully updated campground!', campground });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update campground' });
    }
};

module.exports.deleteCampground = async (req, res) => {
    try {
        const { id } = req.params;
        await Campground.findByIdAndDelete(id);
        res.json({ message: 'Successfully deleted campground' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete campground' });
    }
};