import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.user);

    const handelLogout = () => {
        dispatch(logout());
        navigate('/login')
    }

    return (
        <div className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold">Dashboard</h1>
            {user && (
                <div>
                    Role: {user.role} | {user.name || user.email}
                    <button onClick={handelLogout} className="ml-4 bg-red-500 px-3 py-1 rounded">Logout</button>
                </div>
            )}
        </div>
    );
};

export default Navbar;