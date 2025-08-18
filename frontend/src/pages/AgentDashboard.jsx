import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axiosInstance from "../api/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const AgentDashboard = () => {
    const [showUpload, setShowUpload] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [taskModalOpen, setTaskModalOpen] = useState(false);

    const [agents, setAgents] = useState([]);

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [count, setCount] = useState(0);

    const [refetchAgents, setRefetchAgents] = useState(0);

    const [selectedAgentId, setSelectedAgentId] = useState(null);
    const [loadingTasks, setLoadingTasks] = useState(false);

    const [assignedTasks, setAssignedTasks] = useState([]);


    const [agentData, setAgentData] = useState({
        name: "",
        email: "",
        countryCode: "+91",
        mobile: "",
        password: "",
        role: "agent"
    });

    const [editAgent, setEditAgent] = useState(null);

    // State for editing
    const [editingTask, setEditingTask] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        phone: "",
        notes: "",
        status: "Pending",
    });


    // View tasks
    const handleViewTasks = async (agentId) => {
        setSelectedAgentId(agentId);
        setTaskModalOpen(true);
        setLoadingTasks(true);
        try {
            const res = await axiosInstance.get(`/tasks/${agentId}`);
            setAssignedTasks(res.data || []);
        } catch (error) {
            toast.error("Error fetching tasks");
            setAssignedTasks([]);
        } finally {
            setLoadingTasks(false);
        }
    };


    // Create agent
    const handleCreateAgent = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post("/agents/create", agentData);
            toast.success("Agent created successfully ✅");
            setShowCreate(false);
            setAgentData({ name: "", email: "", countryCode: "+91", mobile: "", password: "", role: "agent" });
            setRefetchAgents(refetchAgents + 1);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create agent");
        }
    };

    // Fetch tasks
    const fetchTasks = async () => {
        try {
            const response = await axiosInstance.get(`/tasks/my`);
            setTasks(response.data.tasks || []);
            setCount(response.data.count);
        } catch (err) {
            setError("Failed to load tasks");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);


    // Fetch agents
    const fetchAgents = async () => {
        try {
            const response = await axiosInstance.get('/agents');
            setAgents(response.data || []);
        } catch (error) {
            toast.error("Failed to fetch agents");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgents();
    }, [refetchAgents]);

    // Handle edit click
    const handleEdit = (task) => {
        setEditingTask(task);
        setFormData({
            firstName: task.firstName,
            phone: task.phone,
            notes: task.notes || "",
            status: task.status || "Pending",
        });
    };

    // Handle form change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Update task
    const handleUpdate = async () => {
        try {
            await axiosInstance.put(`/tasks/${editingTask._id}`, formData);
            setEditingTask(null);
            fetchTasks();
        } catch (err) {
            console.error("Update failed", err);
        }
    };

    // Edit agent
    const handleEditAgent = (agent) => {
        setEditAgent(agent);
        setShowEdit(true);
    };

    const handleUpdateAgent = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/agents/${editAgent._id}`, editAgent);
            toast.success("Agent updated successfully ✏️");
            setShowEdit(false);
            setEditAgent(null);
            setRefetchAgents(refetchAgents + 1);
        } catch (error) {
            toast.error("Failed to update agent");
        }
    };

    const handleEditTask = async (taskId, updatedTask) => {
        try {
            await axiosInstance.put(`/tasks/${taskId}`, updatedTask);
            toast.success("Task updated successfully");
            setEditingTask(null);
            handleViewTasks(selectedAgentId); // refresh tasks
        } catch (error) {
            console.error("Edit Task Error:", error);
            toast.error("Failed to update task");
        }
    };

    // Delete task
    const handleDeleteTask = async (taskId) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        try {
            await axiosInstance.delete(`/tasks/${taskId}`);
            toast.success("Task deleted successfully 🗑️");
            handleViewTasks(selectedAgentId);
        } catch (error) {
            toast.error("Failed to delete task");
        }
    };

    const handleUploadSubmit = async (selectedFile) => {
        if (!selectedFile) return alert("Please select a file");

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const res = await axiosInstance.post("/csv/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // console.log("Upload Success:", res.data);
            toast.success("File uploaded successfully");
            setShowUpload(false);
        } catch (error) {
            console.error("Upload Error:", error);
            console.log('Error:', error.response.data)
            toast.error("Upload failed");
        }
    };


    // Delete agent
    const handleDeleteAgent = async (id) => {
        if (!window.confirm("Are you sure you want to delete this agent?")) return;
        try {
            await axiosInstance.delete(`/agents/${id}`);
            toast.success("Agent deleted successfully 🗑️");
            setRefetchAgents(refetchAgents + 1);
        } catch (error) {
            toast.error("Failed to delete agent");
        }
    };



    // for cart section
    // Delete task from carts
    const handleDelete = async (taskId) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        try {
            await axiosInstance.delete(`/tasks/${taskId}`);
            toast.success("Task deleted successfully 🗑️");
            fetchTasks();
        } catch (error) {
            toast.error("Failed to delete task");
        }
    };


    const [editingTaskForCart, setEditingTaskForCart] = useState(null);

    // Handle form change for cart
    const handleChangeForCart = (e) => {
        setEditingTaskForCart({ ...editingTaskForCart, [e.target.name]: e.target.value });

    };


    // Update task
    const handleUpdateForCart = async () => {
        try {
            await axiosInstance.put(`/tasks/${editingTaskForCart._id}`, editingTaskForCart);
            setEditingTaskForCart(null);
            fetchTasks();
            toast.success("Successfully Updated the data.")
        } catch (err) {
            console.error("Update failed", err);
        }
    };

    return (
        <>
            <Navbar />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="p-6 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    Agent Dashboard
                </h2>

                <div className="flex gap-4 mb-6">
                    <button onClick={() => setShowUpload(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Upload File</button>
                    <button onClick={() => setShowCreate(true)} className="bg-green-600 text-white px-4 py-2 rounded">Create Sub Agent</button>
                </div>

                {showUpload && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" style={{ backgroundColor: '#0000008c' }}>
                        <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md relative">
                            <h3 className="text-xl font-semibold mb-4">📤 Upload File</h3>
                            <input
                                type="file"
                                className="w-full mb-4 border border-gray-300 p-2 rounded hover:cursor-pointer hover:border-slate-700" onChange={(e) => { handleUploadSubmit(e.target.files[0]) }} accept=".csv, .xlsx, .xls" title='Only accept files .csv, .xlsx, .xls'
                            />
                            <p>Select a file will automaticaly upload</p>
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setShowUpload(false)}
                                    className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    {/* --- CREATE AGENT MODAL --- */}
                    {showCreate && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black z-50" style={{ backgroundColor: '#0000008c' }}>
                            <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md relative">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold">➕ Create Sub Agent</h3>
                                    <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                                        Agent
                                    </span>
                                </div>

                                <form onSubmit={handleCreateAgent}>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        name='name'
                                        className="w-full border border-gray-300 p-2 rounded mb-3" value={agentData.name} onChange={(e) => setAgentData({ ...agentData, name: e.target.value })}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        name='email'
                                        className="w-full border border-gray-300 p-2 rounded mb-3" value={agentData.email} onChange={(e) => setAgentData({ ...agentData, email: e.target.value })}
                                    />
                                    {/* <input
                                    type="text"
                                    placeholder="Mobile Number"
                                    name='mobile'
                                    className="w-full border border-gray-300 p-2 rounded mb-3" value={agentData.mobile} onChange={(e) => setAgentData({ ...agentData, mobile: e.target.value })}
                                /> */}
                                    <div className="flex mb-3 space-x-2">
                                        <select
                                            name="countryCode"
                                            value={agentData.countryCode}
                                            onChange={(e) => setAgentData({ ...agentData, countryCode: e.target.value })}
                                            className="border border-gray-300 p-2 rounded w-1/3"
                                        >
                                            <option value="+91">🇮🇳 +91</option>
                                            <option value="+1">🇺🇸 +1</option>
                                            <option value="+44">🇬🇧 +44</option>
                                            <option value="+61">🇦🇺 +61</option>
                                            <option value="+81">🇯🇵 +81</option>
                                        </select>

                                        <input
                                            type="text"
                                            placeholder="Mobile Number"
                                            name="mobile"
                                            className="w-2/3 border border-gray-300 p-2 rounded"
                                            value={agentData.mobile}
                                            onChange={(e) => setAgentData({ ...agentData, mobile: e.target.value })}
                                        />
                                    </div>

                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="w-full border border-gray-300 p-2 rounded mb-4" value={agentData.password} onChange={(e) => setAgentData({ ...agentData, password: e.target.value })}
                                    />
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            type="button"
                                            onClick={() => setShowCreate(false)}
                                            className="text-gray-600 hover:text-red-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                                        >
                                            Create
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {/* --- EDIT AGENT MODAL --- */}
                    {showEdit && editAgent && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
                            <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md">
                                <h3 className="text-lg font-bold mb-3">✏️ Edit Agent</h3>
                                <form onSubmit={handleUpdateAgent}>
                                    <input type="text" className="w-full border p-2 mb-3 rounded"
                                        value={editAgent.name} onChange={(e) => setEditAgent({ ...editAgent, name: e.target.value })} />
                                    <input type="email" className="w-full border p-2 mb-3 rounded"
                                        value={editAgent.email} onChange={(e) => setEditAgent({ ...editAgent, email: e.target.value })} />
                                    <input type="text" className="w-full border p-2 mb-3 rounded"
                                        value={editAgent.mobile} onChange={(e) => setEditAgent({ ...editAgent, mobile: e.target.value })} />

                                    <div className="flex justify-end space-x-2">
                                        <button type="button" onClick={() => setShowEdit(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* --- AGENTS TABLE --- */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-4">All Sub Agents</h3>
                        <div className="overflow-x-auto rounded shadow">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2">#</th>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">Email</th>
                                        <th className="px-4 py-2">Mobile</th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan="5" className="text-center py-4">Loading...</td></tr>
                                    ) : agents.length > 0 ? (
                                        agents.map((agent, index) => (
                                            <tr key={agent._id}>
                                                <td className="px-4 py-2">{index + 1}</td>
                                                <td className="px-4 py-2">{agent.name}</td>
                                                <td className="px-4 py-2">{agent.email}</td>
                                                <td className="px-4 py-2">{agent.mobile}</td>
                                                <td className="px-4 py-2 flex gap-2">
                                                    <button onClick={() => handleViewTasks(agent._id)} className="bg-blue-600 text-white px-2 py-1 rounded">Tasks</button>
                                                    <button onClick={() => handleEditAgent(agent)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                                                    <button onClick={() => handleDeleteAgent(agent._id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="5" className="text-center py-4">No agents found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* --- TASKS MODAL --- */}
                    {taskModalOpen && (
                        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                            <div className="bg-white rounded-xl p-6 w-[90%] max-h-[90vh] max-w-4xl shadow-2xl relative overflow-auto">
                                <h2 className="text-xl font-bold mb-4">Assigned Tasks</h2>
                                <button
                                    onClick={() => setTaskModalOpen(false)}
                                    className="absolute top-3 right-4 text-gray-600"
                                >
                                    ✖
                                </button>

                                {loadingTasks ? (
                                    <p>Loading tasks...</p>
                                ) : assignedTasks.tasks?.length === 0 ? (
                                    <p>No tasks assigned.</p>
                                ) : (
                                    <table className="w-full text-sm border">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="p-2">#</th>
                                                <th className="p-2">First Name</th>
                                                <th className="p-2">Phone</th>
                                                <th className="p-2">Notes</th>
                                                <th className="p-2">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {assignedTasks.tasks.map((task, index) => (
                                                <tr key={task._id} className="border-t">
                                                    <td className="p-2">{index + 1}</td>
                                                    <td className="p-2">{task.firstName}</td>
                                                    <td className="p-2">{task.phone}</td>
                                                    <td className="p-2">{task.notes}</td>
                                                    <td className="p-2 flex gap-2">
                                                        <button
                                                            onClick={() => setEditingTask(task)} // 👈 open edit modal
                                                            className="bg-yellow-500 text-white px-2 py-1 rounded"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteTask(task._id)}
                                                            className="bg-red-600 text-white px-2 py-1 rounded"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ✅ Edit Task Modal */}
                    {editingTask && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md">
                                <h3 className="text-lg font-bold mb-4">Edit Task</h3>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleEditTask(editingTask._id, editingTask);
                                    }}
                                >
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        value={editingTask.firstName}
                                        onChange={(e) =>
                                            setEditingTask({ ...editingTask, firstName: e.target.value })
                                        }
                                        className="w-full border p-2 rounded mb-3"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Phone"
                                        value={editingTask.phone}
                                        onChange={(e) =>
                                            setEditingTask({ ...editingTask, phone: e.target.value })
                                        }
                                        className="w-full border p-2 rounded mb-3"
                                    />
                                    <textarea
                                        placeholder="Notes"
                                        value={editingTask.notes}
                                        onChange={(e) =>
                                            setEditingTask({ ...editingTask, notes: e.target.value })
                                        }
                                        className="w-full border p-2 rounded mb-3"
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setEditingTask(null)}
                                            className="bg-gray-400 text-white px-3 py-1 rounded"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-green-600 text-white px-3 py-1 rounded"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-20">
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
                                    Total Tasks Assigned:{" "}
                                    <span className="text-blue-600">{count}</span>
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {tasks.map((task, index) => (
                                    <div
                                        key={task._id}
                                        className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                                    >
                                        <div className="mb-2 text-sm text-gray-500">
                                            Task #{index + 1}
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {task.firstName}
                                        </h3>
                                        <p className="text-sm text-gray-600">Phone: {task.phone}</p>
                                        <p className="text-sm text-gray-600">
                                            Notes: {task.notes || "No notes provided."}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Status:{" "}
                                            <span className="font-medium text-yellow-600">
                                                {task.status || "Pending"}
                                            </span>
                                        </p>

                                        {/* Buttons */}
                                        <div className="mt-3 flex gap-2">
                                            <button
                                                onClick={() => setEditingTaskForCart(task)}
                                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(task._id)}
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Edit Modal */}
                {editingTaskForCart && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40" style={{ backgroundColor: '#000000c2' }}>
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

                            <input
                                type="text"
                                name="firstName"
                                value={editingTaskForCart.firstName}
                                onChange={handleChangeForCart}
                                placeholder="First Name"
                                className="w-full p-2 border rounded mb-3"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={editingTaskForCart.phone}
                                onChange={handleChangeForCart}
                                placeholder="Phone"
                                className="w-full p-2 border rounded mb-3"
                            />
                            <textarea
                                name="notes"
                                value={editingTaskForCart.notes}
                                onChange={handleChangeForCart}
                                placeholder="Notes"
                                className="w-full p-2 border rounded mb-3"
                            />
                            <select
                                name="status"
                                value={editingTaskForCart.status}
                                onChange={handleChangeForCart}
                                className="w-full p-2 border rounded mb-3"
                            >
                                <option value="pending">Pending</option>
                                <option value="inprogress">In Progress</option>
                                <option value="complete">Completed</option>
                            </select>

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setEditingTaskForCart(null)}
                                    className="px-4 py-2 bg-gray-300 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdateForCart}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AgentDashboard;