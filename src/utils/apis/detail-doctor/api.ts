import axios from "axios";

const API_BASE_URL = 'https://zyannstore.my.id/doctors';
const getToken = () => localStorage.getItem('token');

export const getDetailDoctor = async () => {
    const token = getToken();
    try {
        const response = await axios.get(`${API_BASE_URL}/detail-doctors`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error ('Failed to fetch details doctor', error);
        throw error;
    }
};