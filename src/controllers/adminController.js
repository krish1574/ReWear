const Item = require('../models/Item');

exports.getPendingItems = async (req, res) => {
  try {
    const items = await Item.find({ status: 'pending' });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.approveItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, { status: 'available' }, { new: true });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.rejectItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item rejected and deleted', item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};