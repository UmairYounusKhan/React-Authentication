import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import Login from './Screen/Login/Login';
import Signup from './Screen/Signup/Signup';
import Dashboard from './Screen/Dashboard/Dashboard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  // Prevents rendering of routes while authentication is being initialized
  if (initializing) return <div>Loading...</div>;

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/signup"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Signup />}
      />
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            <Dashboard onLogout={() => setIsLoggedIn(false)} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};

export default App;


// import React from 'react'
// import { Route, Routes } from 'react-router-dom'
// import Login from './Screen/Login/Login'
// import Signup from './Screen/Signup/Signup'
// import Dashboard from './Screen/Dashboard/Dashboard'

// const App = () => {
//   return (
//     <Routes>
//       <Route index element={<Login/>}/>
//       <Route path='/signup' element={<Signup/>}/>
//       <Route path='/dashboard' element={<Dashboard/>}/>

//     </Routes>
//   )
// }

// export default App