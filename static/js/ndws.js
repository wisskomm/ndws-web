// Scroll Listener
if (document.body.classList.contains("hero")) {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 10)
            document.body.classList.add("scroll");
        else
            document.body.classList.remove("scroll");
    });
}
document.querySelector('[data-action="toggle-sidebar"]').addEventListener("click", function () {
    document.body.classList.toggle("sidebar");
});
