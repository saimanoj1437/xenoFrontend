// frontend/src/api/customerService.js
import axios from 'axios';

const createCustomer = async (customerData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/customers/add', customerData);
        return response.data;
    } catch (error) {
        console.error("Failed to create customer:", error);
    }
};

export default createCustomer;
