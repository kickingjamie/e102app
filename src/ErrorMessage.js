import React from 'react';

function ErrorMessage({ message }) {
    if (!message) return null;  // Don't render anything if no message

    return (
        <p className="text-danger mt-3">
            {message}
        </p>
    );
}

export default ErrorMessage;
