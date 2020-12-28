import React, {useState, useEffect} from 'react'
import {auth} from '../../firebase';
import {toast} from 'react-toastify';

const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'));
        // console.log(window.location.href);
        // console.log(window.localStorage.getItem('emailForRegistration'));
    }, [])

    //props.history

    //Make request to firebase
    const handleSubmit = async (e) => {
        e.preventDefault();

        //validate

        if(!email || !password) {
            toast.error('Email and Password is required');
            return;
        }

        if(password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }
        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            // console.log(result);
            if(result.user.emailVerified) {
                // Remove user email from local storage
                window.localStorage.removeItem('emailForRegistration');
                // Get user id token
                let user = auth.currentUser
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult()
                // Redux store
                console.log('USER', user, "idTokenResult", idTokenResult);
                // Redirect
                history.push('/');
            }
        } catch (error) {
            // console.log(error);
            toast.error(error.message);
        }


    };


    const completeRegistrationForm = () => <form onSubmit={handleSubmit}>
        <input type="email" className="form-control p-2" value={email} disabled/>
        <input type="password" className="form-control mt-2" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password"/>

        <button type="submit" className="btn btn-raised mt-2">Complete Registration</button>
    </form>

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register Complete</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete;