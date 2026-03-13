const form = document.getElementById("beneficiaryForm");
const successMessage = document.getElementById("successMessage");
const closeSuccess = document.getElementById("closeSuccess");

const fields = {
  firstname: document.getElementById("firstname"),
  lastname: document.getElementById("lastname"),
  dateofbirth: document.getElementById("dateofbirth"),
  placeofbirth: document.getElementById("placeofbirth"),
  nationality: document.getElementById("nationality"),
  maritalStatus: document.getElementById("maritalStatus"),
  settlementCamp: document.getElementById("settlementCamp"),
  dateofjoin: document.getElementById("dateofjoin")
};

const genderInputs = document.querySelectorAll('input[name="gender"]');
const genderContainer = document.querySelector(".radio-row");
const genderErrorText = genderContainer.parentElement.querySelector(".error-text");

function getTodayDateOnly() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function getInputDate(value) {
  if (!value) return null;
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

function getErrorElement(input) {
  return input.parentElement.querySelector(".error-text");
}

function setError(input, message) {
  input.classList.remove("valid");
  input.classList.add("error");
  getErrorElement(input).textContent = message;
}

function setValid(input) {
  input.classList.remove("error");
  input.classList.add("valid");
  getErrorElement(input).textContent = "";
}

function clearState(input) {
  input.classList.remove("error", "valid");
  getErrorElement(input).textContent = "";
}

function setGenderError(message) {
  genderContainer.classList.remove("valid");
  genderContainer.classList.add("error");
  genderErrorText.textContent = message;
}

function setGenderValid() {
  genderContainer.classList.remove("error");
  genderContainer.classList.add("valid");
  genderErrorText.textContent = "";
}

function clearGenderState() {
  genderContainer.classList.remove("error", "valid");
  genderErrorText.textContent = "";
}

function validateTextField(input, label) {
  const value = input.value.trim();

  if (!value) {
    setError(input, "This field is required");
    return false;
  }

  if (value.length < 2) {
    setError(input, `${label} must be at least 2 characters`);
    return false;
  }

  setValid(input);
  return true;
}

function validateSelectField(input) {
  if (!input.value.trim()) {
    setError(input, "This field is required");
    return false;
  }

  setValid(input);
  return true;
}

function validateGender() {
  const checked = document.querySelector('input[name="gender"]:checked');

  if (!checked) {
    setGenderError("This field is required");
    return false;
  }

  setGenderValid();
  return true;
}

function validateDateOfBirth(input) {
  if (!input.value) {
    setError(input, "This field is required");
    return false;
  }

  const dob = getInputDate(input.value);
  const registrationDate = getTodayDateOnly();

  if (dob >= registrationDate) {
    setError(input, "Date of birth must be before date of registration");
    return false;
  }

  setValid(input);
  return true;
}

function validateDateOfJoining(input) {
  if (!input.value) {
    setError(input, "This field is required");
    return false;
  }

  const joiningDate = getInputDate(input.value);
  const registrationDate = getTodayDateOnly();

  if (joiningDate <= registrationDate) {
    setError(input, "Date of joining must be after date of registration");
    return false;
  }

  setValid(input);
  return true;
}

function validateForm() {
  const results = [
    validateTextField(fields.firstname, "First name"),
    validateTextField(fields.lastname, "Last name"),
    validateDateOfBirth(fields.dateofbirth),
    validateTextField(fields.placeofbirth, "Place of birth"),
    validateGender(),
    validateSelectField(fields.nationality),
    validateSelectField(fields.maritalStatus),
    validateSelectField(fields.settlementCamp),
    validateDateOfJoining(fields.dateofjoin)
  ];

  return results.every(Boolean);
}

fields.firstname.addEventListener("input", () => {
  validateTextField(fields.firstname, "First name");
});

fields.lastname.addEventListener("input", () => {
  validateTextField(fields.lastname, "Last name");
});

fields.placeofbirth.addEventListener("input", () => {
  validateTextField(fields.placeofbirth, "Place of birth");
});

fields.dateofbirth.addEventListener("change", () => {
  validateDateOfBirth(fields.dateofbirth);
});

fields.dateofjoin.addEventListener("change", () => {
  validateDateOfJoining(fields.dateofjoin);
});

fields.nationality.addEventListener("change", () => {
  validateSelectField(fields.nationality);
});

fields.maritalStatus.addEventListener("change", () => {
  validateSelectField(fields.maritalStatus);
});

fields.settlementCamp.addEventListener("change", () => {
  validateSelectField(fields.settlementCamp);
});

genderInputs.forEach((input) => {
  input.addEventListener("change", validateGender);
});

closeSuccess.addEventListener("click", () => {
  successMessage.classList.add("hidden");
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  successMessage.classList.add("hidden");

  if (!validateForm()) return;

  const payload = {
    firstName: fields.firstname.value.trim(),
    lastName: fields.lastname.value.trim(),
    dateOfBirth: fields.dateofbirth.value,
    placeOfBirth: fields.placeofbirth.value.trim(),
    gender: document.querySelector('input[name="gender"]:checked')?.value || "female",
    nationality: fields.nationality.value,
    maritalStatus: fields.maritalStatus.value,
    settlementCamp: fields.settlementCamp.value,
    dateOfJoining: fields.dateofjoin.value
  };

  try {
    const response = await fetch("/api/beneficiaries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message || "Failed to register beneficiary");
      return;
    }

    form.reset();
    document.getElementById("female").checked = true;

    Object.values(fields).forEach(clearState);
    clearGenderState();

    successMessage.classList.remove("hidden");
  } catch (error) {
    console.error("Registration error:", error);
    alert("Server error. Please try again.");
  }
});