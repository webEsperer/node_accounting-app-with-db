const Category = require('../models/Categories.model.js');

const getAllCategories = async (req, res) => {
  const result = await Category.findAll();

  res.send(result);
};

async function getCategoryById(req, res) {
  const { id } = req.params;

  if (isNaN(+id)) {
    return res.sendStatus(400);
  }

  const result = await Category.findByPk(id);

  if (!result) {
    return res.sendStatus(404);
  }

  res.send(result);
}

async function createCategory(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const result = await Category.create({ name });

  res.status(201).json(result);
}

async function deleteCategory(req, res) {
  const { id } = req.params;
  const result = await Category.findByPk(id);

  if (!result) {
    return res.sendStatus(404);
  }

  await Category.destroy({
    where: {
      id: id,
    },
  });

  res.sendStatus(204);
}

async function updateCategory(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string') {
    return res.sendStatus(422);
  }

  const [updatedCount] = await Category.update({ name }, { where: { id } });

  if (updatedCount === 0) {
    return res.sendStatus(404);
  }

  const updatedUser = await Category.findByPk(id);

  res.send(updatedUser);
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
};
