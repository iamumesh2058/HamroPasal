import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, FormInput } from '../../components';
import { toast } from "react-toastify";
import { register } from '../../api/user.api';

const Register = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const registerUser = async () => {
		await register(username, email, password)
			.then(data => {
				if (data.err) {
					toast.error(data.err);
				}
				else {
					toast.success(data.msg);
					navigate("/sign-in");
				}
			})
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		registerUser();
	}

	return (
		<div className="auth-container">
			<h3>Sign Up</h3>
			<form method='post'>
				<FormInput
					label='Username'
					type="text"
					required
					onChange={(e) => setUsername(e.target.value)}
					name='username'
					value={username}
				/>

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

				<Button onClick={handleSubmit}>Sign Up</Button>
			</form>

			<div className="container">
				<Link to={'/sign-in'}>
					<h4>Already have account?</h4>
				</Link>
			</div>
		</div>
	)
}

export default Register;