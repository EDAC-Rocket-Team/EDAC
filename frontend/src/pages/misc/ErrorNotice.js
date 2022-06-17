import React from 'react';
import { Typography } from '@mui/material';

function ErrorNotice(props) {
    return (
        <div className="error-notice">
            <span>
                <Typography color="red">
                    {props.message}
                </Typography>
            </span>
        </div>
    );
}
export default ErrorNotice;