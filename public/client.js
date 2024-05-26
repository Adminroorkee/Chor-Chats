const socket = io();
let name;
let textarea = document.querySelector(".message-input form textarea");
let chatContainer = document.querySelector(".chat-container");
let sendbtn = document.querySelector(".message-input form button");
do {
    name = prompt("Enter your name:")
} while (!name);

textarea.addEventListener("keyup",(e)=>{
   if(e.key==="Enter"){
    sendMessage(e.target.value);
   }
});

sendbtn.addEventListener("click",(e)=>{
   e.preventDefault();
   sendMessage(textarea.value);
  
 });

 
function sendMessage(message){
   textarea.value="";

    let msg={
        user:name,
        message:message.trim()
    }

    appendMessage(msg,'right-chat');
    socket.emit("message",msg)
}

function appendMessage(msg,type){
    let mainDiv = document.createElement("div");
    let className = type
    mainDiv.classList.add(className,"chat-box");
    
    let markup = ` ${msg.user} <br>
    <div class="message">${msg.message}</div> `

    mainDiv.innerHTML = markup
    chatContainer.appendChild(mainDiv);
    scrollbottom();

}

// receive msgg 


socket.on("message",(msg)=>{
    appendMessage(msg,"left-chat");
})


function scrollbottom(){
    chatContainer.scrollTop = chatContainer.scrollHeight;
}