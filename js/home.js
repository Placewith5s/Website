"use strict";
document.addEventListener("DOMContentLoaded", () => {
    class Carousel {
        #main;
        #items;
        #inner;
        #current_index;
        constructor() {
            this.#main = document.querySelector('main');
            if (!this.#main) {
                throw new Error("No main element!");
            }
            this.#items = this.#main.querySelectorAll(".carousel-item");
            this.#inner = this.#main.querySelector(".carousel-inner");
            if (this.#items.length === 0) {
                throw new Error("No carousel items!");
            }
            this.#current_index = 0;
            this.#show_next_item();
            setInterval(() => this.#show_next_item(), 5000);
        }
        #check_inner() {
            if (!this.#inner) {
                throw new Error("No carousel inner element!");
            }
        }
        #show_next_item() {
            this.#check_inner();
            const total_items = this.#items?.length;
            if (typeof this.#current_index === "number") {
                this.#items[this.#current_index]?.classList.remove("active");
                this.#current_index = (this.#current_index + 1) % total_items;
                this.#items[this.#current_index]?.classList.add("active");
                this.#inner.style.transform = `translateX(-${100 * this.#current_index}%)`;
            }
        }
    }
    const upd_correct_text = (child, opt_title, tro_title, opt_desc, tro_desc) => {
        switch (child.id) {
            case "optimize-windows-pc-carousel-title":
                child.textContent = opt_title || "Loading...";
                break;
            case "troubleshoot-windows-pc-carousel-title":
                child.textContent = tro_title || "Loading...";
                break;
            case "optimize-windows-pc-carousel-desc":
                child.textContent = opt_desc || "Loading...";
                break;
            case "troubleshoot-windows-pc-carousel-desc":
                child.textContent = tro_desc || "Loading...";
                break;
            default:
                console.warn("No id match for carousel!");
                break;
        }
    };
    const result = async (opt_title, tro_title, opt_desc, tro_desc) => {
        document.querySelectorAll("main .carousel-item").forEach(item => {
            Array.from(item.children).forEach(child => {
                if (!child.id)
                    return;
                upd_correct_text(child, opt_title, tro_title, opt_desc, tro_desc);
            });
        });
    };
    const check_meta_tags = (optimize_title, troubleshoot_title, optimize_desc, troubleshoot_desc) => {
        if (!optimize_title || !troubleshoot_title || !optimize_desc || !troubleshoot_desc) {
            throw new Error("No meta title or meta description!");
        }
    };
    const upd_carousel_title_desc = async () => {
        try {
            const optimize_url = "/html/guides/optimize-windows-pc.html";
            const troubleshoot_url = "/html/guides/troubleshoot-windows-pc.html";
            const optimize_res = await fetch(optimize_url);
            const troubleshoot_res = await fetch(troubleshoot_url);
            const optimize_res_text = await optimize_res.text();
            const troubleshoot_res_text = await troubleshoot_res.text();
            const parser = new DOMParser();
            const optimize_doc = parser.parseFromString(optimize_res_text, "text/html");
            const troubleshoot_doc = parser.parseFromString(troubleshoot_res_text, "text/html");
            const optimize_title = optimize_doc?.querySelector('meta[name="title"]')?.getAttribute('content');
            const troubleshoot_title = troubleshoot_doc?.querySelector('meta[name="title"]')?.getAttribute('content');
            const optimize_desc = optimize_doc?.querySelector('meta[name="description"]')?.getAttribute('content');
            const troubleshoot_desc = troubleshoot_doc?.querySelector('meta[name="description"]')?.getAttribute('content');
            check_meta_tags(optimize_title, troubleshoot_title, optimize_desc, troubleshoot_desc);
            await result(optimize_title, troubleshoot_title, optimize_desc, troubleshoot_desc);
        }
        catch (err) {
            throw new Error(`During carousel update: ${err}`);
        }
    };
    upd_carousel_title_desc();
    new Carousel();
});
