import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [formError, setFormError] = useState({});

    function handleValidation() {
        let err = {};

        if (fullName === '') {
            err.fullName = 'Full name is required!';
        }

        if (email === '') {
            err.email = 'Email is required!';
        } else {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(email)) {
                err.email = 'Invalid Email!';
            }
        }

        if (username === '') {
            err.username = 'Username is required!';
        }

        if (password === '') {
            err.password = 'Password is required!';
        } else {
            // Kiểm tra mật khẩu có chứa số và ký tự đặc biệt
            const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
            if (password.length < 6) {
                err.password = 'Password must be at least 6 characters!';
            } else if (!passwordRegex.test(password)) {
                err.password = 'Password must contain numbers and special characters!';
            }
        }

        if (confirmPassword === '') {
            err.confirmPassword = 'Confirm password is required!';
        } else if (password !== confirmPassword) {
            err.confirmPassword = 'Passwords do not match!';
        }

        setFormError({ ...err });
        return Object.keys(err).length < 1;
    }

    function createUser(e) {
        e.preventDefault();
        const reqBody = {
            username,
            password,
            email,
            fullName,
            phone,
            address,
        };

        const isValid = handleValidation();

        if (isValid) {
            axios
                .post(`/api/v1/auth/register`, reqBody, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    navigate(`/`);
                })
                .catch((error) => {
                    console.log(error.response?.data || error.message);
                });
        } else {
            alert('Invalid Form');
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#CDF4F1] to-[#A8E6CF] flex">
            {/* Left Panel */}
            <div className="w-1/2 flex justify-center items-center p-8">
                <div className="text-center">
                    <div className="mb-8">
                        <img
                            src="logo.PNG"
                            alt="Volunteer Logo"
                            className="w-32 h-32 mx-auto mb-6 rounded-full shadow-lg"
                        />
                        <h1 className="text-5xl font-bold text-gray-800 mb-4">Volunteer</h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Join our community and make a difference together
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-1/2 flex justify-center items-center p-8">
                <div className="w-full max-w-2xl bg-white/95 backdrop-blur-sm p-8 shadow-2xl rounded-2xl border border-white/20">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Create Account
                        </h1>
                        <p className="text-gray-600">Fill in your details to get started</p>
                    </div>
                    
                    <form onSubmit={createUser} className="space-y-4">
                        {/* Row 1: Full Name & Email */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="fullName"
                                    className="block text-sm font-semibold text-gray-700 mb-1"
                                >
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    placeholder="Enter your full name"
                                />
                                {formError.fullName && (
                                    <span className="text-red-500 text-xs font-medium mt-1 block">
                                        {formError.fullName}
                                    </span>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-700 mb-1"
                                >
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    placeholder="Enter your email"
                                />
                                {formError.email && (
                                    <span className="text-red-500 text-xs font-medium mt-1 block">
                                        {formError.email}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Row 2: Username & Phone */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-semibold text-gray-700 mb-1"
                                >
                                    Username *
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    placeholder="Choose a username"
                                />
                                {formError.username && (
                                    <span className="text-red-500 text-xs font-medium mt-1 block">
                                        {formError.username}
                                    </span>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-semibold text-gray-700 mb-1"
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        </div>

                        {/* Row 3: Password & Confirm Password */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-gray-700 mb-1"
                                >
                                    Password *
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    placeholder="Create a password"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Password kèm chữ số và ký tự đặc biệt (tối thiểu 6 ký tự)
                                </p>
                                {formError.password && (
                                    <span className="text-red-500 text-xs font-medium mt-1 block">
                                        {formError.password}
                                    </span>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-semibold text-gray-700 mb-1"
                                >
                                    Confirm Password *
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    placeholder="Confirm your password"
                                />
                                {formError.confirmPassword && (
                                    <span className="text-red-500 text-xs font-medium mt-1 block">
                                        {formError.confirmPassword}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Row 4: Address (Full Width) */}
                        <div>
                            <label
                                htmlFor="address"
                                className="block text-sm font-semibold text-gray-700 mb-1"
                            >
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                placeholder="Enter your address"
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 transform hover:scale-[1.02] shadow-lg"
                            >
                                Create Account
                            </button>
                        </div>

                        <div className="text-center pt-2">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <span
                                    onClick={() => navigate('/login')}
                                    className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 hover:underline transition duration-200"
                                >
                                    Sign In
                                </span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;