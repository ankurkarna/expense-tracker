import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = '/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for logging
api.interceptors.request.use(
    (config) => {
        console.log('API Request:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        const errorMessage = error.response?.data || 'Something went wrong';
        toast.error(errorMessage);
        return Promise.reject(error);
    }
);

// User API calls
export const createTestUser = async () => {
    try {
        const user = await api.post('/user/create-test');
        toast.success('Test user created successfully!');
        return user;
    } catch (error) {
        // If user already exists, try to get existing user
        if (error.response?.status === 400) {
            toast.success('Using existing test user');
            return { userId: 'test-user-id', userName: 'testuser' };
        }
        throw error;
    }
};

export const createUser = async (userData) => {
    return await api.post('/user/create', userData);
};

export const getUserById = async (userId) => {
    return await api.get(`/user/${userId}`);
};

// Expense API calls
export const addExpense = async (expenseData) => {
    return await api.post('/expense/add', expenseData);
};

export const addExpenseWithUserId = async (userId, expenseData) => {
    return await api.post(`/expense/add/${userId}`, expenseData);
};

export const getExpenseById = async (expenseId) => {
    return await api.get(`/expense/read/${expenseId}`);
};

export const deleteExpense = async (expenseId) => {
    return await api.delete(`/expense/delete/${expenseId}`);
};

// Health check
export const healthCheck = async () => {
    return await api.get('/expense/health');
};

export default api;
