import React, { useState } from 'react';
import { User, Shield, LogIn } from 'lucide-react';
import { login, register } from '../services/api.jsx';
import toast from 'react-hot-toast';

const UserManagement = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username.trim() || !formData.password.trim() || (!isLogin && !formData.name.trim())) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            if (isLogin) {
                const { user } = await login(formData);
                toast.success('Logged in successfully!');
                onLogin(user);
            } else {
                await register(formData);
                toast.success('Registered successfully! Please log in.');
                setIsLogin(true); // Switch to login form after registration
            }
            setFormData({ userName: '', password: '' });
        } catch (error) {
            console.error(`Failed to ${isLogin ? 'login' : 'register'}:`, error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <h1 className="text-center mb-4">{isLogin ? 'Login' : 'Register'}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">
                            <User size={16} style={{ marginRight: '8px' }} />
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter username"
                            required
                        />
                    </div>
                    {!isLogin && (
                        <div className="form-group">
                            <label className="form-label">
                                <User size={16} style={{ marginRight: '8px' }} />
                                Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label className="form-label">
                            <Shield size={16} style={{ marginRight: '8px' }} />
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        <LogIn size={16} style={{ marginRight: '8px' }} />
                        {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
                    </button>
                </form>
                <p className="text-center mt-3">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => setIsLogin(!isLogin)} className="btn btn-link">
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default UserManagement;
