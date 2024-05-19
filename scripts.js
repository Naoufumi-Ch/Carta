document.addEventListener('DOMContentLoaded', () => {
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentItem = 0;

    function showNextItem() {
        carouselItems[currentItem].style.transform = 'translateX(-100%)';
        currentItem = (currentItem + 1) % carouselItems.length;
        carouselItems[currentItem].style.transform = 'translateX(0)';
    }

    setInterval(showNextItem, 3000);

    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Formulario enviado exitosamente!');
        form.reset();
    });
});
