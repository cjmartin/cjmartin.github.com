document.addEventListener('DOMContentLoaded', function() {
  // Mobile nav toggle
  const navToggle = document.getElementById('mobile-nav-toggle');
  const mainNav = document.getElementById('main-nav');

  navToggle.addEventListener('click', function() {
    mainNav.classList.toggle('mobile-active');
    navToggle.classList.toggle('active');
  });

  // Dark/Light mode toggle
  const toggleButton = document.getElementById("theme-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Load theme from localStorage
  const currentTheme = localStorage.getItem("theme");

  function updateIcon() {
    if (document.body.classList.contains("dark-mode")) {
      toggleButton.textContent = "🌞"; // Sun for dark mode
    } else {
      toggleButton.textContent = "🌛"; // Moon for light mode
    }
  }

  if (currentTheme === "dark" || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.classList.add("dark-mode");
  }

  updateIcon(); // Set initial icon

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }

    updateIcon(); // Update icon after toggle
  });
});