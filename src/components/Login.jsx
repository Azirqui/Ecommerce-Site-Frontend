import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await axios.post(`${apiUrl}/api/login`, { email, password });
            console.log(result.data);

            if (result.data.message === "Login successful") {
                 console.log("Login Success");
                    alert('Login successful!');
                    navigate('/dashboard'); // Navigate after successful login
              } else if (result.data.message === "Invalid credentials" || result.data.error === "Incorrect password") { // Adjust based on actual response structure
                alert('Incorrect password! Please try again.');
              } else {
                // Handle other errors (e.g., server error)
                alert("An unexpected error occurred during login. Please try again.");
              }
        } catch (err) {
            console.error("Login Error:", err);
            alert("An error occurred during login. Please try again.");
        }
    };
    
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-600">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-left font-semibold mb-2">
                            Email Id
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-left font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center mt-4">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
