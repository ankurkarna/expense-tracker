import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp, TrendingDown, DollarSign, Calendar, PieChart } from 'lucide-react';
import { format } from 'date-fns';
import { addExpense } from '../services/api.jsx';
import toast from 'react-hot-toast';

const Dashboard = ({ currentUser, expenses, setExpenses }) => {
    const [recentExpenses, setRecentExpenses] = useState([]);
    const [stats, setStats] = useState({
        totalExpenses: 0,
        monthlyTotal: 0,
        averageExpense: 0,
        categoryBreakdown: {}
    });

    useEffect(() => {
        // Calculate stats from expenses
        if (expenses.length > 0) {
            const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
            const currentMonth = new Date().getMonth();
            const monthlyExpenses = expenses.filter(exp => {
                const expDate = new Date(exp.createdTime);
                return expDate.getMonth() === currentMonth;
            });
            const monthlyTotal = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);

            const categoryBreakdown = expenses.reduce((acc, exp) => {
                acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
                return acc;
            }, {});

            setStats({
                totalExpenses: total,
                monthlyTotal,
                averageExpense: total / expenses.length,
                categoryBreakdown
            });

            // Get recent expenses (last 5)
            setRecentExpenses(expenses.slice(0, 5));
        }
    }, [expenses]);

    const quickAddExpense = async (presetData) => {
        try {
            const expenseData = {
                ...presetData,
                userId: currentUser.userId
            };

            const newExpense = await addExpense(expenseData);
            setExpenses(prev => [newExpense, ...prev]);
            toast.success('Expense added quickly!');
        } catch (error) {
            console.error('Failed to add quick expense:', error);
        }
    };

    const quickAddOptions = [
        { title: 'Coffee', amount: 4.50, category: 'Food', icon: '☕' },
        { title: 'Lunch', amount: 15.00, category: 'Food', icon: '🍽️' },
        { title: 'Gas', amount: 45.00, category: 'Transportation', icon: '⛽' },
        { title: 'Grocery', amount: 75.00, category: 'Food', icon: '🛒' },
    ];

    const getCategoryColor = (category) => {
        const colors = {
            'Food': '#ff6b6b',
            'Transportation': '#4ecdc4',
            'Entertainment': '#45b7d1',
            'Shopping': '#96ceb4',
            'Health': '#feca57',
            'Utilities': '#ff9ff3',
            'Other': '#a8e6cf'
        };
        return colors[category] || '#a8e6cf';
    };

    return (
        <div>
            {/* Welcome Section */}
            <div className="card mb-4">
                <div className="d-flex align-center justify-between">
                    <div>
                        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>
                            Welcome back, {currentUser?.name || 'User'}! 👋
                        </h1>
                        <p className="text-muted">
                            Here's your expense overview for {format(new Date(), 'MMMM yyyy')}
                        </p>
                    </div>
                    <Link to="/add" className="btn btn-primary">
                        <Plus size={18} />
                        Add Expense
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <div className="card">
                    <div className="d-flex align-center justify-between">
                        <div>
                            <p className="text-muted mb-1">Total Expenses</p>
                            <h2 style={{ fontSize: '32px', margin: 0, color: '#667eea' }}>
                                ${stats.totalExpenses.toFixed(2)}
                            </h2>
                        </div>
                        <div style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '12px',
                            padding: '12px',
                        }}>
                            <DollarSign size={24} color="white" />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="d-flex align-center justify-between">
                        <div>
                            <p className="text-muted mb-1">This Month</p>
                            <h2 style={{ fontSize: '32px', margin: 0, color: '#28a745' }}>
                                ${stats.monthlyTotal.toFixed(2)}
                            </h2>
                        </div>
                        <div style={{
                            background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                            borderRadius: '12px',
                            padding: '12px',
                        }}>
                            <TrendingUp size={24} color="white" />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="d-flex align-center justify-between">
                        <div>
                            <p className="text-muted mb-1">Average Expense</p>
                            <h2 style={{ fontSize: '32px', margin: 0, color: '#ffc107' }}>
                                ${stats.averageExpense.toFixed(2)}
                            </h2>
                        </div>
                        <div style={{
                            background: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)',
                            borderRadius: '12px',
                            padding: '12px',
                        }}>
                            <PieChart size={24} color="white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Add Section */}
            <div className="card mb-4">
                <h3 style={{ marginBottom: '20px' }}>Quick Add Expense</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    {quickAddOptions.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => quickAddExpense(option)}
                            style={{
                                background: 'white',
                                border: '2px solid #e9ecef',
                                borderRadius: '12px',
                                padding: '16px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                textAlign: 'left',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.borderColor = '#667eea';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.borderColor = '#e9ecef';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{option.icon}</div>
                            <div style={{ fontWeight: '600', marginBottom: '4px' }}>{option.title}</div>
                            <div style={{ color: '#6c757d', fontSize: '14px' }}>
                                ${option.amount.toFixed(2)} • {option.category}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Recent Expenses */}
            <div className="card">
                <div className="d-flex align-center justify-between mb-3">
                    <h3>Recent Expenses</h3>
                    <Link to="/expenses" className="btn btn-secondary">
                        View All
                    </Link>
                </div>

                {recentExpenses.length > 0 ? (
                    <div>
                        {recentExpenses.map((expense, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '16px 0',
                                    borderBottom: index < recentExpenses.length - 1 ? '1px solid #e9ecef' : 'none',
                                }}
                            >
                                <div className="d-flex align-center gap-3">
                                    <div
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: getCategoryColor(expense.category),
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontWeight: '600',
                                        }}
                                    >
                                        {expense.category.charAt(0)}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                                            {expense.title}
                                        </div>
                                        <div style={{ color: '#6c757d', fontSize: '14px' }}>
                                            {expense.category} • {format(new Date(expense.createdTime), 'MMM dd, yyyy')}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: '600', color: '#dc3545' }}>
                                        -${expense.amount.toFixed(2)}
                                    </div>
                                    <div style={{ color: '#6c757d', fontSize: '12px' }}>
                                        {expense.paymentMethod}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
                        <h4 style={{ marginBottom: '8px' }}>No expenses yet</h4>
                        <p className="text-muted mb-3">
                            Start tracking your expenses by adding your first entry
                        </p>
                        <Link to="/add" className="btn btn-primary">
                            <Plus size={18} />
                            Add Your First Expense
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
