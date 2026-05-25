# StoreOS — General Store Billing System

A modern, full-stack web application built for general stores to manage products, customers, and billing with advanced MySQL features.

## 🎨 Features
- **Modern UI**: Blue & Black professional theme with a sidebar layout.
- **Dashboard**: Real-time sales summary and low-stock alerts.
- **Inventory Management**: Full CRUD for products and categories.
- **Advanced Billing**: Select customers, add to cart, apply discounts, and print receipts.
- **Database Power**: Uses Stored Procedures, Triggers, Views, and Transactions for high performance and data integrity.
- **Reports**: Track revenue and top-selling products.

## 🛠️ Technology Stack
- **Frontend**: Vanilla HTML, CSS, JavaScript.
- **Backend**: Node.js, Express.js.
- **Database**: MySQL (demonstrating 3NF Normalization).

## 🗄️ Database Normalization
- **1NF**: All columns contain atomic values.
- **2NF**: Removed partial dependencies; all non-key attributes are fully dependent on the primary key.
- **3NF**: Removed transitive dependencies; attributes depend only on the primary key.

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

## 📊 MySQL Features Demonstrated
- **Stored Procedures**: `GenerateBill` for atomic transactions.
- **Triggers**: Auto-updates stock quantity after sales.
- **Views**: `vw_sales_summary` for complex joins.
- **Transactions**: Ensuring bill consistency if item insertion fails.
- **Indexes**: Faster searching on product names and customer phones.
