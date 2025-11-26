"use strict";
document.addEventListener("DOMContentLoaded", () => {
    class Carousel {
        #main;
        #items;
        #inner;
        #current_index;
        constructor() {
            this.#main = document.querySelector('main');
            this.#items = this.#main?.querySelectorAll(".carousel-item");
            this.#inner = this.#main?.querySelector(".carousel-inner");
            if (!this.#inner) {
                console.error("No inner found!");
                return;
            }
            if (this.#items?.length) {
                this.#current_index = 0;
                this.#show_next_item();
                setInterval(() => this.#show_next_item(), 5000);
            }
            // handle invalid carousel elements
            else {
                console.error("Missing required Carousel elements!");
            }
        }
        // function to show and handle the next carousel item
        #show_next_item() {
            const total_items = this.#items?.length;
            this.#items[this.#current_index]?.classList.remove("active");
            this.#current_index = (this.#current_index + 1) % total_items;
            this.#items[this.#current_index]?.classList.add("active");
            this.#inner.style.transform = `translateX(-${100 * this.#current_index}%)`;
        }
    }
    // async function for handling and updating both the title and description
    async function upd_carousel_title_desc() {
        try {
            const optimize_url = "/html/guides/optimize-windows-pc.html";
            const troubleshoot_url = "/html/guides/troubleshoot-windows-pc.html";
            const res_optimize_url = await fetch(optimize_url);
            const res_troubleshoot_url = await fetch(troubleshoot_url);
            const optimize_url_html_text = await res_optimize_url.text();
            const troubleshoot_url_html_text = await res_troubleshoot_url.text();
            const parser = new DOMParser();
            const doc_optimize_url = parser.parseFromString(optimize_url_html_text, "text/html");
            const doc_troubleshoot_url = parser.parseFromString(troubleshoot_url_html_text, "text/html");
            const optimize_title = doc_optimize_url?.querySelector('meta[name="title"]')?.getAttribute('content');
            const troubleshoot_title = doc_troubleshoot_url?.querySelector('meta[name="title"]')?.getAttribute('content');
            const optimize_description = doc_optimize_url?.querySelector('meta[name="description"]')?.getAttribute('content');
            const troubleshoot_description = doc_troubleshoot_url?.querySelector('meta[name="description"]')?.getAttribute('content');
            // handle invalid URLs
            if (!optimize_title || !troubleshoot_title || !optimize_description || !troubleshoot_description) {
                console.warn("No title or description found!");
            }
            document.querySelector('main')?.querySelectorAll(".carousel-item").forEach(item => {
                Array.from(item.children).forEach(child => {
                    switch (child.id) {
                        case "optimize-windows-pc-carousel-title":
                            child.textContent = optimize_title || "Loading...";
                            break;
                        case "troubleshoot-windows-pc-carousel-title":
                            child.textContent = troubleshoot_title || "Loading...";
                            break;
                        case "optimize-windows-pc-carousel-description":
                            child.textContent = optimize_description || "Loading...";
                            break;
                        case "troubleshoot-windows-pc-carousel-description":
                            child.textContent = troubleshoot_description || "Loading...";
                            break;
                        default:
                            break;
                    }
                });
            });
        }
        catch (err) {
            console.error("Error during carousel update:", err);
        }
    }
    upd_carousel_title_desc();
    // call the carousel constructor
    new Carousel();
});
