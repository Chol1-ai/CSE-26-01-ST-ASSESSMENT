document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const landingPage = document.getElementById('landingPage');
    const registrationPage = document.getElementById('registrationPage');
    const registerBtn = document.getElementById('registerBtn');
    const form = document.getElementById('registrationForm');
    const alertContainer = document.getElementById('alertContainer');
    const submitBtn = document.getElementById('submitBtn');

    // Set today's date for validation
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Set max date for DOB (must be before today)
    document.getElementById('dob').max = new Date(today.setDate(today.getDate() - 1))
        .toISOString().split('T')[0];
    
    // Set min date for joining (must be after today)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('dateOfJoining').min = tomorrow.toISOString().split('T')[0];

    // Navigation: Show registration form
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        landingPage.style.display = 'none';
        registrationPage.classList.add('active');
    });

    // Form validation functions
    function validateField(field) {
        const fieldId = field.id;
        const errorElement = document.getElementById(`${fieldId}Error`);
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') || field.type === 'text' || field.tagName === 'SELECT') {
            if (!field.value.trim()) {
                isValid = false;
                errorMessage = 'This field is required';
            }
            // Min length validation for text fields
            else if (field.type === 'text' && field.value.trim().length < 2) {
                isValid = false;
                errorMessage = 'Must be at least 2 characters';
            }
        }

        // Special validation for date fields
        if (field.type === 'date' && field.value) {
            const selectedDate = new Date(field.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (field.id === 'dob') {
                // DOB must be before today
                if (selectedDate >= today) {
                    isValid = false;
                    errorMessage = 'Date of birth must be before today';
                }
            } else if (field.id === 'dateOfJoining') {
                // Joining date must be after today
                if (selectedDate <= today) {
                    isValid = false;
                    errorMessage = 'Joining date must be after today';
                }
            }
        }

        // Update UI
        if (isValid) {
            field.classList.remove('error');
            if (errorElement) errorElement.textContent = '';
        } else {
            field.classList.add('error');
            if (errorElement) errorElement.textContent = errorMessage;
        }

        return isValid;
    }

    // Validate all form fields
    function validateForm() {
        let isValid = true;
        
        // Get all inputs and selects (excluding radio buttons)
        const fields = form.querySelectorAll('input:not([type="radio"]), select');
        
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Clear all errors
    function clearErrors() {
        const fields = form.querySelectorAll('input, select');
        fields.forEach(field => {
            field.classList.remove('error');
        });
        
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.textContent = '';
        });
    }

    // Reset form to default state
    function resetFormToDefault() {
        form.reset();
        
        // Set gender to female (default)
        document.querySelector('input[name="gender"][value="female"]').checked = true;
        
        // Clear date fields
        document.getElementById('dob').value = '';
        document.getElementById('dateOfJoining').value = '';
        
        // Clear all errors
        clearErrors();
    }

    // Show success alert
    function showSuccessAlert() {
        const alert = document.createElement('div');
        alert.className = 'alert-success';
        alert.innerHTML = `
            <span>Beneficiary registered successfully</span>
            <button class="alert-close" onclick="this.parentElement.remove();">&times;</button>
        `;
        
        alertContainer.innerHTML = '';
        alertContainer.appendChild(alert);

        // Add close handler
        const closeBtn = alert.querySelector('.alert-close');
        closeBtn.addEventListener('click', function() {
            alert.remove();
            // Form remains in clean state
        });
    }

    // Form submission handler
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate form
        const isValid = validateForm();

        if (isValid) {
            // Collect form data
            const formData = new FormData(form);
            const data = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                placeOfBirth: formData.get('placeOfBirth'),
                dob: formData.get('dob'),
                gender: formData.get('gender'),
                nationality: formData.get('nationality'),
                maritalStatus: formData.get('maritalStatus'),
                settlementCamp: formData.get('settlementCamp'),
                dateOfJoining: formData.get('dateOfJoining')
            };

            // Send to backend
            try {
                const response = await fetch('http://localhost:3000/api/beneficiaries/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    // Show success alert
                    showSuccessAlert();
                    
                    // Reset form to default (empty fields, female selected)
                    resetFormToDefault();
                } else {
                    const errorData = await response.json();
                    alert('Registration failed: ' + (errorData.message || 'Please try again.'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Network error. Please check your connection.');
            }
        }
    });

    // Real-time validation on input (optional - remove if you want validation only on submit)
    // But we'll keep error removal when user starts typing
    form.querySelectorAll('input, select').forEach(field => {
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
});