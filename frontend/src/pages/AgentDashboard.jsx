import Navbar from "../components/Navbar";

const AgentDashboard = () => {
    return (
        <>
            <Navbar />
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Agent Dashboard</h2>

                <div className="space-y-2">
                    {/* Mock Task List */}
                    <div className="bg-white p-3 rounded shadow">
                        <h4 className="font-medium">Task 1</h4>
                        <p className="text-sm text-gray-600">Description: Deliver package A to location X</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AgentDashboard;