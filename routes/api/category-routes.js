const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // Find all categories
  try {
    const categoryData = await Category.findAll({
      include: [
        { 
          model: Product 
        }
      ],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // Find a single category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        { 
          model: Product 
        }
      ],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // Create new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // Update category by `id` value
  try {
    const updatedCategory = await Category.update({
      id: req.params.id,
      category_name: req.body.category_name
    }, 
    {
      where: {
        id: req.params.id
      }
    });
    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'No category found with this id!' });
    }
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // Delete category by `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deletedCategory) {
      res.status(404).json(deletedCategory);
    }
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
