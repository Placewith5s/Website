document.addEventListener("DOMContentLoaded", () => {
    class Carousel {
        #main: HTMLElement | null;
        #items: NodeListOf<HTMLDivElement>;
        #inner: HTMLElement | null;
        #current_index: number | undefined;
        
        constructor() {
            this.#main = document.querySelector('main');

            if (!this.#main) {
                throw new Error("No main element!");
            }

            this.#items = this.#main.querySelectorAll(".carousel-item");
            this.#inner = this.#main.querySelector(".carousel-inner");

            if (this.#items.length === 0) {
                throw new Error("No item!");
            }

            this.#current_index = 0;
            this.#show_next_item();
            setInterval(() => this.#show_next_item(), 5000);
        }


        #show_next_item(): void {
            if (!this.#inner) {
                throw new Error("No inner element!");
            }

            const total_items: number = this.#items?.length;

            if (typeof this.#current_index === "number") {
                this.#items[this.#current_index]?.classList.remove("active");
                this.#current_index = (this.#current_index + 1) % total_items;
                this.#items[this.#current_index]?.classList.add("active");
                this.#inner.style.transform = `translateX(-${100 * this.#current_index}%)`;
            }
        }
    }

    const result = async(opt_title: string, tro_title: string, opt_desc: string, tro_desc: string): Promise<void> => {
        document.querySelectorAll("main .carousel-item").forEach(item => {
            Array.from(item.children).forEach(child => {
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
            });
        });
    }

    const check_meta_tags = (optimize_title: string | null | undefined, troubleshoot_title: string | null | undefined, optimize_desc: string | null | undefined, troubleshoot_desc: string | null | undefined) => {
        if (!optimize_title || !troubleshoot_title || !optimize_desc || !troubleshoot_desc) {
            throw new Error("No meta title or meta description!");
        }
    };

    const upd_carousel_title_desc = async(): Promise<void> => {
        try {
            const optimize_url: string = "/html/guides/optimize-windows-pc.html";
            const troubleshoot_url: string = "/html/guides/troubleshoot-windows-pc.html";

            const optimize_res: Response = await fetch(optimize_url);
            const troubleshoot_res: Response = await fetch(troubleshoot_url);

            const optimize_res_text: string = await optimize_res.text();
            const troubleshoot_res_text: string = await troubleshoot_res.text();

            const parser: DOMParser = new DOMParser();
            const optimize_doc: Document = parser.parseFromString(optimize_res_text, "text/html");
            const troubleshoot_doc: Document = parser.parseFromString(troubleshoot_res_text, "text/html");

            const optimize_title: string | null | undefined = optimize_doc?.querySelector('meta[name="title"]')?.getAttribute('content');
            const troubleshoot_title: string | null | undefined = troubleshoot_doc?.querySelector('meta[name="title"]')?.getAttribute('content');
            const optimize_desc: string | null | undefined = optimize_doc?.querySelector('meta[name="description"]')?.getAttribute('content');
            const troubleshoot_desc: string | null | undefined = troubleshoot_doc?.querySelector('meta[name="description"]')?.getAttribute('content');
            
            check_meta_tags(optimize_title, troubleshoot_title, optimize_desc, troubleshoot_desc);

            await result(optimize_title, troubleshoot_title, optimize_desc, troubleshoot_desc);
        }
        catch (err) {
            throw new Error(`During carousel update: ${err}`);
        }
    }

    upd_carousel_title_desc();

    new Carousel();
});
