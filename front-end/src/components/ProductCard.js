import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Rating,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../store/slices/productsSlice';
import { emitProductDeleted } from '../services/socket';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';

const ProductCard = ({ product, onEdit }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await dispatch(deleteProduct(product._id)).unwrap();
      emitProductDeleted(product._id);
      setOpenConfirm(false);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  return (
    <>
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 4,
          },
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              {product.name}
            </Typography>
            <Chip
              label={product.available ? 'Disponible' : 'Indisponible'}
              color={product.available ? 'success' : 'error'}
              size="small"
            />
          </Box>

          <Typography color="text.secondary" gutterBottom>
            Type: {product.type}
          </Typography>

          <Typography variant="h5" color="primary" sx={{ my: 1 }}>
            {product.price.toFixed(2)} €
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={product.rating} readOnly precision={0.1} size="small" />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({product.rating})
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Garantie: {product.warranty_years} an{product.warranty_years > 1 ? 's' : ''}
          </Typography>
        </CardContent>

        {token && (
          <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
            <IconButton
              size="small"
              color="primary"
              onClick={onEdit}
              aria-label="modifier"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => setOpenConfirm(true)}
              aria-label="supprimer"
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>

      {/* Dialog de confirmation de suppression */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon color="warning" />
          Confirmer la suppression
        </DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer le produit "{product.name}" ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Annuler</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductCard;