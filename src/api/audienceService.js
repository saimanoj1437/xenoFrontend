// src/api/audienceService.js
import axios from 'axios';

export const createAudienceSegment = async (conditions) => {
    try {
        const response = await axios.post('https://xenobackend-production.up.railway.app/api/audiences', { conditions });
        return response.data;
    } catch (error) {
        console.error("Error creating audience:", error);
        throw error;
    }
};
