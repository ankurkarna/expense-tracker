import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, DollarSign, Tag, CreditCard, FileText } from 'lucide-react';
import { addExpense } from '../services/api.jsx';
import toast from 'react-hot-toast';

const AddExpense = ({ currentUser, setExpenses }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
        paymentMethod: '',
        notes: ''
    });
    const [loading, setLoading] = useState(false);

    const categories = [
        'Food',
        'Transportation',
        'Entertainment',
        'Shopping',
        'Health',
        'Utilities',
        'Education',
        'Travel',
        'Other'
    ];

    const paymentMethods = [
        'Cash',
        'Credit Card',
        'Debit Card',
        'Bank Transfer',
        'Mobile Payment',
        'Check',
        'Other'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.amount || !formData.category) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (parseFloat(formData.amount) <= 0) {
            toast.error('Amount must be greater than 0');
            return;
        }

        setLoading(true);

        try {
            const expenseData = {
                ...formData,
                amount: parseFloat(formData.amount),
                userId: currentUser.userId
            };

            const newExpense = await addExpense(expenseData);
            setExpenses(prev => [newExpense, ...prev]);

            toast.success('Expense added successfully!');
            navigate('/');
        } catch (error) {
            console.error('Failed to add expense:', error);
        } finally {
            setLoading(false);
        }
    };

    const getCategoryIcon = (category) => {
        const icons = {
            'Food': '🍽️',
            'Transportation': '🚗',
            'Entertainment': '🎬',
            'Shopping': '🛒',
            'Health': '🏥',
            'Utilities': '⚡',
            'Education': '📚',
            'Travel': '✈️',
            'Other': '📝'
        };
        return icons[category] || '📝';
    };

    return (
        <div>
            {/* Header */}
            <div className="card mb-4">
                <div className="d-flex align-center gap-3 mb-3">
                    <button
                        onClick={() => navigate('/')}
                        className="btn btn-secondary"
                        style={{ padding: '8px' }}
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <h1 style={{ fontSize: '24px', margin: 0 }}>Add New Expense</h1>
                        <p className="text-muted mb-0">Track your spending with detailed information</p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="card">
                <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="form-group">
                        <label className="form-label">
                            <FileText size={16} style={{ marginRight: '8px' }} />
                            Expense Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="e.g., Grocery Shopping, Gas Station, Restaurant"
                            required
                        />
                    </div>

                    {/* Amount */}
                    <div className="form-group">
                        <label className="form-label">
                            <DollarSign size={16} style={{ marginRight: '8px' }} />
                            Amount *
                        </label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div className="form-group">
                        <label className="form-label">
                            <Tag size={16} style={{ marginRight: '8px' }} />
                            Category *
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="form-select"
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {getCategoryIcon(category)} {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Payment Method */}
                    <div className="form-group">
                        <label className="form-label">
                            <CreditCard size={16} style={{ marginRight: '8px' }} />
                            Payment Method
                        </label>
                        <select
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="">Select payment method</option>
                            {paymentMethods.map(method => (
                                <option key={method} value={method}>
                                    {method}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Notes */}
                    <div className="form-group">
                        <label className="form-label">
                            <FileText size={16} style={{ marginRight: '8px' }} />
                            Notes
                        </label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Add any additional notes about this expense..."
                            rows="4"
                            style={{ resize: 'vertical' }}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="d-flex gap-2" style={{ marginTop: '32px' }}>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                            style={{ flex: 1 }}
                        >
                            {loading ? (
                                <>
                                    <div style={{
                                        width: '16px',
                                        height: '16px',
                                        border: '2px solid transparent',
                                        borderTop: '2px solid white',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }} />
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Save Expense
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            {/* Quick Tips */}
            <div className="card mt-4">
                <h4 style={{ marginBottom: '16px' }}>💡 Quick Tips</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#6c757d' }}>
                    <li>Be specific with your expense titles for better tracking</li>
                    <li>Use categories to analyze your spending patterns</li>
                    <li>Add notes for important details like location or purpose</li>
                    <li>Regular tracking helps you stay within your budget</li>
                </ul>
            </div>

            <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default AddExpense;
