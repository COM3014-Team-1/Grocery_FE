import React from 'react';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';


export default function AlertNotification({ snackbarOpen, setSnackbarOpen, snackbarMessage }) {
    return (
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
                {snackbarMessage}
            </Alert>
        </Snackbar>
    );
}

export const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});