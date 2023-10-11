import * as React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
        </Stack>
    );
});

export default React.memo(Alert)
