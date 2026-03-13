// FCA Refugee Support System - Form Validation and Functionality

document.addEventListener("DOMContentLoaded", function () {
  // Set today's date as default for registration date
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("dateOfRegistration").value = today;

  // Initialize form event listeners
  initializeFormValidation();
});

function initializeFormValidation() {
  const form = document.getElementById("registrationForm");
  const inputs = form.querySelectorAll("input, select");

  // Add real-time validation to all inputs
  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => clearFieldError(input));
  });

  // Add form submit event listener
  form.addEventListener("submit", handleFormSubmit);
}

function validateField(field) {
  const fieldName = field.name;
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = "";

  // Clear previous error state
  clearFieldError(field);

  switch (fieldName) {
    case "firstName":
    case "lastName":
    case "placeOfBirth":
      if (!value) {
        errorMessage = `${getFieldLabel(fieldName)} is required`;
        isValid = false;
      } else if (value.length < 2) {
        errorMessage = `${getFieldLabel(fieldName)} must be at least 2 characters long`;
        isValid = false;
      }
      break;

    case "dateOfBirth":
      if (!value) {
        errorMessage = "Date of birth is required";
        isValid = false;
      } else {
        const birthDate = new Date(value);
        const registrationDate = new Date(
          document.getElementById("dateOfRegistration").value,
        );

        if (birthDate >= registrationDate) {
          errorMessage = "Date of birth must be before date of registration";
          isValid = false;
        }
      }
      break;

    case "dateOfRegistration":
      if (!value) {
        errorMessage = "Date of registration is required";
        isValid = false;
      } else {
        // Revalidate date of birth and date of joining when registration date changes
        const birthDateField = document.getElementById("dateOfBirth");
        const joiningDateField = document.getElementById("dateOfJoining");

        if (birthDateField.value) {
          validateField(birthDateField);
        }
        if (joiningDateField.value) {
          validateField(joiningDateField);
        }
      }
      break;

    case "dateOfJoining":
      if (!value) {
        errorMessage = "Date of joining settlement camp is required";
        isValid = false;
      } else {
        const joiningDate = new Date(value);
        const registrationDate = new Date(
          document.getElementById("dateOfRegistration").value,
        );

        if (joiningDate <= registrationDate) {
          errorMessage =
            "Date of joining settlement camp must be after date of registration";
          isValid = false;
        }
      }
      break;

    case "nationality":
    case "maritalStatus":
    case "settlementCamp":
      if (!value) {
        errorMessage = `${getFieldLabel(fieldName)} is required`;
        isValid = false;
      }
      break;

    case "gender":
      // Gender validation is handled by radio buttons, always valid if one is selected
      const genderSelected = document.querySelector(
        'input[name="gender"]:checked',
      );
      if (!genderSelected) {
        errorMessage = "Gender is required";
        isValid = false;
      }
      break;
  }

  if (!isValid) {
    showFieldError(field, errorMessage);
  }

  return isValid;
}

function showFieldError(field, message) {
  field.classList.add("error");
  const errorElement = document.getElementById(field.name + "Error");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add("show");
  }
}

function clearFieldError(field) {
  field.classList.remove("error");
  const errorElement = document.getElementById(field.name + "Error");
  if (errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove("show");
  }
}

function getFieldLabel(fieldName) {
  const labels = {
    firstName: "First name",
    lastName: "Last name",
    placeOfBirth: "Place of birth",
    nationality: "Nationality",
    maritalStatus: "Marital status",
    settlementCamp: "Settlement camp",
  };
  return labels[fieldName] || fieldName;
}

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const inputs = form.querySelectorAll("input, select");
  let isFormValid = true;

  // Validate all fields
  inputs.forEach((input) => {
    if (input.type !== "radio" || input.name === "gender") {
      if (input.name === "gender") {
        // Special handling for radio buttons
        const genderSelected = document.querySelector(
          'input[name="gender"]:checked',
        );
        if (!genderSelected) {
          showFieldError(input, "Gender is required");
          isFormValid = false;
        }
      } else {
        const fieldValid = validateField(input);
        if (!fieldValid) {
          isFormValid = false;
        }
      }
    }
  });

  if (isFormValid) {
    submitForm(form);
  } else {
    // Scroll to first error
    const firstError = form.querySelector(".error");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      firstError.focus();
    }
  }
}

async function submitForm(form) {
  try {
    // Collect form data
    const formData = new FormData(form);
    const data = {};

    // Convert FormData to regular object
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    // Add gender value (radio button)
    const genderSelected = document.querySelector(
      'input[name="gender"]:checked',
    );
    if (genderSelected) {
      data.gender = genderSelected.value;
    }

    // Submit to backend
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      showSuccessAlert();
      resetFormToDefault();
    } else {
      const error = await response.json();
      alert("Registration failed: " + (error.message || "Unknown error"));
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Registration failed: Network error. Please try again.");
  }
}

function showSuccessAlert() {
  const successAlert = document.getElementById("successAlert");
  successAlert.classList.add("show");

  // Scroll to top to show the alert
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeSuccessAlert() {
  const successAlert = document.getElementById("successAlert");
  successAlert.classList.remove("show");

  // Reset form when closing success alert
  resetFormToDefault();
}

function resetForm() {
  resetFormToDefault();
}

function resetFormToDefault() {
  const form = document.getElementById("registrationForm");

  // Reset all form fields
  form.reset();

  // Set default values
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("dateOfRegistration").value = today;
  document.getElementById("genderFemale").checked = true;

  // Clear all error states
  const inputs = form.querySelectorAll("input, select");
  inputs.forEach((input) => {
    clearFieldError(input);
  });

  // Clear all error messages
  const errorMessages = form.querySelectorAll(".error-message");
  errorMessages.forEach((error) => {
    error.textContent = "";
    error.classList.remove("show");
  });
}

// Utility function to format dates for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Export functions for testing (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    validateField,
    showFieldError,
    clearFieldError,
    getFieldLabel,
    formatDate,
  };
}
