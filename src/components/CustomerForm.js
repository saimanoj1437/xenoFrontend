// src/components/CustomerForm.js or src/pages/CustomerForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CustomerForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/customers', { name, email, phone });
            alert('Customer added successfully!');
        } catch (error) {
            console.error('Error adding customer:', error);
            alert('Failed to add customer.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Customer Form</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <button type="submit">Save Customer</button>
        </form>
    );
};

export default CustomerForm;
