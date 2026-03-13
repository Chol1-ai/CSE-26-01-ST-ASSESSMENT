// Validation rules from Rules.txt.txt

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('beneficiaryForm');
    const successBar = document.getElementById('successBar');

    if (!form) {
        return;
    }

    if (successBar) {
        successBar.style.display = 'none';
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (validateForm()) {
            submitForm();
        }
    });

    const inputs = form.querySelectorAll('input, select');
    inputs.forEach((input) => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            const isDateField = input.id === 'dob' || input.id === 'joiningDate';
            if (isDateField && input.type !== 'date') {
                input.value = formatDateInput(input.value);
                const digits = input.value.replace(/\D/g, '');
                if (digits.length < 8) {
                    clearFieldState(input);
                    return;
                }
            }
            validateField(input);
        });
    });
});

function validateForm() {
    let isValid = true;

    if (!validateName(document.getElementById('firstName'))) isValid = false;
    if (!validateName(document.getElementById('lastName'))) isValid = false;
    if (!validateDob(document.getElementById('dob'))) isValid = false;
    if (!validateName(document.getElementById('pob'))) isValid = false;
    if (!validateSelect(document.getElementById('nationality'))) isValid = false;
    if (!validateSelect(document.getElementById('maritalStatus'))) isValid = false;
    if (!validateSelect(document.getElementById('settlementCamp'))) isValid = false;
    if (!validateJoiningDate(document.getElementById('joiningDate'))) isValid = false;

    return isValid;
}

function validateName(field) {
    const value = field.value.trim();
    const errorElement = document.getElementById(field.id + 'Error');

    if (value === '') {
        showError(field, errorElement, 'This field is required');
        return false;
    }

    if (value.length < 2) {
        showError(field, errorElement, 'Invalid field');
        return false;
    }

    showValid(field, errorElement);
    return true;
}

function validateDob(field) {
    const value = field.value.trim();
    const errorElement = document.getElementById(field.id + 'Error');

    if (!value) {
        showError(field, errorElement, 'This field is required');
        return false;
    }

    const dateValue = parseDate(value);
    if (!dateValue) {
        showError(field, errorElement, 'Invalid field');
        return false;
    }

    const today = getToday();
    if (dateValue >= today) {
        showError(field, errorElement, 'Invalid field');
        return false;
    }

    if (field.type !== 'date') {
        field.value = formatDateValue(dateValue);
    }
    showValid(field, errorElement);
    return true;
}

function validateJoiningDate(field) {
    const value = field.value.trim();
    const errorElement = document.getElementById(field.id + 'Error');

    if (!value) {
        showError(field, errorElement, 'This field is required');
        return false;
    }

    const dateValue = parseDate(value);
    if (!dateValue) {
        showError(field, errorElement, 'Invalid field');
        return false;
    }

    const today = getToday();
    if (dateValue <= today) {
        showError(field, errorElement, 'Invalid field');
        return false;
    }

    if (field.type !== 'date') {
        field.value = formatDateValue(dateValue);
    }
    showValid(field, errorElement);
    return true;
}

function validateSelect(field) {
    const value = field.value;
    const errorElement = document.getElementById(field.id + 'Error');

    if (!value) {
        showError(field, errorElement, 'This field is required');
        return false;
    }

    showValid(field, errorElement);
    return true;
}

function validateField(field) {
    const fieldId = field.id;

    switch (fieldId) {
        case 'firstName':
        case 'lastName':
        case 'pob':
            validateName(field);
            break;
        case 'dob':
            validateDob(field);
            break;
        case 'nationality':
        case 'maritalStatus':
        case 'settlementCamp':
            validateSelect(field);
            break;
        case 'joiningDate':
            validateJoiningDate(field);
            break;
        default:
            break;
    }
}

function showError(field, errorElement, message) {
    field.classList.remove('valid');
    field.classList.add('invalid');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function showValid(field, errorElement) {
    field.classList.remove('invalid');
    field.classList.add('valid');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function clearFieldState(field) {
    const errorElement = document.getElementById(field.id + 'Error');
    field.classList.remove('invalid', 'valid');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function showSuccessBar() {
    const bar = document.getElementById('successBar');
    if (bar) {
        bar.style.display = 'block';
    }
}

function setSuccessMessage(message) {
    const text = document.querySelector('#successBar .success-text');
    if (text) {
        text.textContent = message;
    }
}

function closeSuccessPopup() {
    const bar = document.getElementById('successBar');
    if (bar) {
        bar.style.display = 'none';
    }
    resetForm();
}

function resetForm() {
    const form = document.getElementById('beneficiaryForm');
    if (!form) {
        return;
    }

    form.reset();

    const inputs = form.querySelectorAll('input, select');
    inputs.forEach((input) => {
        input.classList.remove('valid', 'invalid');
    });

    const genderOptions = form.querySelector('.gender-options');
    if (genderOptions) {
        genderOptions.classList.remove('valid', 'invalid');
    }

    const errors = document.querySelectorAll('.field-error');
    errors.forEach((error) => {
        error.textContent = '';
    });

    const femaleRadio = form.querySelector('input[value="female"]');
    if (femaleRadio) {
        femaleRadio.checked = true;
    }
}

async function submitForm() {
    const form = document.getElementById('beneficiaryForm');
    if (!form) {
        return;
    }

    const payload = buildPayload();

    try {
        const response = await fetch('/api/beneficiaries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Failed to save data');
        }

        setSuccessMessage('Beneficiary registered successfully');
        showSuccessBar();
        resetForm();
    } catch (error) {
        setSuccessMessage('Could not save. Please check backend is running.');
        showSuccessBar();
    }
}

function buildPayload() {
    const dobValue = document.getElementById('dob').value.trim();
    const joiningValue = document.getElementById('joiningDate').value.trim();

    return {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        dateOfBirth: parseDate(dobValue),
        placeOfBirth: document.getElementById('pob').value.trim(),
        gender: document.querySelector('input[name="gender"]:checked')?.value || 'female',
        nationality: document.getElementById('nationality').value,
        maritalStatus: document.getElementById('maritalStatus').value,
        settlementCamp: document.getElementById('settlementCamp').value,
        dateOfJoining: parseDate(joiningValue)
    };
}

function parseDate(value) {
    const sanitized = value.replace(/\s+/g, '');
    const match = sanitized.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);

    if (!match) {
        return null;
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);

    if (month < 1 || month > 12) {
        return null;
    }

    const dateValue = new Date(year, month - 1, day);
    if (
        dateValue.getFullYear() !== year ||
        dateValue.getMonth() !== month - 1 ||
        dateValue.getDate() !== day
    ) {
        return null;
    }

    return dateValue;
}

function formatDateInput(value) {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 4) {
        return digits;
    }
    if (digits.length <= 6) {
        return `${digits.slice(0, 4)} / ${digits.slice(4)}`;
    }
    return `${digits.slice(0, 4)} / ${digits.slice(4, 6)} / ${digits.slice(6)}`;
}

function getToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}

function formatDateValue(dateValue) {
    const year = dateValue.getFullYear();
    const month = pad2(dateValue.getMonth() + 1);
    const day = pad2(dateValue.getDate());
    return `${year} / ${month} / ${day}`;
}

function pad2(value) {
    return String(value).padStart(2, '0');
}

