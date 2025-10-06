const Product = require('../models/Product');

// @desc    Récupérer tous les produits
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// @desc    Récupérer un produit par ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// @desc    Créer un nouveau produit
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
  try {
    const { _id, name, type, price, rating, warranty_years, available } = req.body;

    // Vérifier si le produit existe déjà
    const productExists = await Product.findOne({ _id });
    if (productExists) {
      return res.status(400).json({ message: 'Un produit avec cet ID existe déjà' });
    }

    const product = await Product.create({
      _id,
      name,
      type,
      price,
      rating,
      warranty_years,
      available
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création', error: error.message });
  }
};

// @desc    Mettre à jour un produit
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour', error: error.message });
  }
};

// @desc    Supprimer un produit
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};