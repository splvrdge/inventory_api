const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory.model');
const authMiddleware = require('../middleware/auth.middleware');

// Apply auth middleware to all routes
router.use(authMiddleware.verifyToken);

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Inventory.find({ createdBy: req.user.id })
      .populate('supplier', 'name contact');
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching inventory items',
      error: error.message
    });
  }
});

// Get single item
router.get('/:id', async (req, res) => {
  try {
    const item = await Inventory.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    }).populate('supplier', 'name contact');

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching item',
      error: error.message
    });
  }
});

// Create new item
router.post('/', async (req, res) => {
  try {
    const item = new Inventory({
      ...req.body,
      createdBy: req.user.id
    });

    const savedItem = await item.save();
    await savedItem.populate('supplier', 'name contact');

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: savedItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating item',
      error: error.message
    });
  }
});

// Update item
router.put('/:id', async (req, res) => {
  try {
    const item = await Inventory.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true, runValidators: true }
    ).populate('supplier', 'name contact');

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item updated successfully',
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating item',
      error: error.message
    });
  }
});

// Delete item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Inventory.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting item',
      error: error.message
    });
  }
});

module.exports = router;
