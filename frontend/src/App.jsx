import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header.jsx';
import Dashboard from './components/Dashboard.jsx';
import AddExpense from './components/AddExpense.jsx';
import ExpenseList from './components/ExpenseList.jsx';
import UserManagement from './components/UserManagement.jsx';
import { getCurrentUser, logout, getAllExpenses } from './services/api.jsx';

function App() {
    const [currentUser, setCurrentUser] = useState(getCurrentUser());
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true); // Set loading to true initially

    useEffect(() => {
        const fetchExpenses = async () => {
            if (currentUser) {
                try {
                    setLoading(true);
                    const fetchedExpenses = await getAllExpenses(currentUser.userId);
                    setExpenses(fetchedExpenses);
                } catch (error) {
                    console.error('Failed to fetch expenses:', error);
                    // Optionally, show a toast error
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false); // No user, no loading
            }
        };

        fetchExpenses();
    }, [currentUser]); // Re-run when currentUser changes

    const handleLogout = () => {
        logout();
        setCurrentUser(null);
        setExpenses([]); // Clear expenses on logout
    };

    if (loading) {
        return (
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}>
                <div className="card text-center">
                    <h2>Loading Expense Tracker...</h2>
                    <p className="text-muted">Please wait a moment</p>
                </div>
            </div>
        );
    }

    return (
        <Router>
            <div className="App">
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#363636',
                            color: '#fff',
                        },
                    }}
                />

                <Header currentUser={currentUser} onLogout={handleLogout} />

                <main className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
                    <Routes>
                        {currentUser ? (
                            <>
                                <Route
                                    path="/"
                                    element={
                                        <Dashboard
                                            currentUser={currentUser}
                                            expenses={expenses}
                                            setExpenses={setExpenses}
                                        />
                                    }
                                />
                                <Route
                                    path="/add"
                                    element={
                                        <AddExpense
                                            currentUser={currentUser}
                                            setExpenses={setExpenses}
                                        />
                                    }
                                />
                                <Route
                                    path="/expenses"
                                    element={
                                        <ExpenseList
                                            expenses={expenses}
                                            setExpenses={setExpenses}
                                        />
                                    }
                                />
                                <Route path="/login" element={<Navigate to="/" />} />
                            </>
                        ) : (
                            <>
                                <Route 
                                    path="/login"
                                    element={<UserManagement onLogin={setCurrentUser} />}
                                />
                                <Route path="*" element={<Navigate to="/login" />} />
                            </>
                        )}
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
