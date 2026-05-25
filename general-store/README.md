# StoreOS — General Store Billing System
A modern, full-stack web application built for general stores to manage products, customers, and billing with advanced MySQL features.

## 🎨 Features
- **Modern UI**: Blue & Black professional theme with a sidebar layout.
- **Dashboard**: Real-time sales summary and low-stock alerts.
- **Inventory Management**: Full CRUD for products and categories.
- **Advanced Billing**: Select customers, add to cart, apply discounts, and print receipts.
- **Database Power**: Uses Stored Procedures, Triggers, Views, and Transactions for high performance and data integrity.
- **Reports**: Track revenue and top-selling products.

## 🧾 Billing / Point of Sale
- Create customer bills
- Auto-calculate totals and discounts
- Generate printable receipts
- Manage multiple bill items

## 📦 Product Management
- Add, update, delete products
- Product categorization
- Search and sort products
- Low stock alerts

## 👥 Customer Management
- Add and manage customers
- Search customers by name or phone number
- View customer purchase history

## 📊 Sales & Reports
- Sales dashboard
- Revenue summary
- Best-selling products
- Transaction history with date filters

## 🔐 Authentication & Roles
- Secure login system
- Admin and Cashier roles
- Role-based access control
---
## 🛠️ Technology Stack
- **Frontend**: Vanilla HTML, CSS, JavaScript.
- **Backend**: Node.js, Express.js.
- **Database**: MySQL (demonstrating 3NF Normalization).

## 🗄️ Database Normalization
- **1NF**: All columns contain atomic values.
- **2NF**: Removed partial dependencies; all non-key attributes are fully dependent on the primary key.
- **3NF**: Removed transitive dependencies; attributes depend only on the primary key.

## 📊 MySQL Features Demonstrated
- **Stored Procedures**: `GenerateBill` for atomic transactions.
- **Triggers**: Auto-updates stock quantity after sales.
- **Views**: `vw_sales_summary` for complex joins.
- **Transactions**: Ensuring bill consistency if item insertion fails.
- **Indexes**: Faster searching on product names and customer phones.

# 🗄️ Database Concepts Implemented
- Normalization (1NF → 3NF)
- Stored Procedures
- Triggers
- Views
- Transactions
- Foreign Keys
- Indexing
- Role-Based Access Control
---

# 📁 Database Tables
| Table Name | Description             |
|------------|-------------------------|
| customers  | Customer records        |
| categories | Product categories      |
| products   | Product details         |
| bills      | Bill information        |
| bill_items | Individual bill items   |
| users      | System users            |
| audit_log  | Tracks database changes |
---

## 🚀 Setup Instructions
### 1. Database Setup
1. Open **MySQL Workbench** or your preferred MySQL client.
2. Run the scripts in the `database/` folder in this order:
   - `schema.sql` (Creates tables)
   - `procedures.sql` (Adds business logic)
   - `triggers.sql` (Automates stock & logging)
   - `views.sql` (Simplifies reporting)
   - `seed.sql` (Adds sample data)

### 2. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update `.env` file with your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=general_store
   ```
4. Start the server:
   ```bash
   node server.js
   ```

### 3. Frontend Setup
1. Simply open `frontend/index.html` in your browser.
2. **Login Credentials**:
   - **Admin**: `admin` / `admin123`
   - **Cashier**: `cashier` / `cashier123`

# 🚀 Installation
## 1️⃣ Clone Repository
```bash
git clone https://github.com/Zamin-the-Shadow/General-Store-Billing-System.git
```

## 2️⃣ Open Project Folder
```bash
cd General-Store-Billing-System
```

## 3️⃣ Install Dependencies
```bash
npm install
```

## 4️⃣ Configure Environment Variables
Create a `.env` file in the root directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=general_store_db
DB_PORT=3306
PORT=5000
SESSION_SECRET=your_secret_key
```

## 5️⃣ Import MySQL Database
Import the SQL file into MySQL using:
- MySQL Workbench
- phpMyAdmin
- XAMPP
- Railway MySQL

## 6️⃣ Start Server
```bash
npm start
```
Server will run on:
```text
http://localhost:5000
```
---

# 📸 Project Modules
- Login System
- Admin Dashboard
- Billing System
- Inventory Management
- Customer Records
- Sales Reports
- Database Audit Logs
---

# 🎯 Learning Outcomes
This project demonstrates practical implementation of:
- Full-stack web development
- Database management systems
- SQL optimization
- Backend API development
- Authentication systems
- Real-world billing workflows
---

# 👨‍💻 Author
Developed by Syed Zamin Raza Kazmi
---

# 📄 License
This project is developed for educational purposes as a university semester project.
---

# ⭐ Support
If you like this project, consider giving it a star on GitHub ⭐
