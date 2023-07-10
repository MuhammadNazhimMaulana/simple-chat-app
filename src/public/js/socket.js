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
form.addEventListener("keydown", (e) => {
    // Key
    key = e.which;

    // Verify that the key entered is not a special key
    if (key == 20 /* Caps lock */
     || key == 16 /* Shift */
     || key == 9 /* Tab */
     || key == 27 /* Escape Key */
     || key == 17 /* Control Key */
     || key == 91 /* Windows Command Key */
     || key == 19 /* Pause Break */
     || key == 18 /* Alt Key */
     || key == 93 /* Right Click Point Key */
     || ( key >= 35 && key <= 40 ) /* Home, End, Arrow Keys */
     || key == 45 /* Insert Key */
     || ( key >= 33 && key <= 34 ) /*Page Down, Page Up */
     || (key >= 112 && key <= 123) /* F1 - F12 */
     || (key >= 144 && key <= 145 )) { /* Num Lock, Scroll Lock */
        return false;
    }
    else {
        socket.emit('typing')
    }
});

//Listen on typing
socket.on('typing', (data) => {
    // Check if d-none exist or not
    if(type.classList.contains("d-none"))
    {
        // Removing class
        type.classList.remove("d-none");
    }else if(input.value == '')
    {
        // Add d-none
        type.classList.add("d-none");  
    }

});

// Wait Whether user stop typing or not
form.addEventListener('keyup', (e) => {
    let timer;

    // Clear timer
    clearTimeout(timer);
    
    // Setting Time Out To remove writing
    timer = setTimeout(() => {
        // Removing class
        type.classList.add("d-none"); 
    }, 500);
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

// Upload Image
let upload = (files) => {

    socket.emit("upload", files[0], (status) => {

        // Send Message
        if (status) {
          // Send to Back end
          socket.emit('incoming chat', status.message);
      
          // Empty Input
          input.value = '';
        }
    });
}