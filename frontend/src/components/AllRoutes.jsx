import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import AdminDashboard from "../pages/AdminDashboard";
import AgentDashboard from "../pages/AgentDashboard";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AllRoutes = () => {
    const user = useSelector((state) => state.auth.user);
    return (
        <Routes>
            <Route path="/" element={user ? <Navigate to={'/dashboard'} /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
                <PrivateRoute>
                    {user?.role === 'admin' ? <AdminDashboard /> : <AgentDashboard />}
                </PrivateRoute>
            } />
        </Routes>
    );
};

export default AllRoutes;