const form = document.getElementById('beneficiaryForm');
const inputs = document.querySelectorAll('.form__input, .form__select');
const successAlert = document.getElementById('successAlert');
const closeAlert = document.getElementById('closeAlert');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isFormValid = true;

    // 1. Reset visual states
    inputs.forEach(input => {
        input.style.borderColor = '#ccc'; // Default color
        const errorText = input.parentElement.querySelector('.error-message');
        if (errorText) errorText.style.display = 'none';
    });

    // 2. Data Collection
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const today = new Date();

    // Normalize date strings into a parseable form (YYYY-MM-DD)
    const normalizeDate = (value) => {
        if (!value) return null;
        const iso = value.trim().replace(/\//g, '-');
        const date = new Date(iso);
        return Number.isNaN(date.getTime()) ? null : date;
    };

    // 3. Validation Rules
    const setError = (id, message) => {
        const field = document.getElementById(id);
        field.style.borderColor = 'red';
        // Assuming you have a small span or div with class 'error-message' under each input
        const errorSpan = field.parentElement.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.style.display = 'block';
        }
        isFormValid = false;
    };

    // Name & Place of Birth: Required + Min 2 characters
    if (!data.firstName.trim()) setError('firstName', 'This field is required');
    else if (data.firstName.length < 2) setError('firstName', 'Invalid field');

    if (!data.lastName.trim()) setError('lastName', 'This field is required');
    else if (data.lastName.length < 2) setError('lastName', 'Invalid field');

    if (!data.placeOfBirth.trim()) setError('placeOfBirth', 'This field is required');
    else if (data.placeOfBirth.length < 2) setError('placeOfBirth', 'Invalid field');

    // Date of Birth: Must be a valid date and before today
    const dobDate = normalizeDate(data.dob);
    if (!data.dob.trim()) setError('dob', 'This field is required');
    else if (!dobDate) setError('dob', 'Invalid date');
    else if (dobDate >= today) setError('dob', 'Date must be in the past');

    // Date of Joining: Must be a valid date and after date of birth
    const joiningDate = normalizeDate(data.joiningDate);
    if (!data.joiningDate.trim()) setError('joiningDate', 'This field is required');
    else if (!joiningDate) setError('joiningDate', 'Invalid date');
    else if (dobDate && joiningDate <= dobDate) setError('joiningDate', 'Must be after date of birth');

    // Select Fields
    if (!data.nationality) setError('nationality', 'This field is required');
    if (!data.maritalStatus) setError('maritalStatus', 'This field is required');
    if (!data.settlementCamp) setError('settlementCamp', 'This field is required');

    // 4. Submission
    if (isFormValid) {
        // Show success toast
        successAlert.style.display = 'flex';
        setTimeout(() => {
            successAlert.style.display = 'none';
        }, 3000);

        // Reset fields and borders immediately
        form.reset();
        inputs.forEach(input => input.style.borderColor = '#28a745'); // Green for success
    }
});

// 5. Close the success toast
closeAlert.addEventListener('click', () => {
    successAlert.style.display = 'none';
});
