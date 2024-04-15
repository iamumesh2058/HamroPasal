import React, { useState } from 'react';
import "./Auth.style.scss";
import { toast } from "react-toastify";
import { Button, FormInput } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { login, forgotPassword, authenticate } from '../../api/user.api';
import { setUser } from '../../Store/UserSlice';
import { useDispatch } from "react-redux";


const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const loginUser = async () => {
		await login(email, password)
			.then(data => {
				if (data.err) {
					toast.error(data.err);
					return;
				}
				else {
					toast.success(data.msg);
					dispatch(setUser(data.user));
					authenticate(data.user);
					if (data.user.role === 'admin') {
						return navigate('/dashboard');
					}
					return navigate('/');
				}
			})
	}

	const userForgotPassword = async () => {
		await forgotPassword(email)
			.then(data => {
				if (data.err) {
					toast.error(data.err);
				}
				else {
					toast.success(data.msg);
				}
				return;
			})
	}

	const handleLoginUser = (e) => {
		e.preventDefault();
		loginUser();
	}

	const handleForgotPassword = (e) => {
		e.preventDefault();
		userForgotPassword();
	}

	return (
		<div className="auth-container">
			<h3>Sign In</h3>
			<form method='post'>
				<FormInput
					label='Email'
					type="email"
					required
					onChange={(e) => setEmail(e.target.value)}
					name='email'
					value={email}
				/>

				<FormInput
					label='Password'
					type="password"
					required
					onChange={(e) => setPassword(e.target.value)}
					name='password'
					value={password}
				/>

				<Button onClick={handleLoginUser}>Sign In</Button>
			</form>

			<div className="container">
				<Link to={'/sign-up'}>
					<h4>Don't have account?</h4>
				</Link>
				<Link>
					<h4 onClick={handleForgotPassword}>Forgot Password</h4>
				</Link>
			</div>
		</div>
	)
}

export default Login