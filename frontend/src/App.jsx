import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header.jsx';
import Dashboard from './components/Dashboard.jsx';
import AddExpense from './components/AddExpense.jsx';
import ExpenseList from './components/ExpenseList.jsx';
import UserManagement from './components/UserManagement.jsx';
import { createTestUser } from './services/api.jsx';

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initialize app by creating a test user if none exists
        const initializeApp = async () => {
            try {
                const user = await createTestUser();
                setCurrentUser(user);
            } catch (error) {
                console.error('Failed to initialize app:', error);
                // Set a default user if API fails
                setCurrentUser({ userId: 'test-user-id', userName: 'testuser' });
            } finally {
                setLoading(false);
            }
        };

        initializeApp();
    }, []);

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
                    <p className="text-muted">Please wait while we set up your account</p>
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

                <Header currentUser={currentUser} />

                <main className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
                    <Routes>
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
                        <Route
                            path="/users"
                            element={
                                <UserManagement
                                    currentUser={currentUser}
                                />
                            }
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
