const Inventory = require('../models/inventory.model');

const inventoryController = {
  // Get all items
  getAllItems: async (req, res) => {
    try {
      const items = await Inventory.find({ createdBy: req.user.id });
      res.json({
        success: true,
        data: items
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching inventory items',
        error: error.message
      });
    }
  },

  // Get single item by ID
  getItemById: async (req, res) => {
    try {
      const item = await Inventory.findOne({ 
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
        data: item
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching item',
        error: error.message
      });
    }
  },

  // Create new item
  createItem: async (req, res) => {
    try {
      const item = new Inventory({
        ...req.body,
        createdBy: req.user.id
      });
      
      const savedItem = await item.save();
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
  },

  // Update item
  updateItem: async (req, res) => {
    try {
      const item = await Inventory.findOneAndUpdate(
        { _id: req.params.id, createdBy: req.user.id },
        req.body,
        { new: true, runValidators: true }
      );

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
  },

  // Delete item
  deleteItem: async (req, res) => {
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
  }
};

module.exports = inventoryController;
