import React, { useState, useEffect } from 'react';
import { Search, Filter, Trash2, Edit, Calendar, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { deleteExpense } from '../services/api.jsx';
import toast from 'react-hot-toast';

const ExpenseList = ({ expenses, setExpenses }) => {
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');

    const categories = [
        'All',
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

    useEffect(() => {
        let filtered = [...expenses];

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(expense =>
                expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                expense.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                expense.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory && selectedCategory !== 'All') {
            filtered = filtered.filter(expense => expense.category === selectedCategory);
        }

        // Sort expenses
        filtered.sort((a, b) => {
            let comparison = 0;

            switch (sortBy) {
                case 'date':
                    comparison = new Date(b.createdTime) - new Date(a.createdTime);
                    break;
                case 'amount':
                    comparison = b.amount - a.amount;
                    break;
                case 'title':
                    comparison = a.title.localeCompare(b.title);
                    break;
                case 'category':
                    comparison = a.category.localeCompare(b.category);
                    break;
                default:
                    comparison = 0;
            }

            return sortOrder === 'desc' ? comparison : -comparison;
        });

        setFilteredExpenses(filtered);
    }, [expenses, searchTerm, selectedCategory, sortBy, sortOrder]);

    const handleDelete = async (expenseId) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            try {
                await deleteExpense(expenseId);
                setExpenses(prev => prev.filter(exp => exp.expenseID !== expenseId));
                toast.success('Expense deleted successfully!');
            } catch (error) {
                console.error('Failed to delete expense:', error);
            }
        }
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Food': '#ff6b6b',
            'Transportation': '#4ecdc4',
            'Entertainment': '#45b7d1',
            'Shopping': '#96ceb4',
            'Health': '#feca57',
            'Utilities': '#ff9ff3',
            'Education': '#a8e6cf',
            'Travel': '#ff9ff3',
            'Other': '#a8e6cf'
        };
        return colors[category] || '#a8e6cf';
    };

    const getTotalAmount = () => {
        return filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    };

    return (
        <div>
            {/* Header */}
            <div className="card mb-4">
                <div className="d-flex align-center justify-between">
                    <div>
                        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>All Expenses</h1>
                        <p className="text-muted">
                            {filteredExpenses.length} of {expenses.length} expenses • Total: ${getTotalAmount().toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="card mb-4">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    {/* Search */}
                    <div className="form-group mb-0">
                        <label className="form-label">
                            <Search size={16} style={{ marginRight: '8px' }} />
                            Search
                        </label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-input"
                            placeholder="Search expenses..."
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="form-group mb-0">
                        <label className="form-label">
                            <Filter size={16} style={{ marginRight: '8px' }} />
                            Category
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="form-select"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort By */}
                    <div className="form-group mb-0">
                        <label className="form-label">Sort By</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="form-select"
                        >
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                            <option value="title">Title</option>
                            <option value="category">Category</option>
                        </select>
                    </div>

                    {/* Sort Order */}
                    <div className="form-group mb-0">
                        <label className="form-label">Order</label>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="form-select"
                        >
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Expenses List */}
            {filteredExpenses.length > 0 ? (
                <div>
                    {filteredExpenses.map((expense, index) => (
                        <div key={expense.expenseID || index} className="card mb-3">
                            <div className="d-flex align-center justify-between">
                                <div className="d-flex align-center gap-3" style={{ flex: 1 }}>
                                    {/* Category Icon */}
                                    <div
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '12px',
                                            background: getCategoryColor(expense.category),
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontWeight: '600',
                                            fontSize: '18px',
                                        }}
                                    >
                                        {expense.category.charAt(0)}
                                    </div>

                                    {/* Expense Details */}
                                    <div style={{ flex: 1 }}>
                                        <div className="d-flex align-center gap-2 mb-1">
                                            <h3 style={{ fontSize: '18px', margin: 0, fontWeight: '600' }}>
                                                {expense.title}
                                            </h3>
                                            <span
                                                style={{
                                                    background: getCategoryColor(expense.category),
                                                    color: 'white',
                                                    padding: '2px 8px',
                                                    borderRadius: '12px',
                                                    fontSize: '12px',
                                                    fontWeight: '500',
                                                }}
                                            >
                                                {expense.category}
                                            </span>
                                        </div>

                                        <div className="d-flex align-center gap-3 text-muted" style={{ fontSize: '14px' }}>
                                            <span className="d-flex align-center gap-1">
                                                <Calendar size={14} />
                                                {format(new Date(expense.createdTime), 'MMM dd, yyyy')}
                                            </span>
                                            {expense.paymentMethod && (
                                                <span>• {expense.paymentMethod}</span>
                                            )}
                                            {expense.notes && (
                                                <span>• {expense.notes}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Amount */}
                                    <div style={{ textAlign: 'right', marginRight: '16px' }}>
                                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#dc3545' }}>
                                            -${expense.amount.toFixed(2)}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="d-flex gap-1">
                                    <button
                                        onClick={() => handleDelete(expense.expenseID)}
                                        className="btn btn-danger"
                                        style={{ padding: '8px' }}
                                        title="Delete expense"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="card text-center" style={{ padding: '60px 20px' }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
                    <h3 style={{ marginBottom: '8px' }}>
                        {expenses.length === 0 ? 'No expenses yet' : 'No matching expenses'}
                    </h3>
                    <p className="text-muted">
                        {expenses.length === 0
                            ? 'Start tracking your expenses by adding your first entry'
                            : 'Try adjusting your search or filter criteria'
                        }
                    </p>
                </div>
            )}

            {/* Summary */}
            {filteredExpenses.length > 0 && (
                <div className="card mt-4">
                    <div className="d-flex align-center justify-between">
                        <div>
                            <h4 style={{ margin: 0 }}>Summary</h4>
                            <p className="text-muted mb-0">
                                Showing {filteredExpenses.length} expenses
                            </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '20px', fontWeight: '600', color: '#dc3545' }}>
                                Total: ${getTotalAmount().toFixed(2)}
                            </div>
                            <div style={{ fontSize: '14px', color: '#6c757d' }}>
                                Average: ${(getTotalAmount() / filteredExpenses.length).toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpenseList;
