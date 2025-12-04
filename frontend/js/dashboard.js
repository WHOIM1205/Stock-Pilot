// Dashboard functionality
const API_BASE_URL = 'http://localhost:8000';

let currentSearchQuery = '';

// Load items on page load
document.addEventListener('DOMContentLoaded', function () {
    loadItems();
    setupEventListeners();
});

// Setup all event listeners
function setupEventListeners() {
    // Add item form
    document.getElementById('addItemForm').addEventListener('submit', handleAddItem);

    // Search functionality
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    document.getElementById('clearSearchBtn').addEventListener('click', handleClearSearch);
    document.getElementById('searchInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Edit item form
    document.getElementById('editItemForm').addEventListener('submit', handleEditItem);
}

// Load all items or search results
async function loadItems(searchName = '') {
    const tableBody = document.getElementById('itemsTableBody');
    const loadingMessage = document.getElementById('loadingMessage');
    const emptyMessage = document.getElementById('emptyMessage');

    // Show loading
    loadingMessage.classList.remove('hidden');
    tableBody.innerHTML = '';
    emptyMessage.classList.add('hidden');

    try {
        let url = `${API_BASE_URL}/stock/`;
        if (searchName) {
            url += `?name=${encodeURIComponent(searchName)}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }

        const items = await response.json();

        // Hide loading
        loadingMessage.classList.add('hidden');

        if (items.length === 0) {
            emptyMessage.classList.remove('hidden');
            return;
        }

        // Populate table
        items.forEach(item => {
            const row = createTableRow(item);
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error loading items:', error);
        loadingMessage.classList.add('hidden');
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--danger-color);">Error loading items</td></tr>`;
    }
}

// Create table row for an item
function createTableRow(item) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${item.id}</td>
        <td>${escapeHtml(item.name)}</td>
        <td>${item.Quantity}</td>
        <td>$${parseFloat(item.Price).toFixed(2)}</td>
        <td>
            <button class="btn btn-edit" onclick="openEditModal(${item.id}, '${escapeHtml(item.name)}', ${item.Quantity}, ${item.Price})">Edit</button>
            <button class="btn btn-delete" onclick="deleteItem(${item.id})">Delete</button>
        </td>
    `;
    return row;
}

// Handle add item
async function handleAddItem(e) {
    e.preventDefault();

    const form = e.target;
    const name = document.getElementById('itemName').value.trim();
    const quantity = parseInt(document.getElementById('itemQuantity').value);
    const price = parseFloat(document.getElementById('itemPrice').value);

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Adding...';

    try {
        const response = await fetch(`${API_BASE_URL}/stock/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                Quantity: quantity,
                Price: price
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to add item');
        }

        // Reset form
        form.reset();

        // Reload items
        await loadItems(currentSearchQuery);

    } catch (error) {
        console.error('Error adding item:', error);
        alert('Error: ' + error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Add Item';
    }
}

// Handle search
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    currentSearchQuery = searchInput.value.trim();
    loadItems(currentSearchQuery);
}

// Handle clear search
function handleClearSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    currentSearchQuery = '';
    loadItems();
}

// Open edit modal
function openEditModal(id, name, quantity, price) {
    document.getElementById('editItemId').value = id;
    document.getElementById('editItemName').value = name;
    document.getElementById('editItemQuantity').value = quantity;
    document.getElementById('editItemPrice').value = price;

    document.getElementById('editModal').classList.remove('hidden');
}

// Close edit modal
function closeEditModal() {
    document.getElementById('editModal').classList.add('hidden');
    document.getElementById('editItemForm').reset();
}

// Handle edit item
async function handleEditItem(e) {
    e.preventDefault();

    const form = e.target;
    const id = document.getElementById('editItemId').value;
    const name = document.getElementById('editItemName').value.trim();
    const quantity = parseInt(document.getElementById('editItemQuantity').value);
    const price = parseFloat(document.getElementById('editItemPrice').value);

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Updating...';

    try {
        const response = await fetch(`${API_BASE_URL}/stock/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                Quantity: quantity,
                Price: price
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to update item');
        }

        // Close modal
        closeEditModal();

        // Reload items
        await loadItems(currentSearchQuery);

    } catch (error) {
        console.error('Error updating item:', error);
        alert('Error: ' + error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Update';
    }
}

// Delete item
async function deleteItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/stock/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to delete item');
        }

        // Reload items
        await loadItems(currentSearchQuery);

    } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error: ' + error.message);
    }
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('editModal');
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeEditModal();
        }
    });
});
