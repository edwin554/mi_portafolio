// Scroll suave para anclas internas
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
// scripts.js
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del enlace (ir a la sección de forma inmediata)
    
    // Desplazarse a la sección con un desplazamiento suave
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth', // La animación de desplazamiento
      block: 'start' // Alinea la sección al inicio de la ventana
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll("#projectsCarousel .card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      // Alternar clase para permitir activar/desactivar
      if (card.classList.contains("card-enlarged")) {
        card.classList.remove("card-enlarged");
      } else {
        cards.forEach(c => c.classList.remove("card-enlarged"));
        card.classList.toggle("card-enlarged");

      }
    });
  });
});
