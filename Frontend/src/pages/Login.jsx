// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError('All fields are required');
//       return;
//     }

//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/login/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         navigate('/');
//       } else {
//         setError(data.error || 'Login failed');
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-200">
//       <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//         <form onSubmit={handleLogin} className="space-y-6">
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border border-black rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border border-black rounded-md"
//             />
//           </div>
//           <button type="submit" className="w-full bg-black text-white py-2 rounded-md">
//             Login
//           </button>
//         </form>
//         <p className="text-center mt-4 text-black">
//           Don't have an account?{' '}
//           <a onClick={() => navigate('/signup')} className="text-blue-500 hover:text-blue-700 cursor-pointer">Sign up</a> 
//          </p>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Track if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        // On successful login, set logged in state and store login flag
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleLogout = () => {
    // Remove the login flag from localStorage
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Conditional Rendering based on login status */}
        {!isLoggedIn ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-black rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-black rounded-md"
              />
            </div>
            <button type="submit" className="w-full bg-black text-white py-2 rounded-md">
              Login
            </button>
          </form>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {/* Profile Button (Circle with Initials or Icon) */}
              <div className="w-10 h-10 rounded-full bg-gray-400 flex justify-center items-center text-white cursor-pointer">
                <span>P</span> {/* You can change "P" to display user initials or profile picture */}
              </div>
              <p className="font-medium">Profile</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        )}

        {!isLoggedIn && (
          <p className="text-center mt-4 text-black">
            Don't have an account?{' '}
            <a
              onClick={() => navigate('/signup')}
              className="text-blue-500 hover:text-blue-700 cursor-pointer"
            >
              Sign up
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
