const { User } = require('../models/User.model.js');

async function getUsers(req, res) {
  const users = await User.findAll();

  res.status(200).send(users);
}

async function createUser(req, res) {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.sendStatus(400);
  }

  const user = await User.create({ name: name.trim() });

  res.status(201).send(user);
}

async function getUserById(req, res) {
  const { id } = req.params;
  const numericId = Number(id);
  const user = await User.findByPk(numericId);

  if (isNaN(numericId)) {
    return res.sendStatus(400);
  }

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
}

async function deleteUser(req, res) {
  const { id } = req.params;

  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.sendStatus(400);
  }

  const user = await User.destroy({
    where: { id: numericId },
  });

  if (user === 0) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.sendStatus(400);
  }

  if (!name || !name.trim()) {
    return res.sendStatus(400);
  }

  const user = await User.update(
    { name: name.trim() },
    { where: { id: numericId }, returning: true },
  );

  if (!user) {
    return res.sendStatus(404);
  }

  const userUpdated = await User.findByPk(numericId);

  res.send(userUpdated.dataValues);
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
