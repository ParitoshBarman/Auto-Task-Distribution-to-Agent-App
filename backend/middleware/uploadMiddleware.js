const multer = require('multer');
const path = require('path');

// Set up storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    }
});

// Optional: File type validation
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'text/csv',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',  // .xlsx
        'application/vnd.ms-excel'  // .xls
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB max size (optional)
    }
});

module.exports = upload;
