// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart if it doesn't exist
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    
    // Update cart count in navbar
    updateCartCount();
    
    // Add to cart buttons functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            
            addToCart(productId, productName, productPrice);
        });
    });
    
    // If on cart page, load cart items
    if (document.querySelector('#cartItems')) {
        loadCartItems();
    }
    
    // If on payment page, load order summary
    if (document.querySelector('#orderItems')) {
        loadOrderSummary();
    }
    
    // Complete order button
    const completeOrderBtn = document.getElementById('completeOrderBtn');
    if (completeOrderBtn) {
        completeOrderBtn.addEventListener('click', function() {
            completeOrder();
        });
    }
});

function addToCart(id, name, price) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show notification
    alert(`${name} has been added to your cart!`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElements = document.querySelectorAll('#cartCount');
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
    
    // Enable/disable checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.disabled = count === 0;
    }
}

function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartItemsElement = document.getElementById('cartItems');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    
    if (cart.length === 0) {
        cartItemsElement.innerHTML = `
            <tr class="empty-cart">
                <td colspan="5" class="text-center py-4">Your cart is empty</td>
            </tr>
        `;
        subtotalElement.textContent = '$0.00';
        taxElement.textContent = '$0.00';
        totalElement.textContent = '$0.00';
        return;
    }
    
    let subtotal = 0;
    let html = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        html += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <div class="input-group input-group-sm" style="width: 120px;">
                        <button class="btn btn-outline-secondary decrease-quantity" data-id="${item.id}" type="button">-</button>
                        <input type="text" class="form-control text-center quantity-input" value="${item.quantity}" data-id="${item.id}">
                        <button class="btn btn-outline-secondary increase-quantity" data-id="${item.id}" type="button">+</button>
                    </div>
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td class="text-end">
                    <button class="btn btn-sm btn-outline-danger remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    cartItemsElement.innerHTML = html;
    
    // Calculate totals
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners for quantity changes
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function() {
            updateQuantity(this.getAttribute('data-id'), -1);
        });
    });
    
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', function() {
            updateQuantity(this.getAttribute('data-id'), 1);
        });
    });
    
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const newQuantity = parseInt(this.value) || 1;
            updateQuantity(this.getAttribute('data-id'), newQuantity, true);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            removeItem(this.getAttribute('data-id'));
        });
    });
}

function updateQuantity(id, change, setExact = false) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const item = cart.find(item => item.id === id);
    
    if (item) {
        if (setExact) {
            item.quantity = change >= 1 ? change : 1;
        } else {
            item.quantity += change;
            if (item.quantity < 1) item.quantity = 1;
        }
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
}

function removeItem(id) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newCart = cart.filter(item => item.id !== id);
    
    localStorage.setItem('cart', JSON.stringify(newCart));
    loadCartItems();
    updateCartCount();
}

function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const orderItemsElement = document.getElementById('orderItems');
    const orderSubtotalElement = document.getElementById('orderSubtotal');
    const orderTaxElement = document.getElementById('orderTax');
    const orderTotalElement = document.getElementById('orderTotal');
    
    if (cart.length === 0) {
        orderItemsElement.innerHTML = '<p class="text-muted">No items in cart</p>';
        orderSubtotalElement.textContent = '$0.00';
        orderTaxElement.textContent = '$0.00';
        orderTotalElement.textContent = '$0.00';
        return;
    }
    
    let subtotal = 0;
    let html = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        html += `
            <div class="d-flex justify-content-between mb-2">
                <span>${item.name} × ${item.quantity}</span>
                <span>$${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });
    
    orderItemsElement.innerHTML = html;
    
    // Calculate totals
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    orderSubtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    orderTaxElement.textContent = `$${tax.toFixed(2)}`;
    orderTotalElement.textContent = `$${total.toFixed(2)}`;
}

function completeOrder() {
    const termsCheck = document.getElementById('termsCheck');
    
    if (!termsCheck.checked) {
        alert('Please agree to the Terms of Service before completing your order.');
        return;
    }
    
    // In a real application, you would process the payment here
    // For this demo, we'll just show a success message
    
    // Show success modal
    const paymentSuccessModal = new bootstrap.Modal(document.getElementById('paymentSuccessModal'));
    paymentSuccessModal.show();
    
    // Clear the cart
    localStorage.setItem('cart', JSON.stringify([]));
    updateCartCount();
}