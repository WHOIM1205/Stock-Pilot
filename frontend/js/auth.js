// Auth Guard - Protect dashboard from unauthorized access
(function () {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // If on dashboard.html and not logged in, redirect to login
    if (window.location.pathname.includes('dashboard.html') && !isLoggedIn) {
        window.location.href = 'login.html';
    }
})();

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('authToken');
    window.location.href = 'login.html';
}

// Add logout event listener if on dashboard
if (window.location.pathname.includes('dashboard.html')) {
    document.addEventListener('DOMContentLoaded', function () {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', logout);
        }
    });
}
