class PokemonCart {
    constructor() {
        this.items = [];
        this.loadCart();
    }
    
    loadCart() {
        const savedCart = localStorage.getItem('pokemonCart');
        this.items = savedCart ? JSON.parse(savedCart) : [];
    }
    
    saveCart() {
        localStorage.setItem('pokemonCart', JSON.stringify(this.items));
    }
    
    getCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }
    
    calculateTotals() {
        const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1; // 10% tax
        const total = subtotal + tax;
        
        return { subtotal, tax, total };
    }
    
}

const pokemonCart = new PokemonCart();

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cartCount');
    const count = pokemonCart.getCount();
    
    cartCountElements.forEach(el => {
        el.textContent = count;
    });
}

document.addEventListener('DOMContentLoaded', updateCartCount);