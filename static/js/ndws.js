// Scroll Listener
window.addEventListener("scroll", function () {
    if (window.scrollY > 10)
        document.body.classList.add("scroll");
    else
        document.body.classList.remove("scroll");
});
