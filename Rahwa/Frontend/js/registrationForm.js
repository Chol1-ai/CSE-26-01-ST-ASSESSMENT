const form = document.getElementById("registrationForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let valid = true;

  // Clear previous errors and classes
  document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
  document.querySelectorAll("input, select").forEach((el) => {
    el.classList.remove("input-error", "input-valid");
  });

  function checkField(fieldId, errorId, minLength = 1, errorMsg) {
    const field = document.getElementById(fieldId);
    if (field.value.trim().length < minLength) {
      document.getElementById(errorId).textContent = errorMsg;
      field.classList.add("input-error");
      field.classList.remove("input-valid");
      return false;
    } else {
      field.classList.remove("input-error");
      field.classList.add("input-valid");
      return true;
    }
  }

  valid &= checkField(
    "firstName",
    "firstNameError",
    2,
    "First name must be at least 2 characters",
  );
  valid &= checkField(
    "lastName",
    "lastNameError",
    2,
    "Last name must be at least 2 characters",
  );
  valid &= checkField(
    "birthPlace",
    "birthPlaceError",
    2,
    "Enter valid birth place",
  );

  // Date fields
  const dob = document.getElementById("dob");
  if (!dob.value) {
    document.getElementById("dobError").textContent =
      "Date of birth is required";
    dob.classList.add("input-error");
    dob.classList.remove("input-valid");
    valid = false;
  } else {
    dob.classList.remove("input-error");
    dob.classList.add("input-valid");
  }

  const joinDate = document.getElementById("joinDate");
  if (!joinDate.value) {
    document.getElementById("joinDateError").textContent =
      "Joining date is required";
    joinDate.classList.add("input-error");
    joinDate.classList.remove("input-valid");
    valid = false;
  } else {
    joinDate.classList.remove("input-error");
    joinDate.classList.add("input-valid");
  }

  // Dropdowns
  ["nationality", "maritalStatus", "camp"].forEach((id) => {
    const field = document.getElementById(id);
    if (!field.value) {
      document.getElementById(id + "Error").textContent =
        "This field is required";
      field.classList.add("input-error");
      field.classList.remove("input-valid");
      valid = false;
    } else {
      field.classList.remove("input-error");
      field.classList.add("input-valid");
    }
  });

  // Add success message element dynamically
  let successMsg = document.getElementById("successMsg");
  if (!successMsg) {
    successMsg = document.createElement("div");
    successMsg.id = "successMsg";
    successMsg.classList.add("success-message");
    document
      .getElementById("formTitle")
      .insertAdjacentElement("afterend", successMsg);
  }

  if (valid) {
    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // Send data to server via Fetch API
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        successMsg.textContent =
          "Beneficiary Registered Successfully!" || result.message;
        successMsg.style.textAlign = "center";
        successMsg.style.display = "block";
        successMsg.style.backgroundColor = "#00B050";

        // Optional: hide message after 5 seconds
        setTimeout(() => {
          successMsg.style.display = "none";
        }, 5000);

        // Reset form and borders
        form.reset();
        document.querySelectorAll("input, select").forEach((el) => {
          el.classList.remove("input-error", "input-valid");
        });
      } else {
        // Server returned an error
        alert(result.error || "Failed to register");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    }
  }
});
