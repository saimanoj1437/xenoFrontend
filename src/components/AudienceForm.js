import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AudienceForm = () => {
    const [customers, setCustomers] = useState([]);
    const [conditions, setConditions] = useState([]);
    const [audienceSize, setAudienceSize] = useState(0);


    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('https://xenobackend-production.up.railway.app/api/customers');
                setCustomers(response.data);
            } catch (err) {
                console.error("Error fetching customers:", err);
            }
        };
        fetchCustomers();
    }, []);

  
    const applyConditions = () => {
        let filteredCustomers = customers;

        conditions.forEach((condition) => {
            if (condition.field === 'spending') {
                filteredCustomers = filteredCustomers.filter(
                    (customer) => customer.totalSpending > condition.value
                );
            } else if (condition.field === 'visits') {
                filteredCustomers = filteredCustomers.filter(
                    (customer) => customer.visitCount <= condition.value
                );
            } else if (condition.field === 'lastVisit') {
                filteredCustomers = filteredCustomers.filter(
                    (customer) => new Date(customer.lastVisit) > new Date() - condition.value * 30 * 24 * 60 * 60 * 1000
                );
            }
        });

        setAudienceSize(filteredCustomers.length);
    };

    
    const addCondition = (field, value, operator) => {
        setConditions([...conditions, { field, value, operator }]);
    };

    return (
        <div>
            <h2>Create Audience Segment</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <h3>Conditions</h3>
                    <button onClick={() => addCondition('spending', 10000, '>')}>'Spending  INR 10,000</button>
                    <button onClick={() => addCondition('visits', 3, '<=')}>Visits  3</button>
                    <button onClick={() => addCondition('lastVisit', 3, '<')}>No visit in the last 3 months</button>
                </div>
                <div>
                    <h3>Audience Size: {audienceSize}</h3>
                </div>
                <button type="button" onClick={applyConditions}>Calculate Audience</button>
            </form>
        </div>
    );
};

export default AudienceForm;
