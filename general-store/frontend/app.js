const API_URL = 'http://localhost:5000/api';
let currentUser = null;
let cart = [];
let products = [];
let customers = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (token) {
        currentUser = JSON.parse(localStorage.getItem('user'));
        document.getElementById('login-modal').style.display = 'none';
        showSection('dashboard');
    }
});

// Login Logic
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            currentUser = data.user;
            document.getElementById('login-modal').style.display = 'none';
            showSection('dashboard');
        } else {
            document.getElementById('login-error').textContent = data.message;
        }
    } catch (err) {
        document.getElementById('login-error').textContent = 'Server Error';
    }
});

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    location.reload();
}

// Navigation
async function showSection(section) {
    const content = document.getElementById('content-area');
    const links = document.querySelectorAll('.nav-link');
    links.forEach(l => l.classList.remove('active'));
    // Find link by text and add active
    links.forEach(l => { if(l.textContent.toLowerCase().includes(section)) l.classList.add('active'); });

    switch (section) {
        case 'dashboard':
            renderDashboard(content);
            break;
        case 'billing':
            renderBilling(content);
            break;
        case 'products':
            renderProducts(content);
            break;
        case 'customers':
            renderCustomers(content);
            break;
        case 'history':
            renderHistory(content);
            break;
        case 'reports':
            renderReports(content);
            break;
    }
}

// --- Dashboard ---
async function renderDashboard(container) {
    const res = await fetch(`${API_URL}/products/low-stock`);
    const lowStock = await res.json();
    const salesRes = await fetch(`${API_URL}/bills`);
    const sales = await salesRes.json();
    const totalSalesToday = sales.filter(s => new Date(s.bill_date).toDateString() === new Date().toDateString()).reduce((a, b) => a + Number(b.final_amount), 0);

    container.innerHTML = `
        <header><h1>Dashboard</h1></header>
        <div class="stats-grid">
            <div class="card"><h3>Total Sales Today</h3><div class="value">Rs. ${totalSalesToday.toFixed(2)}</div></div>
            <div class="card"><h3>Total Products</h3><div class="value" id="prod-count">...</div></div>
            <div class="card" style="border-color: ${lowStock.length > 0 ? 'var(--danger)' : ''}">
                <h3>Low Stock Alerts</h3>
                <div class="value ${lowStock.length > 0 ? 'low-stock' : ''}">${lowStock.length} Items</div>
            </div>
        </div>
        <div class="table-container">
            <table>
                <thead><tr><th>Low Stock Product</th><th>Current Stock</th><th>Category</th></tr></thead>
                <tbody>
                    ${lowStock.map(p => `<tr><td>${p.name}</td><td class="low-stock">${p.stock_quantity}</td><td>${p.category_name}</td></tr>`).join('')}
                </tbody>
            </table>
        </div>
    `;
    const prodRes = await fetch(`${API_URL}/products`);
    const allProds = await prodRes.json();
    document.getElementById('prod-count').textContent = allProds.length;
}

// --- Products Section ---
async function renderProducts(container) {
    const res = await fetch(`${API_URL}/products`);
    products = await res.json();
    container.innerHTML = `
        <header>
            <h1>Products Management</h1>
            <button onclick="openProductModal()">+ Add Product</button>
        </header>
        <div class="table-container">
            <table>
                <thead><tr><th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
                <tbody>
                    ${products.map(p => `
                        <tr>
                            <td>${p.product_id}</td>
                            <td>${p.name}</td>
                            <td>${p.category_name}</td>
                            <td>Rs. ${p.price}</td>
                            <td class="${p.stock_quantity < 5 ? 'low-stock' : ''}">${p.stock_quantity}</td>
                            <td>
                                <button onclick="deleteProduct(${p.product_id})" class="btn-danger">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// --- Billing Section ---
async function renderBilling(container) {
    const prodRes = await fetch(`${API_URL}/products`);
    products = await prodRes.json();
    const custRes = await fetch(`${API_URL}/customers`);
    customers = await custRes.json();

    container.innerHTML = `
        <header><h1>New Sale</h1></header>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
            <div class="card">
                <h3>Select Customer</h3>
                <select id="bill-customer" style="width: 100%; margin-bottom: 1rem;">
                    <option value="">Select Customer</option>
                    ${customers.map(c => `<option value="${c.customer_id}">${c.name} (${c.phone})</option>`).join('')}
                </select>
                <h3>Add Product</h3>
                <select id="bill-product" style="width: 100%; margin-bottom: 1rem;">
                    <option value="">Select Product</option>
                    ${products.map(p => `<option value="${p.product_id}" ${p.stock_quantity <= 0 ? 'disabled' : ''}>${p.name} - Rs. ${p.price} (${p.stock_quantity} in stock)</option>`).join('')}
                </select>
                <input type="number" id="bill-qty" placeholder="Quantity" value="1" min="1" style="width: 100%; margin-bottom: 1rem;">
                <button onclick="addToCart()" style="width: 100%;">Add to Cart</button>
            </div>
            <div class="card">
                <h3>Cart</h3>
                <div id="cart-items" style="margin: 1rem 0; min-height: 100px; border-bottom: 1px solid #334155;">
                    <!-- Cart items here -->
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
                    <span>Total:</span><span id="cart-total">Rs. 0.00</span>
                </div>
                <div style="margin-top: 1rem;">
                    <input type="number" id="bill-discount" placeholder="Discount Amount" value="0" style="width: 100%; margin-bottom: 1rem;">
                    <button onclick="generateBill()" style="width: 100%; background-color: var(--accent);">Generate Bill & Print</button>
                </div>
            </div>
        </div>
    `;
    cart = [];
}

function addToCart() {
    const prodId = document.getElementById('bill-product').value;
    const qty = parseInt(document.getElementById('bill-qty').value);
    const product = products.find(p => p.product_id == prodId);

    if (!product || !qty) return alert('Select product and quantity');
    if (qty > product.stock_quantity) return alert('Not enough stock');

    const subtotal = product.price * qty;
    cart.push({ ...product, quantity: qty, subtotal });
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    container.innerHTML = cart.map((item, index) => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span>${item.name} x ${item.quantity}</span>
            <span>Rs. ${item.subtotal.toFixed(2)}</span>
        </div>
    `).join('');
    const total = cart.reduce((a, b) => a + b.subtotal, 0);
    document.getElementById('cart-total').textContent = `Rs. ${total.toFixed(2)}`;
}

async function generateBill() {
    const customer_id = document.getElementById('bill-customer').value;
    const discount = parseFloat(document.getElementById('bill-discount').value) || 0;
    const total_amount = cart.reduce((a, b) => a + b.subtotal, 0);
    const final_amount = total_amount - discount;

    if (!customer_id) return alert('Select a customer');
    if (cart.length === 0) return alert('Cart is empty');

    const res = await fetch(`${API_URL}/bills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            customer_id,
            total_amount,
            discount,
            final_amount,
            items: cart.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                unit_price: item.price,
                subtotal: item.subtotal
            }))
        })
    });

    if (res.ok) {
        alert('Bill Generated Successfully!');
        printReceipt(customer_id, cart, total_amount, discount, final_amount);
        showSection('dashboard');
    }
}

