import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axiosInstance from '../api/axiosInstance';

const AdminDashboard = () => {
    // for form handle
    const [showUpload, setShowUpload] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [agentData, setAgentData] = useState({
        name: "",
        email: "",
        password: "",
        role: "agent"
    });




    // for view all agents 
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refetchAgents, setRefetchAgents] = useState(0);


    // for all tasks view for perticular agent
    const [selectedAgentId, setSelectedAgentId] = useState(null);
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [loadingTasks, setLoadingTasks] = useState(false);


    const fetchAgents = async () => {
        try {
            const response = await axiosInstance.get('/agents');
            setAgents(response.data || []);
        } catch (error) {
            console.error('Failed to fetch agents:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchAgents();
    }, [refetchAgents])


    const handleViewTasks = async (agentId) => {
        setSelectedAgentId(agentId);
        setTaskModalOpen(true);
        setLoadingTasks(true);
        try {
            const res = await axiosInstance.get(`/tasks/${agentId}`);
            console.log(res.data)
            setTasks(res.data || []);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setTasks([]);
        } finally {
            setLoadingTasks(false);
        }
    };



    const handleCreateAgent = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosInstance.post("/agents/create", agentData);
            // console.log("Agent Created:", res.data);
            alert("Agent created successfully");
            setShowCreate(false);
            // Optionally reset form:
            setAgentData({ name: "", email: "", mobile: "", password: "", role: "agent" });
            setRefetchAgents(refetchAgents + 1);
        } catch (error) {
            console.error("Create Agent Error:", error);
            console.log("Error:", error.response.data);
            alert("Failed to create agent");
        }
    };


    const handleUploadSubmit = async (selectedFile) => {
        if (!selectedFile) return alert("Please select a file");
        console.log(selectedFile)

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const res = await axiosInstance.post("/csv/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // console.log("Upload Success:", res.data);
            alert("File uploaded successfully");
            setShowUpload(false);
        } catch (error) {
            console.error("Upload Error:", error);
            console.log('Error:', error.response.data)
            alert("Upload failed");
        }
    };


    return (
        <>
            <Navbar />
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>

                <div className="flex gap-4 mb-6">
                    <button onClick={() => setShowUpload(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Upload File</button>
                    <button onClick={() => setShowCreate(true)} className="bg-green-600 text-white px-4 py-2 rounded">Create Agent</button>
                </div>

                {showUpload && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" style={{ backgroundColor: '#0000008c' }}>
                        <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md relative">
                            <h3 className="text-xl font-semibold mb-4">📤 Upload File</h3>
                            <input
                                type="file"
                                className="w-full mb-4 border border-gray-300 p-2 rounded" onChange={(e) => { handleUploadSubmit(e.target.files[0]) }}
                            />
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

                {showCreate && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black z-50" style={{ backgroundColor: '#0000008c' }}>
                        <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md relative">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold">➕ Create Agent</h3>
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
                                <input
                                    type="text"
                                    placeholder="Mobile Number"
                                    name='mobile'
                                    className="w-full border border-gray-300 p-2 rounded mb-3" value={agentData.mobile} onChange={(e) => setAgentData({ ...agentData, mobile: e.target.value })}
                                />
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

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">All Agents</h3>

                    <div className="overflow-x-auto rounded shadow">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">#</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Mobile</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    // Skeleton Rows
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td className="px-4 py-3">
                                                <div className="h-4 bg-gray-200 rounded w-6" />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="h-4 bg-gray-200 rounded w-32" />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="h-4 bg-gray-200 rounded w-40" />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="h-4 bg-gray-200 rounded w-24" />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="h-4 bg-gray-200 rounded w-24" />
                                            </td>
                                        </tr>
                                    ))
                                ) : agents.length > 0 ? (
                                    agents.map((agent, index) => (
                                        <tr key={agent._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{agent.name}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{agent.email}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{agent.mobile}</td>
                                            <td className="px-4 py-3">
                                                <button
                                                    onClick={() => handleViewTasks(agent._id)}
                                                    className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded cursor-pointer"
                                                >
                                                    View Tasks
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                                            No agents found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>



                {taskModalOpen && (
                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50" style={{backgroundColor:"#00000096"}}>
                        <div className="bg-white rounded-xl p-6 w-[90%] max-w-4xl shadow-2xl relative max-h-[90vh]">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Assigned Tasks</h2>

                            <button
                                onClick={() => setTaskModalOpen(false)}
                                className="absolute top-3 right-4 text-gray-600 hover:text-red-600 text-2xl"
                                title="Close"
                            >
                                &times;
                            </button>

                            {loadingTasks ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="animate-pulse h-6 bg-gray-300 rounded w-full" />
                                    ))}
                                </div>
                            ) : tasks.tasks.length === 0 ? (
                                <div className="text-center text-gray-600 text-lg">No tasks assigned for this agent.</div>
                            ) : (
                                <>
                                    <div className="mb-4 text-gray-700 text-sm">
                                        Total Tasks Assigned: <span className="font-semibold">{tasks.count}</span>
                                    </div>

                                    {/* ✅ Scrollable content */}
                                    <div className="overflow-y-auto max-h-[60vh] border rounded-md">
                                        <table className="w-full text-sm text-left text-gray-800">
                                            <thead className="bg-gray-100 sticky top-0 z-10 shadow-sm">
                                                <tr className="text-xs text-gray-700 uppercase tracking-wide border-b">
                                                    <th className="p-3 border-r">#</th>
                                                    <th className="p-3 border-r">First Name</th>
                                                    <th className="p-3 border-r">Phone</th>
                                                    <th className="p-3">Notes</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tasks.tasks.map((task, index) => (
                                                    <tr
                                                        key={task._id}
                                                        className={`border-b hover:bg-gray-50 transition duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                                            }`}
                                                    >
                                                        <td className="p-3 border-r">{index + 1}</td>
                                                        <td className="p-3 border-r">{task.firstName}</td>
                                                        <td className="p-3 border-r">{task.phone}</td>
                                                        <td className="p-3">{task.notes}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </>
    );
};

export default AdminDashboard;