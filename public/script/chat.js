const socket = io('http://localhost:3010');
const messageContainer = document.getElementById('message-container');
const messaageFrom = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name =prompt('what is your name');
appendMessage('you koined');
socket.emit('new-user',name)

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
    messageElement.innerText = message
    messageContainer.append(messageElement)
}