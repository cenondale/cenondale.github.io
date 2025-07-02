document.addEventListener('DOMContentLoaded', function() {
    // Password strength indicator
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordMatch = document.getElementById('password-match');
    const strengthText = document.getElementById('strength-text');
    const progressBar = document.querySelector('.password-strength .progress-bar');

    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // Check password length
            if (password.length >= 8) strength += 1;
            if (password.length >= 12) strength += 1;
            
            // Check for mixed case
            if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
            
            // Check for numbers
            if (/\d/.test(password)) strength += 1;
            
            // Check for special chars
            if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
            
            // Update progress bar and text
            const width = strength * 20;
            progressBar.style.width = width + '%';
            
            // Update color and text
            if (strength <= 1) {
                progressBar.className = 'progress-bar bg-danger';
                strengthText.textContent = 'Weak';
            } else if (strength <= 3) {
                progressBar.className = 'progress-bar bg-warning';
                strengthText.textContent = 'Medium';
            } else {
                progressBar.className = 'progress-bar bg-success';
                strengthText.textContent = 'Strong';
            }
            
            // Check password match if confirm field has value
            if (confirmPasswordInput && confirmPasswordInput.value) {
                checkPasswordMatch();
            }
        });
    }

    // Password match checker
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', checkPasswordMatch);
    }

    function checkPasswordMatch() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            passwordMatch.textContent = 'Passwords do not match!';
            passwordMatch.style.color = 'red';
            confirmPasswordInput.setCustomValidity('Passwords do not match');
        } else {
            passwordMatch.textContent = 'Passwords match!';
            passwordMatch.style.color = 'green';
            confirmPasswordInput.setCustomValidity('');
        }
    }

    // Add to cart button animation
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add bounce animation
            this.classList.add('bounce');
            
            // Remove animation after it completes
            setTimeout(() => {
                this.classList.remove('bounce');
            }, 1000);
            
            // Update cart count
            const cartBadge = document.querySelector('.badge.bg-danger');
            if (cartBadge) {
                let currentCount = parseInt(cartBadge.textContent);
                cartBadge.textContent = currentCount + 1;
                
                // Add animation to cart icon
                cartBadge.parentElement.classList.add('animate__animated', 'animate__tada');
                setTimeout(() => {
                    cartBadge.parentElement.classList.remove('animate__animated', 'animate__tada');
                }, 1000);
            }
            
            // Show success message
            const productName = this.closest('.card-body').querySelector('.card-title').textContent;
            showToast(`${productName} added to cart!`);
        });
    });

    // Toast notification function
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast show position-fixed bottom-0 end-0 mb-4 me-4';
        toast.style.zIndex = '1100';
        toast.innerHTML = `
            <div class="toast-header bg-primary text-white">
                <strong class="me-auto">Pokémon GO Store</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        `;
        document.body.appendChild(toast);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
        
        // Manual close
        toast.querySelector('.btn-close').addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        });
    }

    // Price range filter
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            const maxPrice = this.value;
            document.querySelector('.d-flex.justify-content-between span:last-child').textContent = `$${maxPrice}`;
            
            // In a real app, you would filter products here
            // For this demo, we'll just log the value
            console.log(`Filtering products up to $${maxPrice}`);
        });
    }

    // Form validation for registration
    const registerForm = document.querySelector('form');
    if (registerForm && document.getElementById('terms')) {
        registerForm.addEventListener('submit', function(e) {
            if (!document.getElementById('terms').checked) {
                e.preventDefault();
                alert('You must agree to the Terms of Service and Privacy Policy');
            }
        });
    }

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Additional functions for product filtering (would be used in a real implementation)
function filterProducts() {
    // This would filter products based on selected filters
    console.log('Filtering products...');
}

function sortProducts(criteria) {
    // This would sort products based on the selected criteria
    console.log(`Sorting products by ${criteria}...`);
}