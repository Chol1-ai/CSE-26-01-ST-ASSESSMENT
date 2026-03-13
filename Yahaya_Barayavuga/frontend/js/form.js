document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const successAlert = document.getElementById('successAlert');
    const closeAlertBtn = document.getElementById('closeAlertBtn');

    // Notice the 'async' keyword here
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); 
        
        let isValid = true;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Reset all error states first
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('is-empty', 'is-invalid');
        });

        // Helper function to set errors
        const setError = (elementId, errorType) => {
            document.getElementById(elementId).closest('.form-group').classList.add(errorType);
            isValid = false;
        };

        // 1. Validate Text Fields
        const textFields = ['firstName', 'lastName', 'placeOfBirth'];
        textFields.forEach(id => {
            const value = document.getElementById(id).value.trim();
            if (value === '') {
                setError(id, 'is-empty');
            } else if (value.length < 3) {
                setError(id, 'is-invalid');
            }
        });

        // 2. Validate Dropdowns
        const selectFields = ['nationality', 'maritalStatus', 'settlementCamp'];
        selectFields.forEach(id => {
            const value = document.getElementById(id).value;
            if (value === '') {
                setError(id, 'is-empty');
            }
        });

        // 3. Validate Date of Birth
        const dobStr = document.getElementById('dob').value;
        if (dobStr === '') {
            setError('dob', 'is-empty');
        } else {
            const dobDate = new Date(dobStr);
            if (dobDate >= today) {
                setError('dob', 'is-invalid');
            }
        }

        // 4. Validate Joining Date
        const joinStr = document.getElementById('joiningDate').value;
        if (joinStr === '') {
            setError('joiningDate', 'is-empty');
        } else {
            const joinDate = new Date(joinStr);
            if (joinDate <= today) {
                setError('joiningDate', 'is-invalid');
            }
        }

        // 5. Final Check & Backend Submission
        if (isValid) {
            // Gather all the data into an object that matches our Node.js schema
            const formData = {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                dateOfBirth: document.getElementById('dob').value,
                placeOfBirth: document.getElementById('placeOfBirth').value.trim(),
                gender: document.querySelector('input[name="gender"]:checked').value,
                nationality: document.getElementById('nationality').value,
                maritalStatus: document.getElementById('maritalStatus').value,
                settlementCamp: document.getElementById('settlementCamp').value,
                joiningDate: document.getElementById('joiningDate').value
            };

            try {
                // Send the POST request to the Express backend
                const response = await fetch('http://localhost:5000/api/beneficiaries', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData) // Convert object to JSON string
                });

                const result = await response.json();

                if (response.ok) {
                    // Backend responded with success! Show alert and reset form.
                    successAlert.style.display = 'flex'; 
                    form.reset(); 
                    
                    // Re-set gender default to Female after reset
                    document.querySelector('input[name="gender"][value="Female"]').checked = true;
                    console.log('Successfully saved to DB:', result);
                } else {
                    // Backend threw a validation error
                    console.error('Backend validation error:', result);
                    alert('Registration failed: ' + result.message);
                }

            } catch (error) {
                // The server is off or unreachable
                console.error('Network error:', error);
                alert('Could not connect to the server. Is your Node.js backend running?');
            }
        }
    });

    // Close alert and reset form strictly to default
    closeAlertBtn.addEventListener('click', () => {
        successAlert.style.display = 'none';
        form.reset();
        
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('is-empty', 'is-invalid');
        });
        
        document.querySelector('input[name="gender"][value="Female"]').checked = true;
    });
});