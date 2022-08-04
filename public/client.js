const socket = io()
let name;
let textarea = document.querySelector('#textArea')
let messageArea = document.querySelector('.message__area')

//prompt will come untill name is not written
do {
    name = prompt('Please enter your name: ')
} while(!name)

//if enter key is pressed then send message
textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'right')
    textArea.value='';
    scrollToBottom();

    // emit and then we can listen it to the server side
    socket.emit('message', msg);

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')
    
    let markup = `
        <h5>${msg.user}: </h5>
        <h3>${msg.message}</h3>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

//to recieve the message
socket.on('message',(msg)=>{
    appendMessage(msg,'left')
    scrollToBottom();
})

//to get scroll down after the each message
function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight;
}