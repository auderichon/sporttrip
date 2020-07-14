const socket = io('http://localhost:3000');

const messageContainer = document.getElementById('message-container');
const messaageFrom = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')



socket.on('chat-message',data =>{
    appendMessage(`${data.name} : ${data.message}`);
    console.log(data);
})  
socket.on('user-connected',name =>{
    appendMessage(`${name} just connected`)
})
socket.on('user disconnected', name =>{
    appendMessage(`${name} disconneted`)
})
messaageFrom.addEventListener('submit', e =>{
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = '';
})
function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.className ="colorsMgs";
    messageElement.innerText = message
    messageContainer.append(messageElement)
}