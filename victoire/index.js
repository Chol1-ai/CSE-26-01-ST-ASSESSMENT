// Navigation between landing and registration
document.getElementById('register-nav-btn').addEventListener('click', () => {
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('registration-page').classList.remove('hidden');
});

const form = document.getElementById('refugee-form');
const alertBox = document.getElementById('success-alert');

// Form Submission Logic
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validate()) {
        alertBox.classList.remove('hidden');
        form.reset();
        resetStyles();
    }
});

// Reset logic on closing alert
document.getElementById('close-alert').addEventListener('click', () => {
    alertBox.classList.add('hidden');
    form.reset();
    resetStyles();
});

function validate() {
    let isValid = true;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // ignore time for comparisons

    // Required text fields (min 2 chars)
    ['firstName', 'lastName', 'pob'].forEach(id => {
        const el = document.getElementById(id);
        if (el.value.trim().length < 2) {
            applyError(el, "This field is required");
            isValid = false;
        } else {
            clearError(el);
        }
    });

    // Required selects
    ['nationality', 'maritalStatus', 'camp'].forEach(id => {
        const el = document.getElementById(id);
        if (!el.value) {
            applyError(el, "This field is required");
            isValid = false;
        } else {
            clearError(el);
        }
    });

    // Date Logic
    const dobInput = document.getElementById('dob');
    const dojInput = document.getElementById('doj');
    const dob = dobInput.value ? new Date(dobInput.value) : null;
    const doj = dojInput.value ? new Date(dojInput.value) : null;

    // Registration date is today: DOB must be before today
    if (!dob || dob >= today) {
        applyError(dobInput, "Date of birth must be before today");
        isValid = false;
    } else {
        clearError(dobInput);
    }

    // Joining camp date must be after registration date (today)
    if (!doj || doj <= today) {
        applyError(dojInput, "Joining date must be after today");
        isValid = false;
    } else {
        clearError(dojInput);
    }

    return isValid;
}

function applyError(el, msg) {
    el.classList.add('invalid-border');
    el.nextElementSibling.innerText = msg;
}

function clearError(el) {
    el.classList.remove('invalid-border');
    el.nextElementSibling.innerText = "";
}

function resetStyles() {
    document.querySelectorAll('.invalid-border').forEach(el => el.classList.remove('invalid-border'));
    document.querySelectorAll('.error-text').forEach(el => el.innerText = "");
}