function printReceipt(custId, items, total, discount, final) {
    const customer = customers.find(c => c.customer_id == custId);
    const receiptWin = window.open('', '', 'width=400,height=600');
    receiptWin.document.write(`
        <html>
            <head><style>body { font-family: monospace; padding: 20px; } table { width: 100%; }</style></head>
            <body>
                <h2 style="text-align:center;">GENERAL STORE</h2>
                <p>Date: ${new Date().toLocaleString()}</p>
                <p>Customer: ${customer.name}</p>
                <hr>
                <table>
                    <thead><tr><th>Item</th><th>Qty</th><th>Sub</th></tr></thead>
                    <tbody>
                        ${items.map(i => `<tr><td>${i.name}</td><td>${i.quantity}</td><td>${i.subtotal.toFixed(2)}</td></tr>`).join('')}
                    </tbody>
                </table>
                <hr>
                <p>Total: Rs. ${total.toFixed(2)}</p>
                <p>Discount: Rs. ${discount.toFixed(2)}</p>
                <p><strong>Final: Rs. ${final.toFixed(2)}</strong></p>
                <p style="text-align:center;">Thank You!</p>
            </body>
        </html>
    `);
    receiptWin.document.close();
    receiptWin.print();
}

// --- History & Reports ---
async function renderHistory(container) {
    const res = await fetch(`${API_URL}/bills`);
    const history = await res.json();
    container.innerHTML = `
        <header><h1>Sales History</h1></header>
        <div class="table-container">
            <table>
                <thead><tr><th>Bill ID</th><th>Customer</th><th>Amount</th><th>Date</th></tr></thead>
                <tbody>
                    ${history.map(b => `
                        <tr>
                            <td>#${b.bill_id}</td>
                            <td>${b.customer_name || 'Guest'}</td>
                            <td>Rs. ${b.final_amount}</td>
                            <td>${new Date(b.bill_date).toLocaleDateString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

async function renderReports(container) {
    const res = await fetch(`${API_URL}/bills/report`);
    const data = await res.json();
    container.innerHTML = `
        <header><h1>Reports</h1></header>
        <div class="stats-grid">
            <div class="card"><h3>Total Revenue</h3><div class="value">Rs. ${data.revenue ? Number(data.revenue).toFixed(2) : '0.00'}</div></div>
        </div>
        <div class="table-container" style="margin-top: 1rem;">
            <h3>Top Selling Products</h3>
            <table>
                <thead><tr><th>Product</th><th>Sold Quantity</th></tr></thead>
                <tbody>
                    ${data.topProducts.map(p => `<tr><td>${p.name}</td><td>${p.total_sold}</td></tr>`).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// --- Customers Section ---
async function renderCustomers(container) {
    const res = await fetch(`${API_URL}/customers`);
    const custs = await res.json();
    container.innerHTML = `
        <header>
            <h1>Customers</h1>
            <button onclick="openCustomerModal()">+ Add Customer</button>
        </header>
        <div class="table-container">
            <table>
                <thead><tr><th>Name</th><th>Phone</th><th>Email</th></tr></thead>
                <tbody>
                    ${custs.map(c => `<tr><td>${c.name}</td><td>${c.phone}</td><td>${c.email}</td></tr>`).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Delete helper
async function deleteProduct(id) {
    if(confirm('Delete this product?')) {
        await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
        showSection('products');
    }
}
