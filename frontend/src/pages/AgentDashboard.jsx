import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axiosInstance from "../api/axiosInstance";

const AgentDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axiosInstance.get(`/tasks/my`);
                setTasks(response.data.tasks || []);
                setCount(response.data.count)
            } catch (err) {
                setError("Failed to load tasks");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    return (
        <>
            <Navbar />
            <div className="p-6 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Agent Dashboard</h2>

                {loading ? (
                    <p className="text-gray-600">Loading tasks...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : tasks.length === 0 ? (
                    <p className="text-gray-600">No tasks assigned yet.</p>
                ) : (
                    <>
                        <div className="mb-4">
                            <p className="text-lg font-semibold text-gray-700">
                                Total Tasks Assigned: <span className="text-blue-600">{count}</span>
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {tasks.map((task, index) => (
                                <div key={task._id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                                    <div className="mb-2 text-sm text-gray-500">Task #{index + 1}</div>
                                    <h3 className="text-lg font-semibold text-gray-800">{task.firstName}</h3>
                                    <p className="text-sm text-gray-600">Phone: {task.phone}</p>
                                    <p className="text-sm text-gray-600">Notes: {task.notes || "No notes provided."}</p>
                                    <p className="text-sm text-gray-500 mt-2">Status: <span className="font-medium text-yellow-600">{task.status || "Pending"}</span></p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

        </>
    );
};

export default AgentDashboard;