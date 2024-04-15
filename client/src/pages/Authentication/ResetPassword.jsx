import React, { useState } from 'react';
import "./Auth.style.scss";
import { toast } from "react-toastify";
import { Button, FormInput } from '../../components';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../api/user.api';


const ResetPassword = () => {
	const params = useParams();
	const token = params.token;
	const navigate = useNavigate();
	let [password, setPassword] = useState('')
	let [confirmPassword, setConfirmPassword] = useState('')

	const userResetPassword = async () => {
		await resetPassword(password, token)
			.then(data => {
				if (data.err) {
					toast.error(data.err);
					return;
				}
				else {
					toast.success(data.msg);
					return navigate('/sign-in');
				}
			})
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if(password !== confirmPassword){
			return toast.error("Password not matched");
		}
		userResetPassword();
	}

	return (
		<div className="auth-container">
			<h3>Reset Password</h3>
			<form method='post'>
				<FormInput
					label='Password'
					type="password"
					required
					onChange={(e) => setPassword(e.target.value)}
					name='password'
					value={password}
				/>

				<FormInput
					label='Confirm Password'
					type="password"
					required
					onChange={(e) => setConfirmPassword(e.target.value)}
					name='confirmPassword'
					value={confirmPassword}
				/>

				<Button onClick={handleSubmit}>Reset Password</Button>
			</form>
		</div>
	)
}

export default ResetPassword