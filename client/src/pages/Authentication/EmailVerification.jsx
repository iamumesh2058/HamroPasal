import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyEmail } from '../../api/user.api';
import { toast } from 'react-toastify';
import { Button } from '../../components';

const EmailVerification = () => {
    const navigate = useNavigate();
    const { token } = useParams();

    const handleEmailVerification = async () => {
        await verifyEmail(token)
        .then((data) => {
            if(data.err){
                toast.error(data.err);
                return navigate("/");
            } else{
                toast.success(data.msg);
                return navigate("/sign-in");
            }
        })
    }

    useEffect(() => {
        handleEmailVerification();
    }, [token]);
    return (
        <>
        
        </>
    )
}

export default EmailVerification;