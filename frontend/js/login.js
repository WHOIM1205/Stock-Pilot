// Login functionality
const API_BASE_URL = 'http://localhost:8000';

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    // Check if already logged in
    if (localStorage.getItem('isLoggedIn')) {
        window.location.href = 'dashboard.html';
        return;
    }

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        // Clear previous error
        errorMessage.classList.add('hidden');
        errorMessage.textContent = '';

        // Disable submit button
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful
                localStorage.setItem('isLoggedIn', 'true');
                if (data.access_token) {
                    localStorage.setItem('authToken', data.access_token);
                }

                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                // Login failed
                throw new Error(data.detail || 'Login failed');
            }
        } catch (error) {
            // Show error message
            errorMessage.textContent = error.message || 'Login failed. Please check your credentials.';
            errorMessage.classList.remove('hidden');

            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Login';
        }
    });
});
