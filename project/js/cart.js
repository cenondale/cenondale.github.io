document.addEventListener('DOMContentLoaded', function() {

    updateCartCount();

    calculateStaticTotals();
});

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cartCount');
    cartCountElements.forEach(element => {
        element.textContent = '5'; 
    });
    
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.disabled = false;
    }
}

function calculateStaticTotals() {
    const subtotal = 6.95; 
    const tax = subtotal * 0.1; 
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}