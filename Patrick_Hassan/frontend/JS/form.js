// ═══════════════════════════════════════════════
//  form.js
//  FCA Beneficiary Registration — Form Logic
//  Location: Patrick_Hassan/frontend/js/form.js
//
//  What this file does:
//  1. Validates every field on form submission
//  2. Shows red borders + error messages for invalid fields
//  3. Shows green borders for valid fields
//  4. Sends data to backend when everything is valid
//  5. Shows success alert and resets the form
//  6. Resets everything when alert is closed
// ═══════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", () => {

  // ── Get references to all form elements ──
  const form             = document.getElementById("registrationForm");
  const successAlert     = document.getElementById("successAlert");
  const alertCloseBtn    = document.getElementById("alertCloseBtn");

  const firstName        = document.getElementById("firstName");
  const lastName         = document.getElementById("lastName");
  const dateOfBirth      = document.getElementById("dateOfBirth");
  const placeOfBirth     = document.getElementById("placeOfBirth");
  const nationality      = document.getElementById("nationality");
  const maritalStatus    = document.getElementById("maritalStatus");
  const settlementCamp   = document.getElementById("settlementCamp");
  const dateOfJoining    = document.getElementById("dateOfJoining");

  // ── Get references to all error message elements ──
  const firstNameError      = document.getElementById("firstNameError");
  const lastNameError       = document.getElementById("lastNameError");
  const dateOfBirthError    = document.getElementById("dateOfBirthError");
  const placeOfBirthError   = document.getElementById("placeOfBirthError");
  const nationalityError    = document.getElementById("nationalityError");
  const maritalStatusError  = document.getElementById("maritalStatusError");
  const settlementCampError = document.getElementById("settlementCampError");
  const dateOfJoiningError  = document.getElementById("dateOfJoiningError");

  // ════════════════════════════════════════════
  //  HELPER FUNCTIONS
  //  These small functions are reused for each field
  // ════════════════════════════════════════════

  // Marks a field as INVALID — red border + error message
  function markInvalid(field, errorEl, message) {
    field.classList.remove("valid");
    field.classList.add("invalid");
    errorEl.textContent = message;
  }

  // Marks a field as VALID — green border + no error message
  function markValid(field, errorEl) {
    field.classList.remove("invalid");
    field.classList.add("valid");
    errorEl.textContent = "";
  }

  // Resets a field to default — no border colour, no message
  function markDefault(field, errorEl) {
    field.classList.remove("valid", "invalid");
    errorEl.textContent = "";
  }

  // Gets today's date as a string "YYYY-MM-DD"
  // Used to compare dates against today
  function getTodayString() {
    return new Date().toISOString().split("T")[0];
  }

  // ════════════════════════════════════════════
  //  VALIDATE ALL FIELDS
  //  Returns true if everything is valid
  //  Returns false if anything fails
  // ════════════════════════════════════════════
  function validateAll() {
    // Track whether the whole form is valid
    let isValid = true;
    const today = getTodayString();

    // ── 1. First Name ──
    // Rule: required, minimum 2 characters
    const firstNameVal = firstName.value.trim();
    if (firstNameVal === "") {
      markInvalid(firstName, firstNameError, "This field is required");
      isValid = false;
    } else if (firstNameVal.length < 2) {
      markInvalid(firstName, firstNameError, "Invalid field");
      isValid = false;
    } else {
      markValid(firstName, firstNameError);
    }

    // ── 2. Last Name ──
    // Rule: required, minimum 2 characters
    const lastNameVal = lastName.value.trim();
    if (lastNameVal === "") {
      markInvalid(lastName, lastNameError, "This field is required");
      isValid = false;
    } else if (lastNameVal.length < 2) {
      markInvalid(lastName, lastNameError, "Invalid field");
      isValid = false;
    } else {
      markValid(lastName, lastNameError);
    }

    // ── 3. Date of Birth ──
    // Rule: required, must be BEFORE today (cannot be in the future)
    const dobVal = dateOfBirth.value;
    if (dobVal === "") {
      markInvalid(dateOfBirth, dateOfBirthError, "This field is required");
      isValid = false;
    } else if (dobVal >= today) {
      // Date of birth must be BEFORE today
      markInvalid(dateOfBirth, dateOfBirthError, "Invalid field");
      isValid = false;
    } else {
      markValid(dateOfBirth, dateOfBirthError);
      dateOfBirth.classList.add("has-value");
    }

    // ── 4. Place of Birth ──
    // Rule: required, minimum 2 characters
    const placeVal = placeOfBirth.value.trim();
    if (placeVal === "") {
      markInvalid(placeOfBirth, placeOfBirthError, "This field is required");
      isValid = false;
    } else if (placeVal.length < 2) {
      markInvalid(placeOfBirth, placeOfBirthError, "Invalid field");
      isValid = false;
    } else {
      markValid(placeOfBirth, placeOfBirthError);
    }

    // ── 5. Nationality ──
    // Rule: required — must select an option
    if (nationality.value === "") {
      markInvalid(nationality, nationalityError, "This field is required");
      isValid = false;
    } else {
      markValid(nationality, nationalityError);
      nationality.classList.add("selected");
    }

    // ── 6. Marital Status ──
    // Rule: required — must select an option
    if (maritalStatus.value === "") {
      markInvalid(maritalStatus, maritalStatusError, "This field is required");
      isValid = false;
    } else {
      markValid(maritalStatus, maritalStatusError);
      maritalStatus.classList.add("selected");
    }

    // ── 7. Settlement Camp ──
    // Rule: required — must select an option
    if (settlementCamp.value === "") {
      markInvalid(settlementCamp, settlementCampError, "This field is required");
      isValid = false;
    } else {
      markValid(settlementCamp, settlementCampError);
      settlementCamp.classList.add("selected");
    }

    // ── 8. Date of Joining Settlement Camp ──
    // Rule: required, must be AFTER date of registration (today)
    const dojVal = dateOfJoining.value;
    if (dojVal === "") {
      markInvalid(dateOfJoining, dateOfJoiningError, "This field is required");
      isValid = false;
    } else if (dojVal <= today) {
      // Date of joining must be AFTER today
      markInvalid(dateOfJoining, dateOfJoiningError, "Invalid field");
      isValid = false;
    } else {
      markValid(dateOfJoining, dateOfJoiningError);
      dateOfJoining.classList.add("has-value");
    }

    return isValid;
  }

  // ════════════════════════════════════════════
  //  RESET FORM
  //  Clears all fields and removes all
  //  validation styles — back to default
  // ════════════════════════════════════════════
  function resetForm() {
    // Reset all HTML form fields to empty/default
    form.reset();

    // Remove validation classes from all fields
    const allFields = [
      firstName, lastName, dateOfBirth, placeOfBirth,
      nationality, maritalStatus, settlementCamp, dateOfJoining
    ];

    allFields.forEach((field) => {
      markDefault(field, { textContent: "" }); // clear classes
      field.classList.remove("has-value", "selected");
    });

    // Clear all error messages manually
    [
      firstNameError, lastNameError, dateOfBirthError,
      placeOfBirthError, nationalityError, maritalStatusError,
      settlementCampError, dateOfJoiningError
    ].forEach((el) => {
      el.textContent = "";
    });
  }

  // ════════════════════════════════════════════
  //  FORM SUBMISSION
  //  Runs when the Register button is clicked
  // ════════════════════════════════════════════
  form.addEventListener("submit", async (e) => {
    // Stop the browser from reloading the page
    e.preventDefault();

    // Run validation — if anything fails, stop here
    const valid = validateAll();
    if (!valid) return;

    // ── Get the selected gender value ──
    const selectedGender = document.querySelector('input[name="gender"]:checked').value;

    // ── Build the data object to send to backend ──
    const formData = {
      firstName:      firstName.value.trim(),
      lastName:       lastName.value.trim(),
      dateOfBirth:    dateOfBirth.value,
      placeOfBirth:   placeOfBirth.value.trim(),
      gender:         selectedGender,
      nationality:    nationality.value,
      maritalStatus:  maritalStatus.value,
      settlementCamp: settlementCamp.value,
      dateOfJoining:  dateOfJoining.value,
    };

    try {
      // ── Send data to backend ──
      // POST request to our Node.js server
      const response = await fetch("http://localhost:5000/api/beneficiaries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // ── SUCCESS ──
        // 1. Reset the form fields immediately
        resetForm();

        // 2. Show the green success alert at the top
        successAlert.classList.remove("hidden");

      } else {
        // Server returned an error
        alert("Registration failed: " + (result.message || "Please try again."));
      }

    } catch (error) {
      // Network error — backend not running etc.
      console.error("Submission error:", error);
      alert("Could not connect to the server. Please make sure the backend is running.");
    }
  });

  // ════════════════════════════════════════════
  //  CLOSE SUCCESS ALERT
  //  When ✕ is clicked:
  //  1. Hide the alert
  //  2. Reset form to default (already done above,
  //     but this ensures it stays clean)
  // ════════════════════════════════════════════
  alertCloseBtn.addEventListener("click", () => {
    // Hide the alert
    successAlert.classList.add("hidden");

    // Make sure form is fully reset
    resetForm();
  });

  // ════════════════════════════════════════════
  //  LIVE VALIDATION
  //  As the user types or changes a field,
  //  update its border colour in real time
  // ════════════════════════════════════════════

  // Text inputs — validate on every keystroke
  [firstName, lastName, placeOfBirth].forEach((input) => {
    input.addEventListener("input", () => {
      const val = input.value.trim();
      const errorEl = document.getElementById(input.id + "Error");
      if (val === "") {
        markDefault(input, errorEl);
      } else if (val.length < 2) {
        markInvalid(input, errorEl, "Invalid field");
      } else {
        markValid(input, errorEl);
      }
    });
  });

  // Date inputs — validate when user picks a date
  dateOfBirth.addEventListener("change", () => {
    const today = getTodayString();
    const val = dateOfBirth.value;
    if (val === "") {
      markDefault(dateOfBirth, dateOfBirthError);
      dateOfBirth.classList.remove("has-value");
    } else if (val >= today) {
      markInvalid(dateOfBirth, dateOfBirthError, "Invalid field");
      dateOfBirth.classList.remove("has-value");
    } else {
      markValid(dateOfBirth, dateOfBirthError);
      dateOfBirth.classList.add("has-value");
    }
  });

  dateOfJoining.addEventListener("change", () => {
    const today = getTodayString();
    const val = dateOfJoining.value;
    if (val === "") {
      markDefault(dateOfJoining, dateOfJoiningError);
      dateOfJoining.classList.remove("has-value");
    } else if (val <= today) {
      markInvalid(dateOfJoining, dateOfJoiningError, "Invalid field");
      dateOfJoining.classList.remove("has-value");
    } else {
      markValid(dateOfJoining, dateOfJoiningError);
      dateOfJoining.classList.add("has-value");
    }
  });

  // Dropdowns — validate when user picks an option
  [nationality, maritalStatus, settlementCamp].forEach((select) => {
    select.addEventListener("change", () => {
      const errorEl = document.getElementById(select.id + "Error");
      if (select.value === "") {
        markDefault(select, errorEl);
        select.classList.remove("selected");
      } else {
        markValid(select, errorEl);
        select.classList.add("selected");
      }
    });
  });

}); // end DOMContentLoaded