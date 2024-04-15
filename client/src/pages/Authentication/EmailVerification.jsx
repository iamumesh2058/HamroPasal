import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import "./Auth.style.scss";
import { verifyEmail } from '../../api/user.api';
import { toast } from "react-toastify";

const EmailVerification = () => {
    const navigate = useNavigate();
    let params = useParams();
    const token = params.token;
    const [error, setError] = useState(false);

    const verify = async () => {
        await verifyEmail(token)
        .then(data => {
            if(data.err){
                toast.error(data.err);
                setError(true)
            }
            else{
                toast.success(data.msg);
                navigate('/sign-in');
            }
        })
    }

    useEffect(() => {
        verify();
    }, [token]);

    return (
        <div className='email-verfication-contianer'>
            {
                error &&
                <Link to={'/resend-verification'}>Resend Verification Link</Link>
            }
        </div>
    )
}

export default EmailVerification;