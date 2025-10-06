import React from 'react';
import { Box } from '@mui/material';

const Logo = ({ width = 180, height = 60 }) => {
  return (
    <Box
      component="img"
      src="/logo-les-bons-artisans.png"
      alt="Les Bons Artisans"
      sx={{
        width: width,
        height: height,
        objectFit: 'contain',
      }}
      onError={(e) => {
        // Fallback si l'image n'existe pas
        e.target.style.display = 'none';
        e.target.parentElement.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: flex-start;">
            <div style="font-size: 12px; font-weight: 400; color: #1A1A1A; letter-spacing: 2px;">LES</div>
            <div style="font-size: 24px; font-weight: 700; color: #1A1A1A; line-height: 1; margin-top: -2px;">BONS</div>
            <div style="font-size: 24px; font-weight: 700; color: #1A1A1A; line-height: 1;">ARTISANS</div>
          </div>
        `;
      }}
    />
  );
};

export default Logo;