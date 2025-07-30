import React, { useState } from 'react';
import AuthFormInput from '../components/AuthFormInput';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { login } from '../redux/authSlice';
// import { setUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/auth/login', form);
            console.log(res.data)
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            dispatch(login({ token, user }))
            // dispatch(setUser(token, user.role, user.name, user.email))
            navigate('/dashboard')
        } catch (error) {
            console.error('Failed to login', error);
            alert('Failed to login' + error)
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                <AuthFormInput label="Email" type="email" name="email" value={form.email} onChange={handleChange} />
                <AuthFormInput label="Password" type="password" name="password" value={form.password} onChange={handleChange} />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Login</button>
                <p className="mt-4 text-sm text-center">Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link></p>
            </form>
        </div>
    );
};

export default Login;