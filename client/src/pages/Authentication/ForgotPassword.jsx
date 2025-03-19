import React, { useState } from 'react';
import { forgotPassword } from '../../api/user.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button, FormInput } from '../../components';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
        await forgotPassword(email)
            .then((data) => {
                if (data.err) {
                    toast.error(data.err);
                } else {
                    toast.success(data.msg);
                    return navigate("/sign-in");
                }

            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleForgotPassword();
    }

    return (
        <div className="auth-container">
            <form method='poast' autoComplete='off' onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    value={email}
                />

                <Button type='submit'>Reset Password</Button>
            </form >
        </div>
    )
}

export default ForgotPassword;