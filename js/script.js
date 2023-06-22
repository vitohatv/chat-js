const host = 'http://146.185.154.90:8000/messages';

let lastDatetime;

const getDatetime = () => { 
    if(lastDatetime) {
        return "?datetime=" + lastDatetime;
    }
    return "";
}

setInterval(() => {
    fetch(host + getDatetime()).then(response => {
        return response.json();
    })
    .then(messages => {
        const listMessages = document.querySelector(".message-block");
        messages.forEach(message => {
            let optionsDate = {year: 'numeric', weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
            const date = new Date(message.datetime).toLocaleString("ru", optionsDate);
            const newMessage = document.createElement("div");
            newMessage.classList.add("new_message");
            newMessage.innerHTML = ` 
                <div class="mess">
                    <div class="mes-info">
                        <p class="mes-data">${message.author} <span><img class="icon_user" src="img/icons8-user.png" alt="icon_user"></span> | <span class="date_mess">${message.datetime.split("T")[0],[date]}</span></p>
                        <p class="mes-text">${message.message}</p>
                    </div>
                </div>
            `
            listMessages.appendChild(newMessage);
            listMessages.prepend(newMessage);
        });
        if(messages.length) {
            const lastMessage = messages[messages.length - 1];
            lastDatetime = lastMessage.datetime;
        }
    });
}, 2300);

const createMessage = async () => {
    const btnSend = document.getElementById("btn_send");
    btnSend.addEventListener("click", async () => {
        const inputName = document.getElementById("name_send").value;
        const inputMessage = document.getElementById("message_send").value;
        
        const searchParams = new URLSearchParams();
        searchParams.set('message', inputMessage);
        searchParams.set('author', inputName);

        const chat = await fetch(host, {
            method: 'POST',
            body: searchParams
        });

        const result = chat.json();
        console.log(result);
    });
};
createMessage();