import axios from "axios";
import { useAuth } from "@/utils/contexts/auth";

const API_BASE_URL = 'https://zyannstore.my.id/doctors';

export const getDetailDoctor = async () => {
    const { token } = useAuth();
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