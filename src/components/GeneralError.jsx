import React from 'react';
import { Alert } from '@mui/material';


export const GeneralError = ({ error }) => {
  return (
    <Alert severity='error' color='error'>
      {error.message}
    </Alert>
  );
};
