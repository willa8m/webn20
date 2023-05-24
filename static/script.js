const socket = io({
    auth: {
        cookie: document.cookie
    }
});
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    if (input.value) {
        socket.emit("new_message", input.value);
        input.value = "";
    }
})

socket.on("all_messages", function(messageArr) {
    messageArr.forEach(msg => {
        let item = document.createElement("li");
        item.textContent = msg.login + ": " + msg.content;
        messages.appendChild(item);
    });
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on("message", function(message) {
    let item = document.createElement("li");
    item.textContent = message;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})

document.getElementById("logout").addEventListener("click", function() {
    document.cookie = `token=; max-age=0`;
    location.reload()
})
