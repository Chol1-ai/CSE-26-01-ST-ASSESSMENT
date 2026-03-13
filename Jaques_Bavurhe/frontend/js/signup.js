// Form elements and required field ids
const form = document.getElementById("registrationForm");
const requiredIds = [
  "firstName",
  "lastName",
  "placeOfBirth",
  "dateOfBirth",
  "dateOfRegistration",
  "nationality",
  "maritalStatus",
  "settlementCamp",
  "dateOfJoiningCamp",
];

// Basic validators for specific fields
const nameLike = (value) => /^[A-Za-z\s'-]{2,}$/.test(value);
const validDate = (value) => !Number.isNaN(Date.parse(value)); 


const validators = {
  firstName: nameLike,
  lastName: nameLike,
  placeOfBirth: nameLike,
  dateOfBirth: validDate,
  dateOfRegistration: validDate,
  dateOfJoiningCamp: validDate,
};

// Set field error text and toggle valid/invalid styles
const setError = (el, message) => {
  const group = el.closest(".field");
  if (!group) return;
  const error = group.querySelector(".field-error");
  if (error) error.textContent = message || "";
  el.classList.toggle("is-invalid", !!message);
  el.classList.toggle("is-valid", !message && el.value.trim().length > 0);
};

// Success message elements
const successBox = document.getElementById("successBox");
const successClose = document.querySelector(".success-close");
const showSuccess = (show) => {
  if (!successBox) return;
  successBox.hidden = !show;
};

// Hide success message on load
showSuccess(false);

// Clear all error messages and styles
const clearErrors = () => {
  requiredIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) setError(el, "");
  });
};

// Validate one field and update UI
const validateField = (el) => {
  const value = el.value.trim();
  if (!value) {
    setError(el, "This field is required");
    return false;
  }
  const validator = validators[el.id];
  if (validator && !validator(value)) {
    setError(el, "invalid field");
    return false;
  }
  setError(el, "");
  return true;
};

let hasSubmitted = false;

// Submit handler: validate, send to backend, and show success
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  hasSubmitted = true;
  showSuccess(false);
  let valid = true;
  requiredIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!validateField(el)) valid = false;
  });
  if (!valid) return;

  const payload = {
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    placeOfBirth: document.getElementById("placeOfBirth").value.trim(),
    dateOfBirth: document.getElementById("dateOfBirth").value,
    dateOfRegistration: document.getElementById("dateOfRegistration").value,
    gender: document.querySelector('input[name="gender"]:checked').value,
    nationality: document.getElementById("nationality").value,
    maritalStatus: document.getElementById("maritalStatus").value,
    settlementCamp: document.getElementById("settlementCamp").value,
    dateOfJoiningCamp: document.getElementById("dateOfJoiningCamp").value,
  };

  try {
    const res = await fetch("/beneficiaries/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.message || "Submission failed");
    }
    form.reset();
    clearErrors();
    showSuccess(true);
  } catch (err) {
    alert(err.message);
  }
});

// Close success message
if (successClose) {
  successClose.addEventListener("click", () => showSuccess(false));
}

// Live validation as the user edits fields
requiredIds.forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const eventName = el.tagName === "SELECT" ? "change" : "input";
  el.addEventListener(eventName, () => {
    if (!hasSubmitted) return;
    if (el.classList.contains("is-invalid")) {
      validateField(el);
    } else if (el.value.trim().length > 0) {
      validateField(el);
    }
  });
});
