# Expense Tracker API Usage

## Adding an Expense

### Method 1: Include userId in JSON body
**POST** `/expense/add`

**Request Body:**
```json
{
  "title": "Grocery Shopping",
  "amount": 75.50,
  "category": "Food",
  "paymentMethod": "Credit Card",
  "notes": "Weekly groceries from Walmart",
  "userId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Method 2: Pass userId as path parameter
**POST** `/expense/add/{userId}`

**URL:** `/expense/add/550e8400-e29b-41d4-a716-446655440000`

**Request Body:**
```json
{
  "title": "Grocery Shopping",
  "amount": 75.50,
  "category": "Food",
  "paymentMethod": "Credit Card",
  "notes": "Weekly groceries from Walmart"
}
```

## Reading an Expense

**GET** `/expense/read/{id}`

**URL:** `/expense/read/1`

## Deleting an Expense

**DELETE** `/expense/delete/{id}`

**URL:** `/expense/delete/1`

## Response Examples

### Successful Response (200 OK)
```json
{
  "expenseID": 1,
  "title": "Grocery Shopping",
  "amount": 75.50,
  "category": "Food",
  "createdTime": "2024-01-15T10:30:00",
  "lastUpdateTime": null,
  "paymentMethod": "Credit Card",
  "notes": "Weekly groceries from Walmart",
  "user": {
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "userName": "john_doe",
    "password": "hashed_password"
  }
}
```

### Error Response (400 Bad Request)
```json
"Error: User not found: 550e8400-e29b-41d4-a716-446655440000"
```

## Notes

1. **userId** must be a valid UUID format
2. **title**, **amount**, and **category** are required fields
3. **amount** must be greater than 0
4. **paymentMethod** and **notes** are optional
5. The user must exist in the database before adding an expense

## Testing with curl

```bash
# Method 1: Include userId in body
curl -X POST http://localhost:8080/expense/add \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Grocery Shopping",
    "amount": 75.50,
    "category": "Food",
    "paymentMethod": "Credit Card",
    "notes": "Weekly groceries",
    "userId": "550e8400-e29b-41d4-a716-446655440000"
  }'

# Method 2: Pass userId in URL
curl -X POST http://localhost:8080/expense/add/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Grocery Shopping",
    "amount": 75.50,
    "category": "Food",
    "paymentMethod": "Credit Card",
    "notes": "Weekly groceries"
  }'
``` 