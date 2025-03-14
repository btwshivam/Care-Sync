import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { route } from '../../backendroute';

type roles = "Admin" | "Patient" | "Doctor" | "Inventoryman" | "Receptionist" | "";

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [role, setRole] = useState<roles>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        if (token && user) {
            try {
                const userData = JSON.parse(user);
                if (userData && userData.id) {
                    // Redirect to appropriate dashboard based on role
                    const userRole = localStorage.getItem('role') || '';
                    navigate(userRole === "Inventoryman" ? "/inventory-manager" : `/${userRole.toLowerCase()}`);
                }
            } catch (error) {
                // Invalid user data in localStorage, clear it
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('role');
            }
        }
    }, [navigate]);

    const validateForm = (): boolean => {
        if (!email) {
            setError("Email is required");
            return false;
        }
        if (!role) {
            setError("Please select a role");
            return false;
        }
        if (!password) {
            setError("Password is required");
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        // Clear previous messages
        setError(null);
        setSuccess(null);
        
        // Validate form
        if (!validateForm()) return;
        
        setIsLoading(true);
        try {
            const response = await axios.post<{ token: string, user: any, message: string }>(route + '/auth/login', {
                email, password, role
            });
            
            // Store user data and token
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('role', role);
            
            // Show success message
            setSuccess(response.data.message || "Login successful!");
            
            // Navigate after a short delay to show the success message
            setTimeout(() => {
                navigate(`/${role === "Inventoryman" ? "inventory-manager" : role.toLowerCase()}`);
            }, 1000);
        } catch (error: any) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(error.response.data.message || "Authentication failed");
            } else if (error.request) {
                // The request was made but no response was received
                setError("No response from server. Please try again later.");
            } else {
                // Something happened in setting up the request that triggered an Error
                setError("An error occurred. Please try again.");
            }
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Enter key press
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-700">
            <motion.div
                className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Login to CareSync
                </h1>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError(null); // Clear error when user types
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter Email"
                    className="mb-4 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    value={role}
                    onChange={(e) => {
                        setRole(e.target.value as roles);
                        setError(null); // Clear error when user selects
                    }}
                    className="mb-4 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Role</option>
                    <option value="Admin">Administrator</option>
                    <option value="Patient">Patient</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Inventoryman">Inventory Manager</option>
                    <option value="Receptionist">Receptionist</option>
                </select>

                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError(null); // Clear error when user types
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter Password"
                    className="mb-6 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className={`w-full px-6 py-3 ${isLoading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300`}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>

                {error && (
                    <motion.div 
                        className="mt-4 text-red-500 text-center p-2 bg-red-50 rounded-md"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {error}
                    </motion.div>
                )}
                
                {success && (
                    <motion.div 
                        className="mt-4 text-green-600 text-center p-2 bg-green-50 rounded-md"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {success}
                    </motion.div>
                )}
                
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
                    </p>
                </div>
                
                <div className="mt-4 text-center">
                    <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
                        Back to Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
