import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, FormInput } from '../../components'
import "./AuthStyle.scss";
import { login } from '../../api/user.api';
import { toast } from 'react-toastify';
import { setUser } from '../../store/UserSlice';

const SingIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async () => {
        await login(email, password)
            .then((data) => {
                if (data.err) {
                    toast.error(data.err);
                } else {
                    toast.success(data.msg);
                    dispatch(setUser(data));
                    return navigate("/");
                }
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser();
    }

    return (
        <div className='auth-container'>
            <h3>Sign In</h3>

            <form method='poast' autoComplete='off' onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    value={email}
                />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    value={password}
                />

                <Button type='submit'>Sign In</Button>
            </form>

            <div className="container">
                <Link to={'/sign-up'}>
                    <h4>Don't have an account</h4>
                </Link>

                <Link>
                    <h4>Forgot Password</h4>
                </Link>
            </div>

        </div>
    )
}

export default SingIn