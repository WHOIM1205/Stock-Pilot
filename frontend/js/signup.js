// Signup functionality
const API_BASE_URL = 'http://localhost:8000';

document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    signupForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        // Clear previous messages
        errorMessage.classList.add('hidden');
        errorMessage.textContent = '';
        successMessage.classList.add('hidden');
        successMessage.textContent = '';

        // Disable submit button
        const submitBtn = signupForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating account...';

        try {
            const response = await fetch(`${API_BASE_URL}/signup`, {
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
                // Signup successful
                successMessage.textContent = 'Account created successfully! Redirecting to login...';
                successMessage.classList.remove('hidden');

                // Reset form
                signupForm.reset();

                // Redirect to login after 2 seconds
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                // Signup failed
                throw new Error(data.detail || 'Signup failed');
            }
        } catch (error) {
            // Show error message
            errorMessage.textContent = error.message || 'Signup failed. Please try again.';
            errorMessage.classList.remove('hidden');

            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Sign Up';
        }
    });
});
