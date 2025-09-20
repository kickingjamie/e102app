import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Splash() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Unauthorized');
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.email}!</h1>
          <button onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Splash;
