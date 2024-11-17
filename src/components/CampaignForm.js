import React, { useState } from 'react';
import axios from 'axios';

const CampaignForm = () => {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/campaigns', { name, startDate, endDate });
            alert('Campaign created successfully!');
        } catch (error) {
            console.error('Error creating campaign:', error);
            alert('Failed to create campaign.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Campaign Form</h2>
            <input
                type="text"
                placeholder="Campaign Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <input
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            <button type="submit">Create Campaign</button>
        </form>
    );
};

export default CampaignForm;
