import React, { useEffect, useState } from 'react';
import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/Button/Button';
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    signInWithGooglePopup
} from '../../utils/FitebaseUtils';
import { Link, useNavigate } from 'react-router-dom';

import { ButtonsContainer, H2, H4, SignUpContainer } from './SignUp.Style';

const SingUp = () => {
    useEffect(() => {
        document.title = 'Hamro Pasal | Sign Up';
    }, []);

    const navigate = useNavigate();

    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }


    const signInWithGoogle = async () => {
        signInWithGooglePopup();
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password != confirmPassword) {
            alert("Password do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
            navigate('/sign-in');
        }
        catch (error) {
            if (error.code == 'auth/email-already-in-use') {
                alert('Cannot create use, email already in use');
            } else {
                console.log("User creation encountered an error", error);
            }
        }
    }


    return (
        <SignUpContainer>
            <H2>Sign Up</H2>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'
                    type='text'
                    required
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                />
                <FormInput
                    label='Email'
                    type='email'
                    required
                    name='email'
                    value={email}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <FormInput
                    label='Password'
                    type='password'
                    required
                    name='password'
                    value={password}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <FormInput
                    label='Confirm Password'
                    type='password'
                    required
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                />

                <ButtonsContainer>
                    <Button type='submit'>Sign Up</Button>
                    <Button type='button' buttonType={'google'} onClick={signInWithGoogle}>Sign In With Google</Button>
                </ButtonsContainer>
            </form>
            <Link to={'/sign-in'}>
                <H4>Already have account?</H4>
            </Link>
        </SignUpContainer>
    )
}

export default SingUp