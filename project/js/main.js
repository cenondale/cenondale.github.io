document.addEventListener('DOMContentLoaded', function() {
   
    document.body.classList.add('fade-in');
    
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            let value = this.value.replace(/\s+/g, ''); 
            if (value.length > 0) {
                value = value.match(new RegExp('.{1,4}', 'g')).join(' '); 
            }
            this.value = value;
        });
    }
    
    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, ''); 
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4); 
            }
            this.value = value;
        });
    }
});