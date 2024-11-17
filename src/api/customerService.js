import axios from 'axios';

const createCustomer = async (customerData) => {
    try {
        const response = await axios.post('https://xenobackend-production.up.railway.app/api/customers/add', customerData);
        return response.data;
    } catch (error) {
        console.error("Failed to create customer:", error);
    }
};

export default createCustomer;
