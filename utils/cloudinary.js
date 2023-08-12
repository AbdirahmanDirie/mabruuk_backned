const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dwaen5roc",
    api_key: "397234616934167",
    api_secret: "B_snK-bMOtnEiYJ4tleIOAq9CTg"
});

module.exports = cloudinary;