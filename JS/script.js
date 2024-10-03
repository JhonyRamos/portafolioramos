// script.js
// Efecto de scroll para el header
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
});

// Desplazamiento suave al hacer clic en los enlaces de anclaje
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Validación del formulario de contacto
// Inicializar EmailJS con tu usuario
emailjs.init("PA5_F3FBcAPMbEVAE"); // Reemplaza con tu usuario de EmailJS

const btn = document.getElementById("button");

// Función para sanitizar las entradas

// Validación del formulario de contacto
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener valores de los campos
    const fromName = document.getElementById("from_name").value.trim();
    const toName = document.getElementById("to_name").value.trim();
    const message = document.getElementById("message").value.trim();
    // Validación del formulario
    if (!fromName || !toName || !message) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    // Validar el formato del correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para el correo
    if (!emailPattern.test(fromName)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    // Obtener el valor del campo de nombre
    const nameInput = document.getElementById("to_name").value;

    // Validar que el nombre solo contenga letras y espacios
    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/; // Expresión regular para letras y espacios
    if (!nameRegex.test(nameInput)) {
      alert("El nombre solo debe contener letras y espacios.");
      return; // Detiene el envío si la validación falla
    }

    btn.value = "Enviando...";
    btn.disabled = true; // Deshabilitar el botón

    const serviceID = "default_service"; // Reemplaza el ID de servicio
    const templateID = "template_alzx91j"; // Reemplaza con tu ID de plantilla

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.value = "Enviar";
        btn.disabled = false; // Habilitar el botón
        alert("¡Mensaje enviado con éxito!");
        document.getElementById("contact-form").reset(); // Reinicia el formulario
      },
      (err) => {
        btn.value = "Enviar";
        alert("Error al enviar: " + JSON.stringify(err));
      }
    );
  });
