const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { uploadExcel, populationsIndex } = require('../controllers/populationsController');

router.post('/upload-excel', upload.single('file'), uploadExcel)
router.get('/populations', upload.single('file'), populationsIndex)

module.exports = router
