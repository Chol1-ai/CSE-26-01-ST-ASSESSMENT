// Navigation
function showRegistration() {
  document.getElementById('landing-page').style.display = 'none';
  document.getElementById('registration-page').style.display = 'block';
}


// Date Parser
function parseDate(str) {

  const clean = str.replace(/\s/g, '').replace(/-/g, '/');
  const parts = clean.split('/');

  if (parts.length !== 3) return null;

  const y = Number(parts[0]);
  const m = Number(parts[1]);
  const d = Number(parts[2]);

  if (!y || !m || !d) return null;

  const dt = new Date(y, m - 1, d);

  if (
    dt.getFullYear() !== y ||
    dt.getMonth() !== m - 1 ||
    dt.getDate() !== d
  ) return null;

  return dt;
}


// Error Helpers
function setError(id, msg) {

  const el = document.getElementById(id);
  const err = document.getElementById('err-' + id);

  el.classList.add('error');
  el.classList.remove('valid');

  if (err) err.textContent = msg;
}

function setValid(id) {

  const el = document.getElementById(id);
  const err = document.getElementById('err-' + id);

  el.classList.remove('error');
  el.classList.add('valid');

  if (err) err.textContent = '';
}

function clearError(id) {

  const el = document.getElementById(id);
  const err = document.getElementById('err-' + id);

  el.classList.remove('error', 'valid');

  if (err) err.textContent = '';
}


// Validation
function validateForm() {

  let valid = true;

  const today = new Date();
  today.setHours(0,0,0,0);


  // First Name
  const fn = document.getElementById('firstName').value.trim();

  if (!fn) {
    setError('firstName','This field is required');
    valid = false;
  }
  else if (fn.length < 2) {
    setError('firstName','Invalid field');
    valid = false;
  }
  else setValid('firstName');


  // Last Name
  const ln = document.getElementById('lastName').value.trim();

  if (!ln) {
    setError('lastName','This field is required');
    valid = false;
  }
  else if (ln.length < 2) {
    setError('lastName','Invalid field');
    valid = false;
  }
  else setValid('lastName');


  // Date of Birth
  const dobStr = document.getElementById('dob').value.trim();
  const dob = parseDate(dobStr);

  if (!dobStr) {
    setError('dob','This field is required');
    valid = false;
  }
  else if (!dob) {
    setError('dob','Invalid field');
    valid = false;
  }
  else if (dob >= today) {
    setError('dob','Invalid field');
    valid = false;
  }
  else setValid('dob');


  // Place of Birth
  const pob = document.getElementById('placeOfBirth').value.trim();

  if (!pob) {
    setError('placeOfBirth','This field is required');
    valid = false;
  }
  else if (pob.length < 2) {
    setError('placeOfBirth','Invalid field');
    valid = false;
  }
  else setValid('placeOfBirth');


  // Nationality
  const nat = document.getElementById('nationality').value;

  if (!nat) {
    setError('nationality','This field is required');
    valid = false;
  }
  else setValid('nationality');


  // Marital Status
  const ms = document.getElementById('maritalStatus').value;

  if (!ms) {
    setError('maritalStatus','This field is required');
    valid = false;
  }
  else setValid('maritalStatus');


  // Settlement Camp
  const sc = document.getElementById('settlementCamp').value;

  if (!sc) {
    setError('settlementCamp','This field is required');
    valid = false;
  }
  else setValid('settlementCamp');


  // Join Date
  const jdStr = document.getElementById('joinDate').value.trim();
  const jd = parseDate(jdStr);

  if (!jdStr) {
    setError('joinDate','This field is required');
    valid = false;
  }
  else if (!jd) {
    setError('joinDate','Invalid field');
    valid = false;
  }
  else if (jd <= today) {
    setError('joinDate','Must be after registration date');
    valid = false;
  }
  else setValid('joinDate');

  return valid;
}


// Submission (CONNECTED TO BACKEND)
async function submitForm() {

  if (!validateForm()) return;

  const data = {

    firstName: document.getElementById('firstName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    dob: document.getElementById('dob').value.trim(),
    placeOfBirth: document.getElementById('placeOfBirth').value.trim(),
    gender: document.querySelector('input[name="gender"]:checked').value,
    nationality: document.getElementById('nationality').value,
    maritalStatus: document.getElementById('maritalStatus').value,
    settlementCamp: document.getElementById('settlementCamp').value,
    joinDate: document.getElementById('joinDate').value.trim()

  };

  try {

    const response = await fetch("http://localhost:5000/api/beneficiaries", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(data)

    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.message);

    resetFieldsToDefault();
    showSuccessAlert();

  }

  catch (error) {

    console.error("Submission error:", error);

    alert("Failed to register beneficiary. Please try again.");

  }

}


// Reset
function resetFieldsToDefault() {

  const inputs = ['firstName','lastName','dob','placeOfBirth','joinDate'];

  inputs.forEach(id => {

    const el = document.getElementById(id);
    el.value = '';
    el.classList.remove('error','valid');

    const err = document.getElementById('err-'+id);
    if (err) err.textContent = '';

  });

  const selects = ['nationality','maritalStatus','settlementCamp'];

  selects.forEach(id => {

    const el = document.getElementById(id);
    el.value = '';
    el.classList.remove('error','valid');

    const err = document.getElementById('err-'+id);
    if (err) err.textContent = '';

  });

  document.getElementById('genderFemale').checked = true;
}


// Success Alert
function showSuccessAlert() {

  const alert = document.getElementById('success-alert');

  alert.classList.remove('show');

  setTimeout(() => {
    alert.classList.add('show');
  },10);
}


function closeSuccessAlert() {

  document.getElementById('success-alert').classList.remove('show');

  resetFieldsToDefault();
}