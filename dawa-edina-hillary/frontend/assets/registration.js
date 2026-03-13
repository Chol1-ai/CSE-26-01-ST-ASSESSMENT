// Get important elements from the HTML page
const form = document.getElementById("registration-form"); // Registration form element
const successAlert = document.getElementById("success-alert"); // Success message container
const closeAlert = document.getElementById("close-alert"); // Button used to close the success alert


// Object containing all form fields and their validation rules
const fields = {
    firstName: {
        input: document.getElementById("firstName"), // Input element for first name
        required: true, // Field must not be empty
        minLength: 2 // Minimum number of characters allowed
    },
    lastName: {
        input: document.getElementById("lastName"),
        required: true,
        minLength: 2
    },
    placeOfBirth: {
        input: document.getElementById("placeOfBirth"),
        required: true,
        minLength: 2
    },
    dateOfBirth: {
        input: document.getElementById("dateOfBirth"),
        required: true,
        dateRule: "dob" // Special validation rule for date of birth
    },
    dateOfRegistration: {
        input: document.getElementById("dateOfRegistration"),
        required: true
    },
    dateOfJoining: {
        input: document.getElementById("dateOfJoining"),
        required: true,
        dateRule: "joining" // Special validation rule for joining date
    },
    nationality: {
        input: document.getElementById("nationality"),
        required: true
    },
    maritalStatus: {
        input: document.getElementById("maritalStatus"),
        required: true
    },
    settlementCamp: {
        input: document.getElementById("settlementCamp"),
        required: true
    }
};


// Store date inputs together for easier validation handling
const dateInputs = [
    fields.dateOfBirth.input,
    fields.dateOfRegistration.input,
    fields.dateOfJoining.input
];


// Function to visually mark a field as valid or invalid
const setFieldState = (field, isValid) => {
    const wrapper = field.input.closest(".field"); // Find the parent container
    if (!wrapper) return;

    wrapper.classList.remove("invalid", "valid"); // Remove existing validation classes
    wrapper.classList.add(isValid ? "valid" : "invalid"); // Add new validation class
};


// Function to display an error message for a field
const setFieldError = (field, message) => {
    const wrapper = field.input.closest(".field");
    if (!wrapper) return;

    const error = wrapper.querySelector(".error"); // Find the error message element
    if (!error) return;

    error.textContent = message; // Set the error message text
};


// Reset validation styles for all fields
const resetFieldState = () => {
    document.querySelectorAll(".field").forEach((field) => {
        field.classList.remove("invalid", "valid"); // Remove validation classes
    });
};


// Validate logical relationships between dates
const validateDates = () => {
    const dob = fields.dateOfBirth.input.value; // Date of birth
    const registration = fields.dateOfRegistration.input.value; // Registration date
    const joining = fields.dateOfJoining.input.value; // Joining date

    let dobValid = true;
    let joiningValid = true;

    // Rule: Date of Birth must be before Date of Registration
    if (dob && registration) {
        dobValid = new Date(dob) < new Date(registration);
    }

    // Rule: Date of Joining must be after Date of Registration
    if (joining && registration) {
        joiningValid = new Date(joining) > new Date(registration);
    }

    return { dobValid, joiningValid };
};


// Validate a single field
const validateField = (key) => {
    const field = fields[key];
    const value = field.input.value.trim();

    // Check if field is required
    if (field.required && value === "") {
        setFieldError(field, "This field is required");
        setFieldState(field, false);
        return false;
    }

    // Check minimum length rule
    if (field.minLength && value.length < field.minLength) {
        setFieldError(field, "Invalid field");
        setFieldState(field, false);
        return false;
    }

    // Check special date validation rules
    if (field.dateRule) {
        const { dobValid, joiningValid } = validateDates();
        const dateOk = field.dateRule === "dob" ? dobValid : joiningValid;

        if (!dateOk) {
            setFieldError(field, "Invalid field");
            setFieldState(field, false);
            return false;
        }
    }

    // If all checks pass mark field as valid
    setFieldState(field, true);
    return true;
};


// Validate all fields in the form
const validateForm = () => {
    const results = Object.keys(fields).map((key) => validateField(key));
    return results.every(Boolean); // Returns true only if all fields are valid
};


// Reset form inputs and validation states
const resetForm = () => {
    form.reset();
    resetFieldState();
};


// Add live validation events to each field
Object.keys(fields).forEach((key) => {
    const field = fields[key];

    // Validate while typing
    field.input.addEventListener("input", () => validateField(key));

    // Validate when field value changes
    field.input.addEventListener("change", () => validateField(key));
});


// Revalidate dependent date fields when a date changes
dateInputs.forEach((input) => {
    input.addEventListener("change", () => {
        validateField("dateOfBirth");
        validateField("dateOfJoining");
    });
});


// Handle form submission
form.addEventListener("submit", async (event) => {

    event.preventDefault(); // Prevent page reload

    const isValid = validateForm(); // Validate the form
    if (!isValid) return; // Stop submission if invalid


    // Build data object to send to backend API
    const payload = {
        firstName: fields.firstName.input.value.trim(),
        lastName: fields.lastName.input.value.trim(),
        placeOfBirth: fields.placeOfBirth.input.value.trim(),
        dateOfBirth: fields.dateOfBirth.input.value,
        dateOfRegistration: fields.dateOfRegistration.input.value,
        dateOfJoining: fields.dateOfJoining.input.value,
        gender: document.querySelector("input[name='gender']:checked").value,
        nationality: fields.nationality.input.value,
        maritalStatus: fields.maritalStatus.input.value,
        settlementCamp: fields.settlementCamp.input.value
    };

    try {
        // Send data to backend API
        const response = await fetch("http://localhost:3000/api/beneficiaries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        // If request fails, stop execution
        if (!response.ok) {
            return;
        }

    } catch (error) {
        // Handle network or server errors
        return;
    }

    // Show success message
    successAlert.classList.remove("hidden");

    // Reset form
    resetForm();

    // Scroll to success message smoothly
    successAlert.scrollIntoView({ behavior: "smooth", block: "start" });
});


// Close the success alert when button is clicked
closeAlert.addEventListener("click", () => {
    successAlert.classList.add("hidden");
    resetForm();
});


// When form is reset, remove validation styles
form.addEventListener("reset", () => {
    setTimeout(() => {
        resetFieldState();
    }, 0);
});