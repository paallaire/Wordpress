export default function () {

    // Callback for IntersectionObserver
    const callback = function (entries) {
        entries.forEach(entry => {

            // Is the element in the viewport?
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-fadeIn");
            } else {
                //entry.target.classList.remove("animate-fadeIn");
            }
        });
    };

    // Get all the elements you want to show on scroll
    const targets = document.querySelectorAll(".js-show-on-scroll");

    // Set up a new observer
    const observer = new IntersectionObserver(callback);

    // Loop through each of the target
    targets.forEach(function (target) {
        target.classList.add("opacity-0");
        // Add the element to the watcher
        observer.observe(target);
    });

}
