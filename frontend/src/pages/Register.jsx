import React, { useState } from 'react';
import AuthFormInput from '../components/AuthFormInput';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post("/auth/register", form);

            toast.success("Registration successful! Please login.");
            // optionally redirect to login page
            navigate("/login");
        } catch (error) {
            console.error("Failed to register", error);
            alert("Failed to register: " + (error.response?.data?.message || error.message));
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Toaster/>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
                <AuthFormInput label="Name" type="text" name="name" value={form.name} onChange={handleChange} />
                <AuthFormInput label="Email" type="email" name="email" value={form.email} onChange={handleChange} />
                <AuthFormInput label="Password" type="password" name="password" value={form.password} onChange={handleChange} />
                <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer">Register</button>
                <p className="mt-4 text-sm text-center">Already have an account? <Link to="/login" className="text-green-600 hover:underline">Login</Link></p>
            </form>
        </div>
    );
};

export default Register;