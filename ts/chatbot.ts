const main: HTMLElement | null = document.querySelector('main');

if (!main) {
    throw new Error("No main element!");
}

const send_btn: HTMLButtonElement | null = main.querySelector('#send-btn');

document.addEventListener('DOMContentLoaded', async() => {
    const send = async (): Promise<void> => {
        const msg: HTMLInputElement | null = main.querySelector('#msg');
        // const image_inp: HTMLInputElement | null = main.querySelector('#image');
        const wait_msg: HTMLParagraphElement | null = main.querySelector('#wait-msg');
        const response_result: HTMLDivElement | null = main.querySelector('#response-result');

        const check_invalid_elements = async(): Promise<void | never> => {
            if (!msg || !send_btn || !wait_msg || !response_result) {
                throw new Error("Required elements missing!");
            }
        }

        await check_invalid_elements();

        const trimmed_msg_val: string = msg.value.trim();
        const alert_msg: string = "Error! Try again later!"

        const fd: FormData = new FormData();
        fd.append('msg', trimmed_msg_val);

        // if (image_inp.files.length > 0) {
        //     fd.append('image', image_inp.files[0]);
        // }

        wait_msg.textContent = "Responding... (this might take a few minutes)";
        send_btn.disabled = 'true';

        try {
            const response: Response = await fetch('https://chatbot.placewith5s.com/chat', {
                method: 'POST',
                body: fd
            });

            if (!response.ok) {
                alert(alert_msg)
                throw new Error("Invalid response received!");
            }

            const body_text: string = await response.text();

            if (!body_text) {
                alert(alert_msg)
                throw new Error("No body text!");
            }

            const result: HTMLParagraphElement = document.createElement('p');
            result.textContent = body_text;
            response_result.appendChild(result);
        } catch (err) {
            alert(alert_msg)
            throw new Error(`Chatbot can't respond! ${err}`);
        } finally {
            wait_msg.textContent = "";
            send_btn.disabled = 'false';
        }
    };

    send_btn?.addEventListener('click', async() => {
        await send();
    });
});