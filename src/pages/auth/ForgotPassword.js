import React, {useState, useEffect} from 'react'
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import {Button} from 'antd';
import {useSelector} from 'react-redux';

const ForgotPassword = ({history}) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState('');

    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        if(user && user.token) history.push('/');
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true
        }

        await auth.sendPasswordResetEmail(email, config)
        .then(() => {
            setEmail('')
            setLoading(false);
            toast.success('Check your email for reset password link');
        })
        .catch((error) => {
            console.log('ERROR MESSAGE IN FORGOT PASSOWRD -', error);
            setLoading(false)
            toast.error(error.message)
        })
    };

    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? (
                <h4 className="text-danger">Loading...</h4> 
             ) : (
                <h4>Forgot Password</h4>
             )}

             <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" autoFocus/>
                </div> 
                <button className="btn btn-raised mt-2" disabled={!email}>Submit</button>
             </form>

        </div>
    );
}

export default ForgotPassword;