import React, { useState } from 'react';
import { Button, FormInput } from '../../components';
import { resetPassword } from '../../api/user.api';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const changePassword = async () => {
        await resetPassword(password, token)
            .then((data) => {
                if(data.err){
                    toast.error(data.err);
                } else {
                    toast.success(data.msg);
                    return navigate("/sign-in");
                }
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error("Password not matching");
            return false
        } else {
            changePassword();
        }
    }

    return (
        <div className="auth-container">
            <h4>Reset Password</h4>
            <form method='poast' autoComplete='off' onSubmit={handleSubmit}>
                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    value={password}
                />

                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    name="confirmPassword"
                    value={confirmPassword}
                />

                <Button type='submit'>Change Password</Button>
            </form >
        </div>
    )
}

export default ResetPassword;