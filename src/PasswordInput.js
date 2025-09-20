import React, { useState } from 'react';

function PasswordInput({ value, onChange, placeholder, name, required }) {
    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(!show);

    return (
        <div className="input-group mb-3">
            <input
                type={show ? 'text' : 'password'}
                className="form-control form-control-lg rounded"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                required={required}
            />
            <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={toggleShow}>
                <i className={`bi ${show ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </span>
        </div>
    );
}

export default PasswordInput;
