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
// Animación de las barras al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  const animateSkills = () => {
    skillItems.forEach(item => {
      const progressBar = item.querySelector('.progress-bar');
      const percent = progressBar.getAttribute('aria-valuenow');
      progressBar.style.width = '0';
      
      setTimeout(() => {
        progressBar.style.width = percent + '%';
      }, 100);
    });
  };
  
  // Ejecutar cuando la sección sea visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(document.getElementById('skills'));
});
document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.cert-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
});
// Validación y envío del formulario
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const submitBtn = form.querySelector('button[type="submit"]');
  const submitText = document.getElementById('submitText');
  const spinner = document.getElementById('spinner');
  const formAlert = document.getElementById('formAlert');
  
  // Validación Bootstrap
  form.addEventListener('submit', function(event) {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      
      // Mostrar spinner
      submitText.textContent = 'Enviando...';
      spinner.classList.remove('d-none');
      submitBtn.disabled = true;
      
      // Enviar formulario
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Mostrar mensaje de éxito
          formAlert.classList.remove('d-none');
          form.reset();
          form.classList.remove('was-validated');
          
          // Ocultar formulario después de éxito (opcional)
          setTimeout(() => {
            form.style.display = 'none';
          }, 3000);
        } else {
          throw new Error('Error en el envío');
        }
      })
      .catch(error => {
        alert('Hubo un error al enviar el mensaje. Por favor inténtalo de nuevo más tarde.');
        console.error('Error:', error);
      })
      .finally(() => {
        // Restaurar botón
        submitText.textContent = 'Enviar mensaje';
        spinner.classList.add('d-none');
        submitBtn.disabled = false;
      });
    }
    
    form.classList.add('was-validated');
  });
});
