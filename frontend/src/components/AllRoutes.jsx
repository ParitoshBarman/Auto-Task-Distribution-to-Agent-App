import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import AdminDashboard from "../pages/AdminDashboard";
import UploadFile from "../pages/UploadFile"
import AgentDashboard from "../pages/AgentDashboard";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Create from "../pages/Create";

const AllRoutes = () => {
    const user = useSelector((state) => state.auth.user);
    return (
        <Routes>
            <Route path="/" element={user ? <Navigate to={'/dashboard'} /> : <Login />} />
            <Route path="/login" element={user ? <Navigate to={'/dashboard'} /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to={'/dashboard'} /> : <Register />} />
            <Route path="/upload" element={user ? <UploadFile/> : <Login />} />
            <Route path="/create" element={user ? <Create/> : <Login />} />
            <Route path="/dashboard" element={
                <PrivateRoute>
                    {user?.role === 'admin' ? <AdminDashboard /> : <AgentDashboard />}
                </PrivateRoute>
            } />
            <Route path="/*" element={user ? <h1 style={{fontSize:'100px',textAlign:'center',color:'red'}}>404 <br/> Not Found</h1>: <Login />} />
        </Routes>
    );
};

export default AllRoutes;