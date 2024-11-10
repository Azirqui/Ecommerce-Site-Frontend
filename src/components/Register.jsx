import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
require('dotenv').config();
const apiUrl = process.env.REACT_APP_API_URL;
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post(`${apiUrl}/api/register`, { name, email, password })
        .then(result => {
            console.log(result);
            if(result.data === "Already registered") {
                alert("E-mail already registered! Please Login to proceed.");
                navigate('/');
            } else {
                alert("Registered successfully! Please Login to proceed.");
                navigate('/');
            }
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-600">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Register</h2>
                <form onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-left font-semibold mb-2">
                            Name
                        </label>
                        <input 
                            type="text"
                            id="name"
                            placeholder="Enter Name"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>
                    
                    {/* Email Input */}
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

                    {/* Password Input */}
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Register
                    </button>
                </form>

                {/* Login Link */}
                <p className="text-center mt-4">
                    Already have an account?{' '}
                    <Link to="/" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
