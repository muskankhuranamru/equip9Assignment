import axios from 'axios';

const API_BASE_URL = 'https://equip9-backend-4d5a21bfb269.herokuapp.com'; // Adjusted URL

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/register`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/login`, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const fetchUserProfile = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

// Function to update a user (admin functionality)
export const updateUser = async (userData, token) => {
    try {
        const { mobileNumber, ...rest } = userData; // Extract mobileNumber from userData
        const response = await axios.put(`${API_BASE_URL}/api/profile`, { mobileNumber, ...rest }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

// Function to delete a user (admin functionality)
export const deleteUser = async (mobileNumber, token) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data: { mobileNumber }, // Send mobileNumber in the request body
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

