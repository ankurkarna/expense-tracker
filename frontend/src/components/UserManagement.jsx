import React, { useState } from 'react';
import { User, Plus, Edit, Trash2, Shield } from 'lucide-react';
import { createUser } from '../services/api.jsx';
import toast from 'react-hot-toast';

const UserManagement = ({ currentUser }) => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.userName.trim() || !formData.password.trim()) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);

        try {
            await createUser(formData);
            toast.success('User created successfully!');
            setFormData({ userName: '', password: '' });
            setShowCreateForm(false);
        } catch (error) {
            console.error('Failed to create user:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="card mb-4">
                <div className="d-flex align-center justify-between">
                    <div>
                        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>User Management</h1>
                        <p className="text-muted">
                            Manage users and their access to the expense tracker
                        </p>
                    </div>
                    <button
                        onClick={() => setShowCreateForm(!showCreateForm)}
                        className="btn btn-primary"
                    >
                        <Plus size={18} />
                        Add User
                    </button>
                </div>
            </div>

            {/* Create User Form */}
            {showCreateForm && (
                <div className="card mb-4">
                    <h3 style={{ marginBottom: '20px' }}>Create New User</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">
                                <User size={16} style={{ marginRight: '8px' }} />
                                Username *
                            </label>
                            <input
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Enter username"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <Shield size={16} style={{ marginRight: '8px' }} />
                                Password *
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

                        <div className="d-flex gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : 'Create User'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowCreateForm(false)}
                                className="btn btn-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Current User Info */}
            <div className="card mb-4">
                <h3 style={{ marginBottom: '20px' }}>Current User</h3>
                <div className="d-flex align-center gap-3">
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '24px',
                        fontWeight: '600',
                    }}>
                        {currentUser?.userName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ margin: 0, marginBottom: '4px' }}>
                            {currentUser?.userName || 'Unknown User'}
                        </h4>
                        <p className="text-muted mb-0">
                            User ID: {currentUser?.userId || 'N/A'}
                        </p>
                    </div>
                    <div style={{
                        background: '#28a745',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                    }}>
                        Active
                    </div>
                </div>
            </div>

            {/* User Management Info */}
            <div className="card">
                <h3 style={{ marginBottom: '20px' }}>About User Management</h3>
                <div style={{ color: '#6c757d' }}>
                    <p style={{ marginBottom: '16px' }}>
                        The Expense Tracker currently supports single-user mode with a test user account.
                        This allows you to:
                    </p>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        <li>Track all your personal expenses in one place</li>
                        <li>Organize expenses by categories</li>
                        <li>View spending patterns and statistics</li>
                        <li>Search and filter your expense history</li>
                    </ul>

                    <div style={{
                        background: '#fff3cd',
                        border: '1px solid #ffeaa7',
                        borderRadius: '8px',
                        padding: '16px',
                        marginTop: '20px',
                    }}>
                        <h4 style={{ margin: 0, marginBottom: '8px', color: '#856404' }}>
                            💡 Future Enhancements
                        </h4>
                        <p style={{ margin: 0, color: '#856404' }}>
                            Multi-user support, user roles, and shared expense tracking are planned for future versions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
