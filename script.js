document.addEventListener("DOMContentLoaded", function () {
    // --- Анимация fade-in-left при появлении в зоне видимости ---
    const elements = document.querySelectorAll('.fade-in-left');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));

    // --- Плавная прокрутка по якорям ---
    const scrollLinks = document.querySelectorAll('.scroll-to');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Адаптивное меню (гамбургер) ---
    const topHeaderContent = document.querySelector('.top-header-content');
    const mainNav = document.querySelector('.main-nav');

    if (topHeaderContent && mainNav) {
        const menuToggle = document.createElement('div');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        // Вставка кнопки перед меню
        topHeaderContent.insertBefore(menuToggle, mainNav);

        // Открытие/закрытие меню по клику
        menuToggle.addEventListener('click', function () {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Закрытие при клике вне меню
        document.addEventListener('click', function (event) {
            if (!menuToggle.contains(event.target) && !mainNav.contains(event.target) && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });

        // Закрытие при клике на пункт меню
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
});
