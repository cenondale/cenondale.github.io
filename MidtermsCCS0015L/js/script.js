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
    const queueElement = document.getElementById