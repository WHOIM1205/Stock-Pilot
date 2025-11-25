const API_URL = ""; // Relative path since we are serving from same origin

document.addEventListener('DOMContentLoaded', () => {
    // Login Logic
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const guestLoginBtn = document.getElementById('guestLoginBtn');

        // Guest Login
        if (guestLoginBtn) {
            guestLoginBtn.addEventListener('click', () => {
                window.location.href = 'dashboard.html';
            });
        }

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMsg = document.getElementById('loginError');

            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                if (response.ok) {
                    window.location.href = 'dashboard.html';
                } else {
                    const data = await response.json();
                    errorMsg.textContent = data.detail || 'Invalid username or password';
                    errorMsg.style.display = 'block';
                }
            } catch (error) {
                console.error('Error:', error);
                errorMsg.textContent = 'An error occurred. Please try again.';
                errorMsg.style.display = 'block';
            }
        });
    }

    // Signup Logic
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const errorMsg = document.getElementById('signupError');

            if (password !== confirmPassword) {
                errorMsg.textContent = "Passwords do not match";
                errorMsg.style.display = 'block';
                return;
            }

            try {
                const response = await fetch(`${API_URL}/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Registration successful! Please login.');
                    window.location.href = 'login.html';
                } else {
                    errorMsg.textContent = data.detail || 'An error occurred';
                    errorMsg.style.display = 'block';
                }
            } catch (error) {
                console.error('Error:', error);
                errorMsg.textContent = 'An error occurred. Please try again.';
                errorMsg.style.display = 'block';
            }
        });
    }

    // Dashboard Logic
    const productTableBody = document.getElementById('productTableBody');
    if (productTableBody) {
        fetchProducts();

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        // Modal Handling
        const modal = document.getElementById('productModal');
        const addProductBtn = document.getElementById('addProductBtn');
        const closeModalBtn = document.getElementById('closeModal');
        const cancelModalBtn = document.getElementById('cancelModal');
        const productForm = document.getElementById('productForm');
        const modalTitle = document.getElementById('modalTitle');

        addProductBtn.addEventListener('click', () => {
            modalTitle.textContent = 'Add Product';
            productForm.reset();
            document.getElementById('productId').value = '';
            modal.classList.add('active');
        });

        const closeModal = () => modal.classList.remove('active');
        closeModalBtn.addEventListener('click', closeModal);
        cancelModalBtn.addEventListener('click', closeModal);

        // Form Submit (Add/Edit)
        productForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = document.getElementById('productId').value;
            const name = document.getElementById('productName').value;
            const category = document.getElementById('productCategory').value;
            const quantity = parseInt(document.getElementById('productQuantity').value);
            const price = parseFloat(document.getElementById('productPrice').value);

            const product = { name, category, quantity, price };
            const method = id ? 'PUT' : 'POST';
            const url = id ? `${API_URL}/products/${id}` : `${API_URL}/products`;

            try {
                const response = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(product)
                });

                if (response.ok) {
                    closeModal();
                    fetchProducts();
                } else {
                    alert('Failed to save product');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred');
            }
        });
    }
});

async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();
        renderTable(products);
        updateStats(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function renderTable(products) {
    const tbody = document.getElementById('productTableBody');
    tbody.innerHTML = '';

    products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.quantity}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td class="actions">
                <button class="btn btn-sm btn-edit" onclick="editProduct(${product.id}, '${product.name}', '${product.category}', ${product.quantity}, ${product.price})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function updateStats(products) {
    document.getElementById('totalProducts').textContent = products.length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    document.getElementById('totalValue').textContent = `$${totalValue.toFixed(2)}`;
}

// Global functions for onclick handlers
window.editProduct = (id, name, category, quantity, price) => {
    document.getElementById('modalTitle').textContent = 'Edit Product';
    document.getElementById('productId').value = id;
    document.getElementById('productName').value = name;
    document.getElementById('productCategory').value = category;
    document.getElementById('productQuantity').value = quantity;
    document.getElementById('productPrice').value = price;
    document.getElementById('productModal').classList.add('active');
};

window.deleteProduct = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            const response = await fetch(`${API_URL}/products/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchProducts();
            } else {
                alert('Failed to delete product');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    }
};
