"use strict";
document.addEventListener('DOMContentLoaded', async () => {
    const main = document.querySelector('main');
    if (!main) {
        throw new Error("No main element!");
    }
    const send_btn = main.querySelector('#send-btn');
    const send = async () => {
        const msg = main.querySelector('#msg');
        const image_inp = main.querySelector('#image');
        const wait_msg = main.querySelector('#wait-msg');
        const response_result = main.querySelector('#response-result');
        const check_invalid_elements = async () => {
            if (!msg || !send_btn || !wait_msg || !response_result) {
                throw new Error("Required elements missing!");
            }
        };
        await check_invalid_elements();
        const trimmed_msg_val = msg.value.trim();
        const alert_msg = "Error! Try again later!";
        const fd = new FormData();
        fd.append('msg', trimmed_msg_val);
        if (image_inp.files.length > 0) {
            fd.append('image', image_inp.files[0]);
        }
        wait_msg.textContent = "Responding... (this might take a few minutes)";
        send_btn.disabled = true;
        try {
            const response = await fetch('https://chatbot.placewith5s.com/chat', {
                method: 'POST',
                body: fd
            });
            if (!response.ok) {
                alert(alert_msg);
                throw new Error("Invalid response received!");
            }
            const body_text = await response.text();
            if (!body_text) {
                alert(alert_msg);
                throw new Error("No body text!");
            }
            const raw_html = marked.parse(body_text, { breaks: true });
            const safe_html = DOMPurify.sanitize(raw_html);
            const result = document.createElement('div');
            result.classList.add('chat-response');
            result.innerHTML = safe_html;
            response_result.appendChild(result);
        }
        catch (err) {
            alert(alert_msg);
            throw new Error(`Chatbot can't respond! ${err}`);
        }
        finally {
            wait_msg.textContent = "";
            send_btn.disabled = false;
        }
    };
    send_btn?.addEventListener('click', async () => {
        await send();
    });
});
