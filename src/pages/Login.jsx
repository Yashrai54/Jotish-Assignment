import React from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const navigate = useNavigate();

    const handleLogin = () => { 
        if(username === 'testuser' && password === 'Test123') {
            alert('Login successful!');
            setMessage('Welcome, ' + username + '!');
            navigate('/dashboard');
        } else {
            alert('Invalid credentials');
            setMessage('Login failed. Please try again.');
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>

                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        onClick={handleLogin}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
                    >
                        Login
                    </button>
                </div>

                {message && (
                    <p className={`mt-4 text-sm text-center font-medium ${message.startsWith('Welcome') ? 'text-green-600' : 'text-red-500'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Login;