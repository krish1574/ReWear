const express = require('express');
const router = express.Router();
const { getPendingItems, approveItem, rejectItem } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.use(authMiddleware, adminMiddleware);
router.get('/pending', getPendingItems);
router.patch('/approve/:id', approveItem);
router.delete('/reject/:id', rejectItem);

module.exports = router;