// Authentication functionality
document.addEventListener('DOMContentLoaded', function() {
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // In a real application, you would validate the credentials with your backend
            // For this demo, we'll just check that fields aren't empty
            if (email && password) {
                // Store user data in localStorage (not secure for production!)
                localStorage.setItem('currentUser', JSON.stringify({
                    email: email
                }));
                
                alert('Login successful! Redirecting to homepage...');
                window.location.href = 'index.html';
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    // Registration form submission
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const pokemonGoCode = document.getElementById('pokemonGoCode').value;
            
            // Basic validation
            if (!firstName || !lastName || !email || !password || !confirmPassword || !pokemonGoCode) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            
            if (pokemonGoCode.length !== 12 || !/^\d+$/.test(pokemonGoCode)) {
                alert('Please enter a valid 12-digit Pokémon GO account code.');
                return;
            }
            
            // In a real application, you would send this data to your backend
            // For this demo, we'll just store it in localStorage (not secure for production!)
            const users = JSON.parse(localStorage.getItem('users') || [];
            
            // Check if user already exists
            if (users.some(user => user.email === email)) {
                alert('An account with this email already exists.');
                return;
            }
            
            // Add new user
            users.push({
                firstName: firstName,
                middleName: document.getElementById('middleName').value,
                lastName: lastName,
                gender: document.getElementById('gender').value,
                birthday: document.getElementById('birthday').value,
                email: email,
                password: password, // In production, never store plain text passwords!
                pokemonGoCode: pokemonGoCode
            });
            
            localStorage.setItem('users', JSON.stringify(users));
            
            // Log the user in
            localStorage.setItem('currentUser', JSON.stringify({
                email: email
            }));
            
            alert('Registration successful! Welcome to Pokémon GO Webstore.');
            window.location.href = 'index.html';
        });
    }
    
    // Check if user is logged in
    checkAuthStatus();
});

function checkAuthStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        // User is logged in
        const loginButtons = document.querySelectorAll('a[href="login.html"]');
        const registerButtons = document.querySelectorAll('a[href="register.html"]');
        
        loginButtons.forEach(button => {
            button.textContent = 'My Account';
            button.href = '#';
        });
        
        registerButtons.forEach(button => {
            button.style.display = 'none';
        });
    }
}