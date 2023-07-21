import React, { useEffect, useState } from 'react';
import './SignIn.scss';

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup
} from '../../utils/FitebaseUtils';
import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  useEffect(() => {
    document.title = 'Hamro Pasal | Sign In';
  }, []);

  const navigate = useNavigate();

  const defaultFormFields = {
    email: '',
    password: ''
  }

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    signInWithGooglePopup();
    navigate('/');
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
      navigate('/');
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }


  return (
    <div className='sign-in-container'>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type="email"
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type="password"
          required
          onChange={handleChange}
          name='password'
          value={password}
        />

        <div className="buttons-container">
          <Button type='submit'>Sign In</Button>
          <Button type='button' onClick={signInWithGoogle} buttonType={'google'}>Sign In With Google</Button>
        </div>
      </form>
      <Link to={'/sign-up'}>
        <h4>Don't have account?</h4>
      </Link>
    </div>
  )
}

export default SignIn