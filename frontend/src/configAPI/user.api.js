import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const authSyncUser = async(auth0AccessToken) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/auth0-sync`, {} ,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth0AccessToken}`
            },
            withCredentials: true
        });
        return {data: response.data, status: response.status};
    } catch (error) {
        console.error("Error syncing user:", error);
        throw error;
    }
}

export const completeUserProfile = async(firstName, lastName, password, organization) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/complete-profile`, {
            firstName,
            lastName,
            password,
            organization
        }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });
        return {data: response.data, status: response.status};
    } catch (error) {
        console.error("Error completing user profile:", error);
        throw error;
    }
}

export const getUserProfile = async() => {
    try {
        
        const response = await axios.get(`${API_BASE_URL}/user/profile`, {
            withCredentials: true
        });
        return {data: response.data, status: response.status};

    } catch (error) {
        console.error("Error getting user profile:", error);
        throw error;
    }
}

export const registerUser = async(formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/register`, formData, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });
        return {data: response.data, success: response.data.success};
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export const loginUser = async(formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/login`, formData, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });
        return {data: response.data, success: response.data.success};
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}

export const logoutUser = async() => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/logout`, {}, {
            withCredentials: true
        });
        return {data: response.data, success: response.data.success};
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
}