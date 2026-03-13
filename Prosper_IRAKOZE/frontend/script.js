// frontend/script.js

function showForm() {
    document.querySelector('.landing-page').style.display = 'none';
    document.getElementById('registrationForm').style.display = 'block';
}

function showLanding() {
    document.getElementById('registrationForm').style.display = 'none';
    document.querySelector('.landing-page').style.display = 'flex';
    resetFormToDefault();
}

function closeAlert() {
    const alert = document.getElementById('successAlert');
    alert.style.display = 'none';
    resetFormToDefault();
}

function resetFormToDefault() {
    document.getElementById('beneficiaryForm').reset();
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    document.querySelectorAll('input, select').forEach(el => {
        el.classList.remove('valid', 'invalid');
    });
}

// Real-time validation
document.querySelectorAll('input, select').forEach(field => {
    field.addEventListener('input', function() {
        validateField(this);
    });
    field.addEventListener('blur', function() {
        validateField(this);
    });
});

function validateField(field) {
    const value = field.value;
    const fieldId = field.id;
    const errorElement = document.getElementById(fieldId + 'Error');
    
    field.classList.remove('valid', 'invalid');
    
    if (!value) {
        field.classList.add('invalid');
        if (errorElement) {
            errorElement.textContent = 'This field is required';
        }
        return false;
    }
    
    switch(fieldId) {
        case 'firstName':
        case 'lastName':
        case 'placeOfBirth':
            if (value.length < 2) {
                field.classList.add('invalid');
                if (errorElement) {
                    errorElement.textContent = 'Must be at least 2 characters';
                }
                return false;
            }
            break;
            
        case 'dateOfBirth':
            const today = new Date().toISOString().split('T')[0];
            if (value > today) {
                field.classList.add('invalid');
                if (errorElement) {
                    errorElement.textContent = 'Date must be before today';
                }
                return false;
            }
            break;
            
        case 'dateOfJoining':
            const today2 = new Date().toISOString().split('T')[0];
            if (value < today2) {
                field.classList.add('invalid');
                if (errorElement) {
                    errorElement.textContent = 'Date must be after today';
                }
                return false;
            }
            break;
    }
    
    field.classList.add('valid');
    if (errorElement) {
        errorElement.textContent = '';
    }
    return true;
}

function validateForm(formData) {
    let isValid = true;
    document.querySelectorAll('input, select').forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    return isValid;
}

async function submitForm(event) {
    event.preventDefault();
    
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        placeOfBirth: document.getElementById('placeOfBirth').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        nationality: document.getElementById('nationality').value,
        maritalStatus: document.getElementById('maritalStatus').value,
        settlementCamp: document.getElementById('settlementCamp').value,
        dateOfJoining: document.getElementById('dateOfJoining').value
    };
    
    if (!validateForm(formData)) {
        return;
    }
    
    try {
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        const response = await fetch('http://localhost:5000/api/beneficiaries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            const alert = document.getElementById('successAlert');
            alert.style.display = 'block';
            
            setTimeout(() => {
                alert.style.display = 'none';
                resetFormToDefault();
            }, 3000);
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to connect to server. Make sure backend is running on port 5000!');
    } finally {
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.textContent = 'Register';
        submitBtn.disabled = false;
    }
}