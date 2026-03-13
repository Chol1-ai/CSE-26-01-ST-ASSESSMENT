document.getElementById("registrationForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const form = e.target;
    const inputs = form.querySelectorAll('.form__input, .form__select');
    let isValid = true;

    // Clear previous errors
    inputs.forEach(input => {
        input.style.borderColor = '#ccc';
        input.parentElement.querySelector('.error-msg').innerText = "";
    });

    const data = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        dob: document.getElementById("dob").value.trim(),
        placeOfBirth: document.getElementById("placeOfBirth").value.trim(),
        gender: form.querySelector('input[name="gender"]:checked').value,
        nationality: document.getElementById("nationality").value,
        maritalStatus: document.getElementById("maritalStatus").value,
        settlementCamp: document.getElementById("settlementCamp").value,
        joiningDate: document.getElementById("joiningDate").value.trim()
    };

    // --- Validation Rules ---
    const today = new Date();

    // Text field validations (Min 2 chars)
    if (data.firstName.length < 2) invalidate("firstName", "Invalid field");
    if (data.lastName.length < 2) invalidate("lastName", "Invalid field");
    if (data.placeOfBirth.length < 2) invalidate("placeOfBirth", "Invalid field");

    // Date validations
    if (!data.dob || new Date(data.dob) >= today) invalidate("dob", "Invalid field");
    if (!data.joiningDate || new Date(data.joiningDate) <= today) invalidate("joiningDate", "Invalid field");

    // Required Select validations
    if (!data.nationality) invalidate("nationality", "This field is required");
    if (!data.maritalStatus) invalidate("maritalStatus", "This field is required");
    if (!data.settlementCamp) invalidate("settlementCamp", "This field is required");

    function invalidate(id, msg) {
        const el = document.getElementById(id);
        el.style.borderColor = "red";
        el.parentElement.querySelector('.error-msg').innerText = msg;
        isValid = false;
    }

    if (isValid) {
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Show Green Success Alert
                const alertBox = document.getElementById("successAlert");
                alertBox.style.display = "flex";
                
                // Turn borders green as seen in image_bae4b5.png
                inputs.forEach(input => input.style.borderColor = "green");
                
                // Reset form fields
                form.reset();
            }
        } catch (err) {
            alert("Error connecting to server.");
        }
    }
});

// Reload page when closing success alert
document.getElementById("closeAlert").addEventListener("click", function() {
    window.location.reload();
});