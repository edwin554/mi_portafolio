// Scroll suave para anclas internas
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
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
      // Si ya está activa, desactívala; si no, activa solo esta
      if (card.classList.contains('active')) {
        card.classList.remove('active');
      } else {
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      }
    });
  });
});
// Validaciones en tiempo real y envío del formulario
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const submitBtn = form.querySelector('button[type="submit"]');
  const submitText = document.getElementById('submitText');
  const spinner = document.getElementById('spinner');
  const formAlert = document.getElementById('formAlert');
  
  // Elementos del formulario
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  
  // Expresión regular para validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Función para crear elemento de feedback
  function createFeedbackElement(input) {
    const feedback = document.createElement('div');
    feedback.className = 'feedback-message';
    input.parentNode.appendChild(feedback);
    return feedback;
  }
  
  // Función para validar campo en tiempo real
  function validateField(input, feedback, options = {}) {
    const value = input.value.trim();
    let isValid = true;
    let message = '';
    
    // Validar si es obligatorio
    if (options.required && !value) {
      isValid = false;
      message = options.requiredMessage || 'Este campo es obligatorio';
    }
    // Validar formato de email
    else if (options.isEmail && value && !emailRegex.test(value)) {
      isValid = false;
      message = 'Ingresa un correo electrónico válido';
    }
    // Validar longitud mínima
    else if (options.minLength && value && value.length < options.minLength) {
      isValid = false;
      message = `Mínimo ${options.minLength} caracteres`;
    }
    // Validar longitud máxima
    else if (options.maxLength && value && value.length > options.maxLength) {
      isValid = false;
      message = `Máximo ${options.maxLength} caracteres`;
    }
    
    // Aplicar estilos
    if (value) {
      if (isValid) {
        input.classList.remove('is-invalid-custom');
        input.classList.add('is-valid-custom');
        feedback.className = 'feedback-message show success';
        message = '✓';
      } else {
        input.classList.remove('is-valid-custom');
        input.classList.add('is-invalid-custom');
        feedback.className = 'feedback-message show error';
      }
    } else {
      input.classList.remove('is-valid-custom', 'is-invalid-custom');
      feedback.className = 'feedback-message';
    }
    
    feedback.textContent = message;
    return isValid;
  }
  
  // Crear elementos de feedback
  const nameFeedback = createFeedbackElement(nameInput);
  const emailFeedback = createFeedbackElement(emailInput);
  const messageFeedback = createFeedbackElement(messageInput);
  
  // Contador de caracteres para el mensaje
  const charCounter = document.createElement('div');
  charCounter.className = 'char-counter';
  messageInput.parentNode.appendChild(charCounter);
  
  // Validar nombre en tiempo real
  nameInput.addEventListener('input', function() {
    validateField(nameInput, nameFeedback, {
      required: true,
      requiredMessage: 'El nombre es obligatorio',
      minLength: 2
    });
  });
  
  // Validar email en tiempo real
  emailInput.addEventListener('input', function() {
    validateField(emailInput, emailFeedback, {
      required: true,
      requiredMessage: 'El correo es obligatorio',
      isEmail: true
    });
  });
  
  // Validar mensaje en tiempo real y actualizar contador
  messageInput.addEventListener('input', function() {
    validateField(messageInput, messageFeedback, {
      required: true,
      requiredMessage: 'El mensaje es obligatorio',
      minLength: 10,
      maxLength: 1000
    });
    
    // Actualizar contador de caracteres
    const length = messageInput.value.length;
    charCounter.textContent = `${length}/1000 caracteres`;
    
    if (length > 900) {
      charCounter.className = 'char-counter danger';
    } else if (length > 700) {
      charCounter.className = 'char-counter warning';
    } else {
      charCounter.className = 'char-counter';
    }
  });
  
  // Validar todos los campos al enviar
  function validateAllFields() {
    const isNameValid = validateField(nameInput, nameFeedback, {
      required: true,
      requiredMessage: 'El nombre es obligatorio',
      minLength: 2
    });
    
    const isEmailValid = validateField(emailInput, emailFeedback, {
      required: true,
      requiredMessage: 'El correo es obligatorio',
      isEmail: true
    });
    
    const isMessageValid = validateField(messageInput, messageFeedback, {
      required: true,
      requiredMessage: 'El mensaje es obligatorio',
      minLength: 10,
      maxLength: 1000
    });
    
    return isNameValid && isEmailValid && isMessageValid;
  }
  
  // Envío del formulario
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validar todos los campos
    if (!validateAllFields()) {
      // Enfocar el primer campo inválido
      const firstInvalid = form.querySelector('.is-invalid-custom');
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }
    
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
        
        // Limpiar estilos de validación
        nameInput.classList.remove('is-valid-custom', 'is-invalid-custom');
        emailInput.classList.remove('is-valid-custom', 'is-invalid-custom');
        messageInput.classList.remove('is-valid-custom', 'is-invalid-custom');
        nameFeedback.className = 'feedback-message';
        emailFeedback.className = 'feedback-message';
        messageFeedback.className = 'feedback-message';
        charCounter.textContent = '0/1000 caracteres';
        charCounter.className = 'char-counter';
        
        // Ocultar formulario después de éxito
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
  });
});

// Animación de contadores
document.addEventListener('DOMContentLoaded', function() {
  const counters = document.querySelectorAll('.counter-number');
  let animated = false;

  function animateCounters() {
    if (animated) return;
    
    const section = document.getElementById('featured-projects');
    if (!section) return;
    
    const rect = section.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
      animated = true;
      
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current).toLocaleString('es-CL');
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString('es-CL');
            if (target === 4) counter.textContent = '+4';
            else if (target === 1500) counter.textContent = '+1.500';
            else if (target === 20) counter.textContent = '+20';
            else if (target === 30) counter.textContent = '30%';
          }
        };
        
        updateCounter();
      });
    }
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters();
});
