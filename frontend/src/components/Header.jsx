import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, Plus, List, Users, Home } from 'lucide-react';

const Header = ({ currentUser }) => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Dashboard', icon: Home },
        { path: '/add', label: 'Add Expense', icon: Plus },
        { path: '/expenses', label: 'All Expenses', icon: List },
        { path: '/users', label: 'Users', icon: Users },
    ];

    return (
        <header style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
        }}>
            <div className="container">
                <div className="d-flex align-center justify-between" style={{ padding: '16px 0' }}>
                    {/* Logo */}
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="d-flex align-center gap-2">
                            <div style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                borderRadius: '12px',
                                padding: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Wallet size={24} color="white" />
                            </div>
                            <div>
                                <h1 style={{
                                    fontSize: '24px',
                                    fontWeight: '700',
                                    margin: 0,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}>
                                    Expense Tracker
                                </h1>
                            </div>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav>
                        <ul style={{
                            display: 'flex',
                            listStyle: 'none',
                            margin: 0,
                            padding: 0,
                            gap: '8px',
                        }}>
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;

                                return (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            style={{
                                                textDecoration: 'none',
                                                color: isActive ? '#667eea' : '#6c757d',
                                                padding: '12px 16px',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                fontWeight: isActive ? '600' : '500',
                                                background: isActive ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                                                transition: 'all 0.2s ease',
                                            }}
                                        >
                                            <Icon size={18} />
                                            <span style={{ display: 'none', '@media (min-width: 768px)': { display: 'inline' } }}>
                                                {item.label}
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* User Info */}
                    {currentUser && (
                        <div className="d-flex align-center gap-2">
                            <div style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                borderRadius: '50%',
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: '600',
                            }}>
                                {currentUser.userName?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div style={{ display: 'none', '@media (min-width: 768px)': { display: 'block' } }}>
                                <div style={{ fontSize: '14px', fontWeight: '500' }}>
                                    {currentUser.userName || 'User'}
                                </div>
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>
                                    {currentUser.userId ? 'Active' : 'Guest'}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
