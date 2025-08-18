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

// Request interceptor to add JWT token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
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
        const errorMessage = error.response?.data?.message || error.response?.data || 'Something went wrong';
        toast.error(errorMessage);
        return Promise.reject(error);
    }
);

// Auth API calls
export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
};

export const register = async (userData) => {
    return await api.post('/register', userData);
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};


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
    return await api.post('/expense', expenseData);
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

export const getAllExpenses = async () => {
    return await api.get('/expense');
};

// Health check
export const healthCheck = async () => {
    return await api.get('/expense/health');
};

export default api;
