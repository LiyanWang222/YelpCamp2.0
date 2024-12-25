import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

function Error({ message }) {
    return (
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {message}
        </Alert>
    );
}

export default Error;