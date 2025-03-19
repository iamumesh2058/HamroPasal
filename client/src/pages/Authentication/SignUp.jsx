import React, { useState } from 'react'
import { Button, FormInput } from '../../components'
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../api/user.api';
import { toast } from 'react-toastify';

const SignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userRegister = async () => {
        await register(username, email, password)
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
        userRegister();
    }

    return (
        <div className='auth-container'>
            <h3>Sign Up</h3>

            <form method='post' autoComplete='off' onSubmit={handleSubmit}>
                <FormInput
                    label="Username"
                    type="text"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    name="username"
                    value={username}
                />

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

                <Button type='submit'>Sign Up</Button>
            </form>

            <div className="container">
                <Link to={'/sign-In'}>
                    <h4>Already have an account?</h4>
                </Link>
            </div>

        </div>
    )
}

export default SignUp