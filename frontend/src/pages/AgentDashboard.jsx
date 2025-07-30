import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axiosInstance from "../api/axiosInstance";

const AgentDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axiosInstance.get(`/tasks/my`);
                console.log(response.data)
                setTasks(response.data.tasks || []);
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
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Agent Dashboard</h2>

                {loading ? (
                    <p>Loading tasks...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : tasks.length === 0 ? (
                    <p>No tasks assigned yet.</p>
                ) : (
                    <div className="space-y-2">
                        {tasks.map((task, index) => (
                            <div key={task._id} className="bg-white p-3 rounded shadow">
                                <h4 className="font-medium">Task {index + 1}</h4>
                                <p className="text-sm text-gray-600">
                                    Description: {task.description}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Status: {task.status || "Pending"}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default AgentDashboard;