import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Box,
  Alert,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../store/slices/productsSlice';
import { emitProductCreated, emitProductUpdated } from '../services/socket';

const ProductDialog = ({ open, onClose, product }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    type: '',
    price: '',
    rating: '',
    warranty_years: '',
    available: true,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        _id: product._id,
        name: product.name,
        type: product.type,
        price: product.price,
        rating: product.rating,
        warranty_years: product.warranty_years,
        available: product.available,
      });
    } else {
      setFormData({
        _id: '',
        name: '',
        type: '',
        price: '',
        rating: '',
        warranty_years: '',
        available: true,
      });
    }
    setError('');
  }, [product, open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData._id || !formData.name || !formData.type) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const price = parseFloat(formData.price);
    const rating = parseFloat(formData.rating);
    const warranty_years = parseInt(formData.warranty_years);

    if (isNaN(price) || price < 0) {
      setError('Le prix doit être un nombre positif');
      return;
    }

    if (isNaN(rating) || rating < 0 || rating > 5) {
      setError('La note doit être entre 0 et 5');
      return;
    }

    if (isNaN(warranty_years) || warranty_years < 0) {
      setError('La garantie doit être un nombre positif');
      return;
    }

    const productData = {
      _id: parseInt(formData._id),
      name: formData.name,
      type: formData.type,
      price,
      rating,
      warranty_years,
      available: formData.available,
    };

    try {
      if (product) {
        // Mise à jour
        const result = await dispatch(updateProduct({ 
          id: product._id, 
          productData 
        })).unwrap();
        emitProductUpdated(result);
      } else {
        // Création
        const result = await dispatch(createProduct(productData)).unwrap();
        emitProductCreated(result);
      }
      onClose();
    } catch (err) {
      setError(err || 'Une erreur est survenue');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {product ? 'Modifier le produit' : 'Ajouter un produit'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <TextField
            fullWidth
            label="ID"
            name="_id"
            type="number"
            value={formData._id}
            onChange={handleChange}
            margin="normal"
            required
            disabled={!!product}
            helperText={product ? "L'ID ne peut pas être modifié" : "ID unique du produit"}
          />
          
          <TextField
            fullWidth
            label="Nom"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Prix (€)"
            name="price"
            type="number"
            inputProps={{ step: '0.01', min: '0' }}
            value={formData.price}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Note"
            name="rating"
            type="number"
            inputProps={{ step: '0.1', min: '0', max: '5' }}
            value={formData.rating}
            onChange={handleChange}
            margin="normal"
            required
            helperText="Entre 0 et 5"
          />
          
          <TextField
            fullWidth
            label="Garantie (années)"
            name="warranty_years"
            type="number"
            inputProps={{ min: '0' }}
            value={formData.warranty_years}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.available}
                  onChange={handleChange}
                  name="available"
                  color="primary"
                />
              }
              label="Disponible"
            />
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={onClose}>Annuler</Button>
          <Button type="submit" variant="contained">
            {product ? 'Mettre à jour' : 'Créer'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductDialog;