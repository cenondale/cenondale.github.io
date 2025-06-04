let queue = [];
const colors = ['bg-primary', 'bg-secondary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info'];

function checkQueueEmpty() {
    const isEmpty = queue.length === 0;
    showMessage(isEmpty ? "The queue is empty." : `There are ${queue.length} people in queue.`, isEmpty ? 'info' : 'warning');
}

function showAddPersonForm() {
    document.getElementById('addPersonForm').style.display = 'block';
    document.getElementById('message').style.display = 'none';
}

function hideAddPersonForm() {
    document.getElementById('addPersonForm').style.display = 'none';
}

function addToQueue() {
    const name = document.getElementById('personName').value.trim();
    const model = document.getElementById('phoneModel').value;
    
    if (!name) {
        showMessage("Please enter a name.", 'danger');
        return;
    }
    
    const newPerson = {
        name: name,
        model: model,
        color: colors[queue.length % colors.length],
        position: queue.length + 1
    };
    
    queue.push(newPerson);
    
    document.getElementById('personName').value = '';
    document.getElementById('phoneModel').value = 'iPhone 15 Pro';
    hideAddPersonForm();
    showMessage(`${name} joined the queue for ${model}!`, 'success');
    viewQueue(true);
}

function serveNextCustomer() {
    if (queue.length === 0) {
        showMessage("The queue is already empty.", 'danger');
        return;
    }
    
    // Show serving animation
    const currentCustomer = document.getElementById('currentCustomer');
    const nextPerson = queue[0];
    
    currentCustomer.innerHTML = `
        <div class="person-in-line customer-serving">
            <div class="person-avatar ${nextPerson.color}">
                <i class="bi bi-person"></i>
            </div>
            <div class="person-details">
                <div class="fw-bold">${nextPerson.name}</div>
                <div class="person-model">${nextPerson.model}</div>
            </div>
            <div class="person-position">Now Serving</div>
        </div>
    `;
    
    // Remove from queue with animation
    const queueElement = document.getElementById('queueLine');
    if (queueElement.firstChild && queueElement.firstChild.classList) {
        queueElement.firstChild.classList.add('leave-animation');
    }
    
    setTimeout(() => {
        const servedPerson = queue.shift();
        updatePositions();
        showMessage(`Served ${servedPerson.name} with ${servedPerson.model}!`, 'success');
        viewQueue();
        
        // Reset current customer display if queue is empty
        if (queue.length === 0) {
            currentCustomer.innerHTML = `
                <div class="text-center py-4">
                    <i class="bi bi-person-x" style="font-size: 1.5rem;"></i>
                    <p>No customer being served</p>
                </div>
            `;
        }
    }, 500);
}

function viewQueue(withAnimation = false) {
    const queueElement = document.getElementById('queueLine');
    
    if (queue.length === 0) {
        queueElement.innerHTML = `
            <div class="empty-queue text-center py-5">
                <i class="bi bi-people" style="font-size: 2rem;"></i>
                <p class="text-muted mt-2">Queue is empty</p>
            </div>
        `;
        return;
    }
    
    queueElement.innerHTML = '';
    
    queue.forEach((person, index) => {
        const personElement = document.createElement('div');
        personElement.className = 'person-in-line';
        if (withAnimation && index === queue.length - 1) {
            personElement.classList.add('join-animation');
        }
        
        personElement.innerHTML = `
            <div class="person-avatar ${person.color}">
                <i class="bi bi-person"></i>
            </div>
            <div class="person-details">
                <div class="fw-bold">${person.name}</div>
                <div class="person-model">${person.model}</div>
            </div>
            <div class="person-position">#${index + 1} in line</div>
        `;
        
        queueElement.appendChild(personElement);
    });
}

function updatePositions() {
    queue.forEach((person, index) => {
        person.position = index + 1;
    });
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = `<i class="bi ${getIcon(type)}"></i> ${text}`;
    messageDiv.className = `alert alert-${type} d-flex align-items-center`;
    messageDiv.style.display = 'flex';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

function getIcon(type) {
    switch(type) {
        case 'success': return 'bi-check-circle-fill';
        case 'danger': return 'bi-exclamation-triangle-fill';
        case 'warning': return 'bi-exclamation-circle-fill';
        default: return 'bi-info-circle-fill';
    }
}

// Initialize view
viewQueue();