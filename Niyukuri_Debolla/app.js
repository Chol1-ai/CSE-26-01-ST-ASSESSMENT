const form = document.getElementById("beneficiary-form");
const message = document.getElementById("form-message");
const landing = document.getElementById("landing");
const formView = document.getElementById("form-view");
const startButton = document.getElementById("start-registration");
const successAlert = document.getElementById("success-alert");
const alertClose = successAlert ? successAlert.querySelector(".alert-close") : null;

const showForm = () => {
  landing.classList.add("hidden");
  formView.classList.remove("hidden");
  form.scrollIntoView({ behavior: "smooth", block: "start" });
};

if (startButton) {
  startButton.addEventListener("click", showForm);
}

if (window.location.hash === "#form") {
  showForm();
}

const today = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

const parseDateInput = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [_, y, m, d] = isoMatch;
    return new Date(`${y}-${m}-${d}T00:00:00`);
  }

  const slashMatch = trimmed.match(/^(\d{4})\/(\d{2})\/(\d{2})$/);
  if (slashMatch) {
    const [_, y, m, d] = slashMatch;
    return new Date(`${y}-${m}-${d}T00:00:00`);
  }

  return null;
};

const formatToIso = (value) => {
  const parsed = parseDateInput(value);
  if (!parsed || Number.isNaN(parsed.getTime())) return null;
  const y = parsed.getFullYear();
  const m = String(parsed.getMonth() + 1).padStart(2, "0");
  const d = String(parsed.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const getErrorMessage = (field, type) => {
  const error = field.closest(".field")?.querySelector(".error");
  if (!error) return "";
  return type === "invalid"
    ? error.getAttribute("data-invalid") || "Invalid field"
    : error.getAttribute("data-required") || "This field is required";
};

const setFieldError = (field, type) => {
  const wrapper = field.closest(".field");
  if (!wrapper) return;
  const error = wrapper.querySelector(".error");
  if (type) {
    wrapper.classList.add("invalid");
    if (error) {
      error.textContent = getErrorMessage(field, type);
    }
  } else {
    wrapper.classList.remove("invalid");
  }
};

const validateField = (field) => {
  if (!field) return true;

  if (field.type === "radio") {
    const group = form.querySelectorAll(`input[name="${field.name}"]`);
    const hasValue = Array.from(group).some((item) => item.checked);
    setFieldError(field, hasValue ? "" : "required");
    return hasValue;
  }

  const value = field.value.trim();
  if (value === "") {
    setFieldError(field, "required");
    return false;
  }

  if (field.name === "firstName" || field.name === "lastName" || field.name === "placeOfBirth") {
    if (value.length < 2) {
      setFieldError(field, "invalid");
      return false;
    }
  }

  if (field.name === "dateOfBirth") {
    const date = parseDateInput(value);
    if (!date || Number.isNaN(date.getTime()) || date >= today()) {
      setFieldError(field, "invalid");
      return false;
    }
  }

  if (field.name === "dateOfJoining") {
    const date = parseDateInput(value);
    if (!date || Number.isNaN(date.getTime()) || date > today()) {
      setFieldError(field, "invalid");
      return false;
    }
  }

  setFieldError(field, "");
  return true;
};

const resetValidation = () => {
  const fields = form.querySelectorAll(".field.invalid");
  fields.forEach((wrapper) => wrapper.classList.remove("invalid"));
};

const validateForm = () => {
  let valid = true;
  const requiredInputs = form.querySelectorAll("input[required], select[required]");

  requiredInputs.forEach((input) => {
    const fieldValid = validateField(input);
    if (!fieldValid) valid = false;
  });

  return valid;
};

form.addEventListener("blur", (event) => {
  const field = event.target;
  if (field.matches("input, select")) {
    validateField(field);
  }
}, true);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "";
  message.className = "";
  if (successAlert) {
    successAlert.classList.add("hidden");
  }

  if (!validateForm()) {
    message.textContent = "Please fill all required fields.";
    message.classList.add("error");
    return;
  }

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  if (payload.dateOfBirth) {
    const iso = formatToIso(payload.dateOfBirth);
    if (iso) payload.dateOfBirth = iso;
  }
  if (payload.dateOfJoining) {
    const iso = formatToIso(payload.dateOfJoining);
    if (iso) payload.dateOfJoining = iso;
  }

  try {
    const response = await fetch("/api/beneficiaries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || "Registration failed.");
    }

    form.reset();
    resetValidation();
    if (successAlert) {
      successAlert.classList.remove("hidden");
    }
    message.textContent = "";
    message.classList.remove("success", "error");
  } catch (error) {
    message.textContent = error.message;
    message.classList.add("error");
  }
});

if (alertClose) {
  alertClose.addEventListener("click", () => {
    successAlert.classList.add("hidden");
    form.reset();
    resetValidation();
  });
}
