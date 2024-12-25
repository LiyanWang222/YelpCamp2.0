import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

function Flash({ message, type }) {
    return (
        <Alert severity={type}>
            <AlertTitle>{type === 'success' ? 'Success' : 'Error'}</AlertTitle>
            {message}
        </Alert>
    );
}

export default Flash;