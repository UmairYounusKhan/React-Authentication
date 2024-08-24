import React, { useState } from 'react';
import auth from '../../Config/Firebase';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        console.log(name, username, email, password);
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleGoogle = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                navigate('/dashboard');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    };

    const handleGithub = () => {
        const provider = new GithubAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // Correct credential extraction
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log('GitHub sign-in successful:', user);
                navigate('/dashboard');
            })
            .catch((error) => {
                console.error('GitHub sign-in error:', error);
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GithubAuthProvider.credentialFromError(error);
                alert(`GitHub sign-in error: ${errorMessage}`);
            });
    };
    

    return (
        <div className="signup-container">
            <div className="signup-form">
            <h1 >Signup</h1>
                <input
                    type="text"
                    placeholder="Enter Full Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter Username"
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSignup}>Signup</button>
                <h6>OR</h6>
                <button style={{backgroundColor:'green'}} onClick={handleGoogle} className="google-btn">Signup with Google</button>
                <button style={{backgroundColor:'black'}} onClick={handleGithub} className="google-btn">Signup with GitHUb</button>

                <p style={{cursor:'pointer'}} onClick={() => navigate('/')}>Already have an  Account, Click here.</p>
            </div>
        </div>
    );
};

export default Signup;
