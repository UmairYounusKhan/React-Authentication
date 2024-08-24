import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null); // State to hold user information

  useEffect(() => {
    // Get the currently logged-in user
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser); // Set user state with the current user
    }
  }, [auth]);

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');

    if (confirmed) {
      signOut(auth)
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error('Logout error:', error);
        });
    } else {
      alert('Logout canceled.');
    }
  };

  return (
    <div>
      <h1>
        Welcome 
        {user ? `, ${user.displayName || user.email}!` : '!'}
      </h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
