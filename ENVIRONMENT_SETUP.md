# Environment Setup for Expense Tracker

This document explains how to configure environment variables for the Expense Tracker application.

## 🔐 Environment Variables

The application uses environment variables to store sensitive configuration data like database credentials. This is a security best practice that prevents sensitive information from being committed to version control.

## 📁 Files

- `.env` - Contains your actual environment variables (DO NOT COMMIT TO GIT)
- `.env.example` - Template file showing required environment variables
- `application.yaml` - Spring Boot configuration using environment variables

## 🚀 Quick Setup

### 1. Copy the Example File
```bash
cp .env.example .env
```

### 2. Update Your Values
Edit the `.env` file and replace the placeholder values with your actual configuration:

```env
# Database Configuration
DB_HOST=your-database-host.com
DB_PORT=3306
DB_NAME=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Server Configuration
SERVER_PORT=8081
APP_NAME=Expense-Tracker

# Database Connection Pool
DB_MAX_POOL_SIZE=10
DB_MIN_IDLE=5
DB_CONNECTION_TIMEOUT=30000

# JPA Configuration
JPA_DDL_AUTO=update
JPA_DIALECT=org.hibernate.dialect.MySQL8Dialect

# Logging Configuration
LOG_LEVEL_ROOT=INFO
```

## 🔧 Configuration Details

### Database Configuration
- `DB_HOST` - Your MySQL database host
- `DB_PORT` - Database port (default: 3306)
- `DB_NAME` - Database name
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password

### Server Configuration
- `SERVER_PORT` - Application server port (default: 8081)
- `APP_NAME` - Application name

### Connection Pool Settings
- `DB_MAX_POOL_SIZE` - Maximum number of database connections (default: 10)
- `DB_MIN_IDLE` - Minimum idle connections (default: 5)
- `DB_CONNECTION_TIMEOUT` - Connection timeout in milliseconds (default: 30000)

### JPA Configuration
- `JPA_DDL_AUTO` - Hibernate DDL mode (default: update)
- `JPA_DIALECT` - Hibernate dialect (default: MySQL8Dialect)

### Logging
- `LOG_LEVEL_ROOT` - Root logging level (default: INFO)

## 🛡️ Security Best Practices

1. **Never commit `.env` files** - They are already in `.gitignore`
2. **Use strong passwords** - Especially for database credentials
3. **Limit database permissions** - Use a dedicated user with minimal required permissions
4. **Use environment-specific files** - Consider `.env.local`, `.env.production` for different environments
5. **Rotate credentials regularly** - Change passwords periodically

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Verify `DB_HOST`, `DB_PORT`, `DB_NAME` are correct
   - Check if database is running and accessible
   - Ensure firewall allows connections

2. **Authentication Failed**
   - Verify `DB_USERNAME` and `DB_PASSWORD`
   - Check if user has proper permissions

3. **Application Won't Start**
   - Check if all required environment variables are set
   - Verify port is not already in use

### Validation
You can validate your configuration by running:
```bash
mvn spring-boot:run
```

The application should start without errors and connect to your database successfully.

## 📝 Example for Local Development

For local development with MySQL, your `.env` might look like:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=expense_tracker
DB_USERNAME=root
DB_PASSWORD=your_local_password
SERVER_PORT=8081
APP_NAME=Expense-Tracker
DB_MAX_POOL_SIZE=10
DB_MIN_IDLE=5
DB_CONNECTION_TIMEOUT=30000
JPA_DDL_AUTO=update
JPA_DIALECT=org.hibernate.dialect.MySQL8Dialect
LOG_LEVEL_ROOT=DEBUG
```

## 🚀 Production Deployment

For production, consider:
- Using a secrets management service
- Setting environment variables through your deployment platform
- Using encrypted configuration files
- Implementing proper logging levels
