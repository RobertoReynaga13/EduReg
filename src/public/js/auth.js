document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/perfil';

    document.body.appendChild(form);
    form.submit();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Credenciales inválidas'
        });
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.getElementById('registerForm');

  if (registerForm) {
    registerForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      try {
        const response = await fetch('/registro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password, confirmPassword })
        });

        const data = await response.json();

        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: data.message
          }).then(() => {
            window.location.href = '/';
          });
        } else {
          const errorMsg = data.errors?.map(e => e.msg).join('\n') || data.message;
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: errorMsg
          });
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error de red',
          text: 'No se pudo conectar con el servidor. Intente más tarde.'
        });
      }
    });
  }
});


