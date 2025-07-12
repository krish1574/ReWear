const express = require('express');
const router = express.Router();
const { getAllItems, getItemById, addItem } = require('../controllers/itemController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', getAllItems);
router.get('/:id', getItemById);
router.post('/', authMiddleware, addItem);

module.exports = router;