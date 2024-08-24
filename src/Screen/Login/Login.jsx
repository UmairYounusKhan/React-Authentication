import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../Config/Firebase';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        navigate('/dashboard');
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
    <div className="login-container">
      <div className="login-form">
      <h1 >Login</h1>
        <input
          type="text"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleLogin}>Login</button><br />
        <button style={{backgroundColor:'green'}} onClick={handleGoogle}>Login with <FaGoogle/></button><br />
        <button style={{backgroundColor:'black'}} onClick={handleGithub} className="google-btn">Signup with GitHUb</button>

        <p style={{cursor:'pointer'}} onClick={() => navigate('/signup')}>No Account, Click here to Sign up</p>
      </div>
    </div>
  );
};

export default Login;
