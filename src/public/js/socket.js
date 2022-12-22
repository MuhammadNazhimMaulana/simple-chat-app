let socket = io();

let messages = document.getElementById('messages');
let type = document.getElementById('type');
let form = document.getElementById('form');
let input = document.getElementById('input');

// When form is sent
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    // Send to Back end
    socket.emit('incoming chat', input.value);

    // Empty Input
    input.value = '';
  }
});

// When message is sent
socket.on('incoming chat', (msg) => {
    let item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);

    // Add Type Class list
    type.classList.add("d-none");
});

//Emit typing
form.addEventListener("keypress", () => {
    socket.emit('typing')
});

//Listen on typing
socket.on('typing', (data) => {
    // Check if d-none exist or not
    if(type.classList.contains("d-none"))
    {
        // Removing class
        type.classList.remove("d-none");
    }

    console.log(data);
});

// When Someoine disconnect
socket.on('offline', (msg) => {
    let item = document.createElement('li');

    // Center Item
    item.style.textAlign = 'center';

    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});