document.addEventListener("DOMContentLoaded", () => {
    const intersection_observer: IntersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry): void => {
            try {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
                else {
                    entry.target.classList.remove("show");
                }
            }
            catch (err) {
                throw new Error(`IntersectionObserver entry: ${err}`);
            }
        });
    });

    const hides: NodeListOf<HTMLElement> = document.querySelectorAll(".hide");

    const check_hides = (): void | never => {
        if (!hides.length) {
            throw new Error("No hide element!");
        }
    }

    check_hides();

    hides.forEach((element: HTMLElement) => intersection_observer.observe(element));
});
