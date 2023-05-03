const db = require('../models');
const User = db.User;
const Op = db.Sequelize.Op;

// Create a new user
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.email) {
    res.status(400).send({
      message: 'Name and email cannot be empty.',
    });
    return;
  }

  // Create a user object
  const user = {
    name: req.body.name,
    email: req.body.email,
  };

  // Save the user in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the user.',
      });
    });
};

// Find all users
exports.findAll = async (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Op.iLike]: `%\${name}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving users.',
      });
    });
};

// Find a single user by ID
exports.findOne = async (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};

// Update a user by ID
exports.update = async (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'User was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update user with id=\${id}. User was not found or req.body is empty.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating user with id=' + id,
      });
    });
};

// Delete a user by ID
exports.delete = async (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'User was deleted successfully.',
        });
      } else {
        res.send({
          message: `Cannot delete user with id=\${id}. User was not found.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error deleting user with id=' + id,
      });
    });
};
