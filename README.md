# Expense Tracker Application

A modern, full-stack expense tracking application built with Spring Boot backend and React frontend. Track your daily expenses with a beautiful, intuitive interface similar to a journal entry application.

## 🚀 Features

### Backend (Spring Boot)
- **RESTful API** with comprehensive CRUD operations
- **MySQL Database** integration with JPA/Hibernate
- **User Management** with UUID-based authentication
- **Expense Tracking** with categories and payment methods
- **Data Validation** and error handling
- **CORS Support** for frontend integration

### Frontend (React)
- **Modern UI/UX** with gradient backgrounds and smooth animations
- **Responsive Design** that works on all devices
- **Dashboard** with expense statistics and quick actions
- **Add Expense Form** with category selection and validation
- **Expense List** with search, filter, and sort capabilities
- **User Management** interface
- **Real-time Notifications** with toast messages

## 🛠️ Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.x**
- **Spring Data JPA**
- **MySQL 8.0**
- **Maven**

### Frontend
- **React 18**
- **React Router DOM**
- **Axios** for API calls
- **Lucide React** for icons
- **React Hot Toast** for notifications
- **Date-fns** for date formatting

## 📋 Prerequisites

Before running this application, make sure you have:

- **Java 17** or higher
- **Node.js 16** or higher
- **MySQL 8.0** or higher
- **Maven 3.6** or higher

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Expense-Tracker
```

### 2. Database Setup

#### Create MySQL Database
```sql
CREATE DATABASE expense_tracker;
CREATE USER 'expenseuser'@'localhost' IDENTIFIED BY 'ExpensePass123!';
GRANT ALL PRIVILEGES ON expense_tracker.* TO 'expenseuser'@'localhost';
FLUSH PRIVILEGES;
```

#### Update Database Configuration
Edit `src/main/resources/application.yaml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/expense_tracker?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC&createDatabaseIfNotExist=true
    username: your_username
    password: your_password
```

### 3. Start the Backend

```bash
cd Expense-Tracker
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 4. Start the Frontend

```bash
cd frontend
npm install
npm start
```

The frontend will start on `http://localhost:3000`

## 📱 Application Structure

```
Expense-Tracker/
├── src/main/java/com/tracker/expense/Expense/Tracker/
│   ├── controller/
│   │   ├── ExpenseController.java
│   │   └── UserController.java
│   ├── entity/
│   │   ├── Expense.java
│   │   └── User.java
│   ├── repository/
│   │   ├── ExpenseRepository.java
│   │   └── UserRepository.java
│   ├── service/
│   │   ├── ExpenseService.java
│   │   └── UserService.java
│   └── ExpenseTrackerApplication.java
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Dashboard.js
│   │   │   ├── AddExpense.js
│   │   │   ├── ExpenseList.js
│   │   │   └── UserManagement.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### User Management
- `POST /user/create-test` - Create a test user
- `POST /user/create` - Create a new user
- `GET /user/{userId}` - Get user by ID

### Expense Management
- `POST /expense/add` - Add expense with userId in body
- `POST /expense/add/{userId}` - Add expense with userId in path
- `GET /expense/read/{id}` - Get expense by ID
- `DELETE /expense/delete/{id}` - Delete expense by ID
- `GET /expense/health` - Health check

## 🎨 Frontend Features

### Dashboard
- **Welcome Section** with personalized greeting
- **Statistics Cards** showing total, monthly, and average expenses
- **Quick Add Section** for common expenses
- **Recent Expenses** list with category icons

### Add Expense Form
- **Form Validation** with real-time feedback
- **Category Selection** with emoji icons
- **Payment Method** tracking
- **Notes Field** for additional details
- **Loading States** and success notifications

### Expense List
- **Search Functionality** across title, notes, and category
- **Category Filtering** with dropdown
- **Sorting Options** by date, amount, title, or category
- **Delete Actions** with confirmation
- **Summary Statistics** for filtered results

### User Management
- **Current User Display** with avatar
- **User Creation Form** for future multi-user support
- **Information Section** about current capabilities

## 🎯 Usage Examples

### Adding an Expense
1. Navigate to "Add Expense" from the dashboard
2. Fill in the required fields:
   - **Title**: "Grocery Shopping"
   - **Amount**: 75.50
   - **Category**: "Food"
   - **Payment Method**: "Credit Card"
   - **Notes**: "Weekly groceries from Walmart"
3. Click "Save Expense"

### Quick Add from Dashboard
1. Use the "Quick Add" section on the dashboard
2. Click on any preset option (Coffee, Lunch, Gas, Grocery)
3. The expense is automatically added with the current user

### Searching and Filtering
1. Go to "All Expenses" page
2. Use the search bar to find specific expenses
3. Filter by category using the dropdown
4. Sort by date, amount, title, or category
5. View summary statistics for filtered results

## 🔒 Security Features

- **Input Validation** on both frontend and backend
- **SQL Injection Protection** through JPA
- **CORS Configuration** for secure frontend-backend communication
- **Error Handling** with meaningful messages
- **UUID-based User IDs** for enhanced security

## 🚀 Deployment

### Backend Deployment
```bash
mvn clean package
java -jar target/Expense-Tracker-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the build folder to your web server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the console logs for error messages
2. Verify database connection settings
3. Ensure all dependencies are installed
4. Check that both backend and frontend are running

## 🔮 Future Enhancements

- **Multi-user Support** with user roles
- **Budget Management** with alerts
- **Expense Analytics** with charts and graphs
- **Export Functionality** (PDF, CSV)
- **Mobile App** using React Native
- **Push Notifications** for budget alerts
- **Receipt Image Upload** and OCR
- **Recurring Expenses** tracking

---

**Happy Expense Tracking! 💰📊**
