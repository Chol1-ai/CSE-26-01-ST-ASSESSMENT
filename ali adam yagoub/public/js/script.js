document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const successAlert = document.getElementById('success-alert');

    // Helper to show error
    const showError = (input, messageElementId, show) => {
        const messageElement = document.getElementById(messageElementId);
        if (show) {
            input.classList.add('error');
            // Show error message if element exists (I didn't add all error message divs in HTML, wait, I did)
            // Actually, I added error-message divs for most fields.
            // Let's make sure I select them correctly.
            // In the HTML, I used ids like 'firstNameError'.
            if (messageElement) {
                messageElement.style.display = 'block';
            }
        } else {
            input.classList.remove('error');
            if (messageElement) {
                messageElement.style.display = 'none';
            }
        }
    };

    // Helper to validate text fields
    const validateText = (input, minLength) => {
        return input.value.trim().length >= minLength;
    };

    // Helper to validate select
    const validateSelect = (input) => {
        return input.value !== "";
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let isValid = true;

        // 1. First Name
        const firstName = document.getElementById('firstName');
        if (!validateText(firstName, 2)) {
            showError(firstName, 'firstNameError', true);
            isValid = false;
        } else {
            showError(firstName, 'firstNameError', false);
        }

        // 2. Last Name
        const lastName = document.getElementById('lastName');
        if (!validateText(lastName, 2)) {
            showError(lastName, 'lastNameError', true);
            isValid = false;
        } else {
            showError(lastName, 'lastNameError', false);
        }

        // 3. Place of Birth
        const placeOfBirth = document.getElementById('placeOfBirth');
        if (!validateText(placeOfBirth, 2)) {
            showError(placeOfBirth, 'placeOfBirthError', true);
            isValid = false;
        } else {
            showError(placeOfBirth, 'placeOfBirthError', false);
        }

        // 4. Date of Birth (Must be before today)
        const dateOfBirth = document.getElementById('dateOfBirth');
        const dobDate = new Date(dateOfBirth.value);
        const today = new Date();
        // Reset time part for accurate date comparison
        today.setHours(0, 0, 0, 0);
        
        if (!dateOfBirth.value || dobDate >= today) {
            showError(dateOfBirth, 'dateOfBirthError', true);
            isValid = false;
        } else {
            showError(dateOfBirth, 'dateOfBirthError', false);
        }

        // 5. Gender (Radio) - Always has a default value, so skipping validation unless user hacks HTML.
        
        // 6. Nationality
        const nationality = document.getElementById('nationality');
        if (!validateSelect(nationality)) {
            showError(nationality, 'nationalityError', true);
            isValid = false;
        } else {
            showError(nationality, 'nationalityError', false);
        }

        // 7. Marital Status
        const maritalStatus = document.getElementById('maritalStatus');
        if (!validateSelect(maritalStatus)) {
            showError(maritalStatus, 'maritalStatusError', true);
            isValid = false;
        } else {
            showError(maritalStatus, 'maritalStatusError', false);
        }

        // 8. Settlement Camp
        const settlementCamp = document.getElementById('settlementCamp');
        if (!validateSelect(settlementCamp)) {
            showError(settlementCamp, 'settlementCampError', true);
            isValid = false;
        } else {
            showError(settlementCamp, 'settlementCampError', false);
        }

        // 9. Date of Joining (Must be after today)
        const dateOfJoining = document.getElementById('dateOfJoining');
        const joiningDate = new Date(dateOfJoining.value);
        
        if (!dateOfJoining.value || joiningDate <= today) {
            showError(dateOfJoining, 'dateOfJoiningError', true);
            isValid = false;
        } else {
            showError(dateOfJoining, 'dateOfJoiningError', false);
        }

        if (isValid) {
            // Collect data
            const formData = {
                firstName: firstName.value.trim(),
                lastName: lastName.value.trim(),
                placeOfBirth: placeOfBirth.value.trim(),
                dateOfBirth: dateOfBirth.value,
                gender: document.querySelector('input[name="gender"]:checked').value,
                nationality: nationality.value,
                maritalStatus: maritalStatus.value,
                settlementCamp: settlementCamp.value,
                dateOfJoining: dateOfJoining.value
            };

            try {
                console.log('Sending form data:', formData);
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok) {
                    // Success
                    successAlert.style.display = 'block';
                    window.scrollTo(0, 0);
                    form.reset();
                    // Reset borders
                    const inputs = form.querySelectorAll('.form-control');
                    inputs.forEach(input => input.classList.remove('error'));
                } else {
                    const errorMessage = result.errors ? result.errors.join(', ') : (result.message || 'Submission failed');
                    alert('Error: ' + errorMessage);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        }
    });

    // Close alert function
    window.closeAlert = () => {
        successAlert.style.display = 'none';
        form.reset(); // Requirement: "On closing the success alert box, the form and all its fields resets to default."
    };
});
