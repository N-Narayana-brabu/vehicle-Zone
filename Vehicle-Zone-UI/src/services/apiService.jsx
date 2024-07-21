import axios from 'axios';

export const fetchAllFields = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    return response.data.data; // Ensure this is an array
  } catch (error) {
    console.error('Error fetching all fields:', error);
    throw error;
  }
};
