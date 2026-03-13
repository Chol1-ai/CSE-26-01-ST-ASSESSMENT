const form = document.getElementById('registrationForm');

const API_URL = 'http://localhost:3000/api/userinfo/register';

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Collecting input form data
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json();

  // clearing the error messages
  document.querySelectorAll(".error").forEach(el => el.textContent = "");

  // Incase of errors, then the message will be displaed
  if (!response.ok) {

    const errors = result.errors;

    for (let field in errors) {
      const errorElement = document.getElementById(field + "-error");

      if (errorElement) {
        errorElement.textContent = errors[field];
      }
    }

  } else {
    alert("Registration successful");
    form.reset();
  }
});