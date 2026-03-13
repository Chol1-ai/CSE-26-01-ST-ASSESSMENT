// Form validation and submission handler
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const successAlert = document.getElementById("success-alert");
  const closeAlertBtn = document.getElementById("close-alert");

  // Close alert button handler
  closeAlertBtn.addEventListener("click", function () {
    successAlert.classList.add("hidden");
  });

  // Form submission handler
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Reset previous error states
    clearErrors();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Submit form data
    await submitForm();
  });

  // Client-side validation function
  function validateForm() {
    let isValid = true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // First Name validation
    const firstName = document.getElementById("firstName");
    if (!firstName.value.trim() || firstName.value.trim().length < 2) {
      showError(firstName, "First name must be at least 2 characters");
      isValid = false;
    }

    // Last Name validation
    const lastName = document.getElementById("lastName");
    if (!lastName.value.trim() || lastName.value.trim().length < 2) {
      showError(lastName, "Last name must be at least 2 characters");
      isValid = false;
    }

    // Date of Birth validation
    const dob = document.getElementById("dob");
    if (!dob.value) {
      showError(dob, "Date of birth is required");
      isValid = false;
    } else {
      const birthDate = new Date(dob.value);
      if (birthDate >= today) {
        showError(dob, "Date of birth must be in the past");
        isValid = false;
      }
    }

    // Place of Birth validation
    const pob = document.getElementById("pob");
    if (!pob.value.trim()) {
      showError(pob, "Place of birth is required");
      isValid = false;
    }

    // Nationality validation
    const nationality = document.getElementById("nationality");
    if (!nationality.value) {
      showError(nationality, "Please select a nationality");
      isValid = false;
    }

    // Marital Status validation
    const maritalStatus = document.getElementById("maritalStatus");
    if (!maritalStatus.value) {
      showError(maritalStatus, "Please select a marital status");
      isValid = false;
    }

    // Settlement Camp validation
    const settlementCamp = document.getElementById("settlementCamp");
    if (!settlementCamp.value) {
      showError(settlementCamp, "Please select a settlement camp");
      isValid = false;
    }

    // Date of Joining validation
    const doj = document.getElementById("doj");
    if (!doj.value) {
      showError(doj, "Date of joining is required");
      isValid = false;
    }

    return isValid;
  }

  // Show error for a field
  function showError(inputElement, message) {
    const inputGroup = inputElement.closest(".input-group");
    inputGroup.classList.add("invalid");
    const errorMsg = inputGroup.querySelector(".error-msg");
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
  }

  // Clear all error states
  function clearErrors() {
    const inputGroups = document.querySelectorAll(".input-group");
    inputGroups.forEach((group) => {
      group.classList.remove("invalid");
      const errorMsg = group.querySelector(".error-msg");
      if (errorMsg) {
        errorMsg.style.display = "none";
      }
    });
  }

  // Submit form data to server
  async function submitForm() {
    const formData = {
      firstName: document.getElementById("firstName").value.trim(),
      lastName: document.getElementById("lastName").value.trim(),
      dob: document.getElementById("dob").value,
      pob: document.getElementById("pob").value.trim(),
      gender: document.querySelector('input[name="gender"]:checked').value,
      nationality: document.getElementById("nationality").value,
      maritalStatus: document.getElementById("maritalStatus").value,
      settlementCamp: document.getElementById("settlementCamp").value,
      doj: document.getElementById("doj").value,
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Show success alert
        successAlert.classList.remove("hidden");
        window.scrollTo(0, 0);

        // Reset form after successful registration
        form.reset();

        // Reset gender radio to default (female checked)
        document.querySelector('input[name="gender"][value="female"]').checked =
          true;
      } else {
        const errorData = await response.json();
        alert(
          errorData.message || "Error saving data. Please check the fields.",
        );
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Network error. Please try again.");
    }
  }
});
