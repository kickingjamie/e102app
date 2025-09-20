import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import PasswordInput from './PasswordInput'



function RegisterUser() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [workplace, setWorkplace] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const goBackClick = async (e) => {
        e.preventDefault();
        navigate('/');
    }


    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (password.length < 10 || !password.match(/[0-9]/g) || !password.match(/[!"£$%^&*()+{}\[\]@~?<>,./]/g)) {
            setError('Your password must be greater than 10 characters, contain a number and special character.')
            return;

        }
        if (password !== confirm_password) {
            setError('Your passwords do not match')
            return;
        }
        console.log(password, email)
        try {
            const res = await fetch('http://localhost:5000/api/registerUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, confirm_password, first_name, surname, workplace, phone_number }),
            });
            const data = await res.json();
            if (res.ok) {
                // Registration successful – maybe navigate or show success
                setSuccessMessage('User registered successfully. Redirecting to login...')
                setTimeout(() => {
                    navigate('/');
                }, 5000);
            } else {
                // Show error from backend
                setError(data.error);
            }

        } catch (err) {
            console.error(err);
            setError('Server error');
        }

    }
    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="col-12 col-md-8 col-lg-6">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-center mb-4">Register a New User</h2>

                    {successMessage && (
                        <div className="alert alert-success text-center" role="alert">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleRegister}>
                        <input
                            className="form-control form-control-lg mb-3"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <PasswordInput
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />

                        <PasswordInput
                            type="password"
                            value={confirm_password}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            required
                        />

                        <input
                            className="form-control form-control-lg mb-3"
                            type="text"
                            placeholder="First Name"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />

                        <input
                            className="form-control form-control-lg mb-3"
                            type="text"
                            placeholder="Surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            required
                        />

                        <input
                            className="form-control form-control-lg mb-3"
                            type="text"
                            placeholder="Place of Work"
                            value={workplace}
                            onChange={(e) => setWorkplace(e.target.value)}
                            required
                        />

                        <input
                            className="form-control form-control-lg mb-4"
                            type="text"
                            placeholder="Contact Number"
                            value={phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />

                        {error && <ErrorMessage message={error} />}

                        <div className="d-flex justify-content-center">
                            <button className="btn btn-primary px-4 m-1" type="submit">Register</button>
                            <button className="btn btn-secondary px-4 m-1" type="button" onClick={goBackClick}>Go Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default RegisterUser;