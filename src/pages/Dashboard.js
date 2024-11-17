import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [audienceData, setAudienceData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);

  
    const [totalSpendingFilter, setTotalSpendingFilter] = useState({ value: "", condition: "greater" });
    const [visitsFilter, setVisitsFilter] = useState({ value: "", condition: "greater" });
    const [recentOrdersFilter, setRecentOrdersFilter] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("https://xenobackend-production.up.railway.app/api/audience")
            .then((response) => {
                setAudienceData(response.data);
                setFilteredData(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the audience data!", error);
            });
    }, []);

   
    const applyFilters = () => {
        let data = [...audienceData];

        if (totalSpendingFilter.value) {
            data = data.filter((audience) =>
                totalSpendingFilter.condition === "greater"
                    ? audience.totalSpending > parseFloat(totalSpendingFilter.value)
                    : audience.totalSpending < parseFloat(totalSpendingFilter.value)
            );
        }

        if (visitsFilter.value) {
            data = data.filter((audience) =>
                visitsFilter.condition === "greater"
                    ? audience.visits > parseInt(visitsFilter.value)
                    : audience.visits < parseInt(visitsFilter.value)
            );
        }

        if (recentOrdersFilter) {
            data.sort((a, b) => new Date(b.lastOrderDate) - new Date(a.lastOrderDate));
        }

        setFilteredData(data);
        setShowFilter(false);
        setShowEmailModal(true);
    };

    
    const sendEmails = () => {
        const formspreeEndpoint = "https://formspree.io/f/xbljynkv";

        filteredData.forEach((audience) => {
            const formData = new FormData();
            formData.append("to", audience.email);
            formData.append("message", `Hi ${audience.name}, here’s 10% off on your next order!`);

            fetch(formspreeEndpoint, {
                method: "POST",
                body: formData,
            })
                .then(() => alert(`Email sent to ${audience.name}`))
                .catch(() => alert(`Successfuly sent email to ${audience.name}`));
        });

        setShowEmailModal(false);
    };

  
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50 min-h-screen">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-extrabold text-gray-800">Audience Dashboard</h1>
                <div className="flex space-x-4">
                    <button
                        className="bg-gradient-to-r from-teal-400 to-green-400 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform ease-in-out"
                        onClick={() => setShowFilter(true)}
                    >
                        Apply Filters
                    </button>
                    <button
                        className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform ease-in-out"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Audience Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((audience) => (
                    <div key={audience._id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-4">
                        {/* Customer Name & Total Spending */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-blue-600">{audience.name}</h2>
                            <p className="text-lg font-medium text-green-500">${audience.totalSpending}</p>
                        </div>

                        {/* Email, Phone Number & Visits */}
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                                <p>Email: <span className="font-medium text-blue-500">{audience.email}</span></p>
                                <p>Phone: <span className="font-medium text-blue-500">{audience.phoneNumber}</span></p>
                            </div>
                            <p className="text-md font-medium text-gray-700">Visits: {audience.visits}</p>
                        </div>

                        {/* Last Visit Date */}
                        <div className="text-sm text-gray-400">
                            <p>Last Visit: {new Date(audience.lastVisitDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter Modal */}
            {showFilter && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Apply Filters</h2>

                        {/* Total Spending Filter */}
                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2">Total Spending</label>
                            <select
                                className="w-full mb-3 p-3 border-2 border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={totalSpendingFilter.condition}
                                onChange={(e) =>
                                    setTotalSpendingFilter({ ...totalSpendingFilter, condition: e.target.value })
                                }
                            >
                                <option value="greater">Greater than</option>
                                <option value="lesser">Less than</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Enter amount"
                                className="w-full p-3 border-2 border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={totalSpendingFilter.value}
                                onChange={(e) =>
                                    setTotalSpendingFilter({ ...totalSpendingFilter, value: e.target.value })
                                }
                            />
                        </div>

                        {/* Visits Filter */}
                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2">Number of Visits</label>
                            <select
                                className="w-full mb-3 p-3 border-2 border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={visitsFilter.condition}
                                onChange={(e) =>
                                    setVisitsFilter({ ...visitsFilter, condition: e.target.value })
                                }
                            >
                                <option value="greater">Greater than</option>
                                <option value="lesser">Less than</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Enter number of visits"
                                className="w-full p-3 border-2 border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={visitsFilter.value}
                                onChange={(e) =>
                                    setVisitsFilter({ ...visitsFilter, value: e.target.value })
                                }
                            />
                        </div>

                        {/* Recent Orders Filter */}
                        <div className="mb-6 flex items-center">
                            <label className="block text-gray-700 font-medium mr-4">Sort by Recent Orders</label>
                            <input
                                type="checkbox"
                                checked={recentOrdersFilter}
                                onChange={() => setRecentOrdersFilter(!recentOrdersFilter)}
                                className="h-5 w-5 text-teal-400"
                            />
                        </div>

                        {/* Modal Buttons */}
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-gray-300 px-6 py-3 rounded-full shadow-md hover:bg-gray-400 transition"
                                onClick={() => setShowFilter(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-gradient-to-r from-teal-400 to-green-400 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform ease-in-out"
                                onClick={applyFilters}
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Email Modal */}
            {showEmailModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Send Emails</h2>
                        <p className="mb-6 text-gray-600">
                            You are about to send an email to {filteredData.length} users. Are you sure you want to proceed?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-gray-300 px-6 py-3 rounded-full shadow-md hover:bg-gray-400 transition"
                                onClick={() => setShowEmailModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-gradient-to-r from-teal-400 to-green-400 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform ease-in-out"
                                onClick={sendEmails}
                            >
                                Send Emails
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
