import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 text-white px-4 py-3">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Dashboard</h1>

                {/* Mobile Menu Button */}
                <button onClick={toggleMenu} className="sm:hidden focus:outline-none">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Menu */}
                {user && (
                    <div className="hidden sm:flex items-center space-x-4">
                        <span>Role: {user.role} | {user.name || user.email}</span>
                        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            {user && isOpen && (
                <div className="md:hidden mt-3 space-y-2">
                    <div>Role: {user.role}</div>
                    <div>{user.name || user.email}</div>
                    <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
