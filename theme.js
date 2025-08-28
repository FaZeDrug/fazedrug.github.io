document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // checing if a theme is saved into the  localStorage
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeToggle.textContent = "🌙"; // Change icon to moon
    } else {
        themeToggle.textContent = "🌞"; // Change icon to sun
    }

    // toggle theme
    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "🌙";
        } else {
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌞";
        }
    });
});
