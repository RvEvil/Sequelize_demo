const express = require('express');
const router = express.Router();
const controller = require('../controllers/user_controller.js');

// Create a new user
router.post('/', controller.create);

// Retrieve all users
router.get('/', controller.findAll);

// Retrieve a single user by ID
router.get('/:id', controller.findOne);

// Update a user by ID
router.put('/:id', controller.update);

// Delete a user by ID
router.delete('/:id', controller.delete);

module.exports = router;
