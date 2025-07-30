import React from 'react';

const AuthFormInput = ({ label, type, name, value, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
        </div>
    );
};

export default AuthFormInput;