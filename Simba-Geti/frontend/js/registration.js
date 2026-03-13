

const API_URL = 'http://localhost:5000/api/beneficiaries';

const dirtyFields = new Set();


/*DATE INPUT AUTO-FORMATTER  -  YYYY / MM / DD */
function attachDateFormatter(inputId) {
  const input = document.getElementById(inputId);
  input.addEventListener('input', function () {
    let digits    = this.value.replace(/[^0-9]/g, '').slice(0, 8);
    let formatted = '';

    if (digits.length <= 4) {
      formatted = digits;
    } else if (digits.length <= 6) {
      formatted = digits.slice(0, 4) + ' / ' + digits.slice(4);
    } else {
      formatted = digits.slice(0, 4) + ' / ' + digits.slice(4, 6) + ' / ' + digits.slice(6, 8);
    }

    this.value = formatted;

    if (dirtyFields.has(inputId)) {
      revalidateField(inputId);
    }
  });
}

attachDateFormatter('dateOfBirth');
attachDateFormatter('dateOfJoiningCamp');


function parseFormattedDate(value) {
  const digits = value.replace(/[^0-9]/g, '');
  if (digits.length < 8) return null;

  const yyyy = parseInt(digits.slice(0, 4), 10);
  const mm   = parseInt(digits.slice(4, 6), 10);
  const dd   = parseInt(digits.slice(6, 8), 10);

  if (yyyy < 1900 || yyyy > 2200) return null;
  if (mm < 1 || mm > 12)          return null;
  if (dd < 1 || dd > 31)          return null;

  const d = new Date(Date.UTC(yyyy, mm - 1, dd));

  if (
    d.getUTCFullYear() !== yyyy ||
    d.getUTCMonth()    !== mm - 1 ||
    d.getUTCDate()     !== dd
  ) return null;

  return d;
}


function getTodayUTC() {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
}


function setInvalid(fieldId, errId, message) {
  const field = document.getElementById(fieldId);
  const err   = document.getElementById(errId);
  if (field) { field.classList.remove('valid'); field.classList.add('invalid'); }
  if (err)   err.textContent = message;
  dirtyFields.add(fieldId);
}

function setValid(fieldId, errId) {
  const field = document.getElementById(fieldId);
  const err   = document.getElementById(errId);
  if (field) { field.classList.remove('invalid'); field.classList.add('valid'); }
  if (err)   err.textContent = '';
  dirtyFields.delete(fieldId);
}

function setDefault(fieldId, errId) {
  const field = document.getElementById(fieldId);
  const err   = document.getElementById(errId);
  if (field) { field.classList.remove('invalid', 'valid'); }
  if (err)   err.textContent = '';
  dirtyFields.delete(fieldId);
}



function revalidateField(fieldId) {
  const today = getTodayUTC();

  switch (fieldId) {

    case 'firstName': {
      const v = document.getElementById('firstName').value.trim();
      if (!v)          setInvalid('firstName', 'firstNameErr', 'This field is required');
      else if (v.length < 2) setInvalid('firstName', 'firstNameErr', 'Invalid field');
      else             setValid('firstName', 'firstNameErr');
      break;
    }

    case 'lastName': {
      const v = document.getElementById('lastName').value.trim();
      if (!v)          setInvalid('lastName', 'lastNameErr', 'This field is required');
      else if (v.length < 2) setInvalid('lastName', 'lastNameErr', 'Invalid field');
      else             setValid('lastName', 'lastNameErr');
      break;
    }

    case 'placeOfBirth': {
      const v = document.getElementById('placeOfBirth').value.trim();
      if (!v)          setInvalid('placeOfBirth', 'placeOfBirthErr', 'This field is required');
      else if (v.length < 2) setInvalid('placeOfBirth', 'placeOfBirthErr', 'Invalid field');
      else             setValid('placeOfBirth', 'placeOfBirthErr');
      break;
    }

    case 'dateOfBirth': {
      const raw = document.getElementById('dateOfBirth').value.trim();
      const d   = parseFormattedDate(raw);
      if (!raw)   setInvalid('dateOfBirth', 'dateOfBirthErr', 'This field is required');
      else if (!d || d >= today) setInvalid('dateOfBirth', 'dateOfBirthErr', 'Invalid field');
      else        setValid('dateOfBirth', 'dateOfBirthErr');
      break;
    }

    case 'dateOfJoiningCamp': {
      const raw = document.getElementById('dateOfJoiningCamp').value.trim();
      const d   = parseFormattedDate(raw);
      if (!raw)         setInvalid('dateOfJoiningCamp', 'dateOfJoiningCampErr', 'This field is required');
      else if (!d || d <= today) setInvalid('dateOfJoiningCamp', 'dateOfJoiningCampErr', 'Invalid field');
      else              setValid('dateOfJoiningCamp', 'dateOfJoiningCampErr');
      break;
    }

    case 'nationality': {
      const v = document.getElementById('nationality').value;
      if (!v) setInvalid('nationality', 'nationalityErr', 'This field is required');
      else    setValid('nationality', 'nationalityErr');
      break;
    }

    case 'maritalStatus': {
      const v = document.getElementById('maritalStatus').value;
      if (!v) setInvalid('maritalStatus', 'maritalStatusErr', 'This field is required');
      else    setValid('maritalStatus', 'maritalStatusErr');
      break;
    }

    case 'settlementCamp': {
      const v = document.getElementById('settlementCamp').value;
      if (!v) setInvalid('settlementCamp', 'settlementCampErr', 'This field is required');
      else    setValid('settlementCamp', 'settlementCampErr');
      break;
    }
  }
}



['firstName', 'lastName', 'placeOfBirth'].forEach(function (id) {
  document.getElementById(id).addEventListener('input', function () {
    if (dirtyFields.has(id)) revalidateField(id);
  });
});

['nationality', 'maritalStatus', 'settlementCamp'].forEach(function (id) {
  document.getElementById(id).addEventListener('change', function () {
    if (this.value) this.classList.add('has-value');
    if (dirtyFields.has(id)) revalidateField(id);
  });
});



function validateForm() {
  let isValid = true;
  const today = getTodayUTC();

  
  const firstName = document.getElementById('firstName').value.trim();
  if (!firstName) {
    setInvalid('firstName', 'firstNameErr', 'This field is required'); isValid = false;
  } else if (firstName.length < 2) {
    setInvalid('firstName', 'firstNameErr', 'Invalid field'); isValid = false;
  } else {
    setValid('firstName', 'firstNameErr');
  }

  
  const lastName = document.getElementById('lastName').value.trim();
  if (!lastName) {
    setInvalid('lastName', 'lastNameErr', 'This field is required'); isValid = false;
  } else if (lastName.length < 2) {
    setInvalid('lastName', 'lastNameErr', 'Invalid field'); isValid = false;
  } else {
    setValid('lastName', 'lastNameErr');
  }

  
  const dobRaw = document.getElementById('dateOfBirth').value.trim();
  const dob    = parseFormattedDate(dobRaw);
  if (!dobRaw) {
    setInvalid('dateOfBirth', 'dateOfBirthErr', 'This field is required'); isValid = false;
  } else if (!dob || dob >= today) {
    setInvalid('dateOfBirth', 'dateOfBirthErr', 'Invalid field'); isValid = false;
  } else {
    setValid('dateOfBirth', 'dateOfBirthErr');
  }

  
  const placeOfBirth = document.getElementById('placeOfBirth').value.trim();
  if (!placeOfBirth) {
    setInvalid('placeOfBirth', 'placeOfBirthErr', 'This field is required'); isValid = false;
  } else if (placeOfBirth.length < 2) {
    setInvalid('placeOfBirth', 'placeOfBirthErr', 'Invalid field'); isValid = false;
  } else {
    setValid('placeOfBirth', 'placeOfBirthErr');
  }

  
  const nationality = document.getElementById('nationality').value;
  if (!nationality) {
    setInvalid('nationality', 'nationalityErr', 'This field is required'); isValid = false;
  } else {
    setValid('nationality', 'nationalityErr');
  }

  
  const maritalStatus = document.getElementById('maritalStatus').value;
  if (!maritalStatus) {
    setInvalid('maritalStatus', 'maritalStatusErr', 'This field is required'); isValid = false;
  } else {
    setValid('maritalStatus', 'maritalStatusErr');
  }

  
  const settlementCamp = document.getElementById('settlementCamp').value;
  if (!settlementCamp) {
    setInvalid('settlementCamp', 'settlementCampErr', 'This field is required'); isValid = false;
  } else {
    setValid('settlementCamp', 'settlementCampErr');
  }

  
  const campRaw  = document.getElementById('dateOfJoiningCamp').value.trim();
  const campDate = parseFormattedDate(campRaw);
  if (!campRaw) {
    setInvalid('dateOfJoiningCamp', 'dateOfJoiningCampErr', 'This field is required'); isValid = false;
  } else if (!campDate || campDate <= today) {
    setInvalid('dateOfJoiningCamp', 'dateOfJoiningCampErr', 'Invalid field'); isValid = false;
  } else {
    setValid('dateOfJoiningCamp', 'dateOfJoiningCampErr');
  }

  return isValid;
}



function resetForm() {
  ['firstName', 'lastName', 'dateOfBirth', 'placeOfBirth', 'dateOfJoiningCamp'].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) { el.value = ''; el.classList.remove('valid', 'invalid'); }
  });

  document.getElementById('genderFemale').checked = true;
  document.getElementById('genderMale').checked   = false;

  ['nationality', 'maritalStatus', 'settlementCamp'].forEach(function (id) {
    const sel = document.getElementById(id);
    sel.value = '';
    sel.classList.remove('has-value', 'valid', 'invalid');
  });

  ['firstNameErr', 'lastNameErr', 'dateOfBirthErr', 'placeOfBirthErr',
   'nationalityErr', 'maritalStatusErr', 'settlementCampErr', 'dateOfJoiningCampErr'].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });

  dirtyFields.clear();
}



function showSuccessAlert() {
  const alert = document.getElementById('successAlert');
  alert.style.display = 'flex';
  alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

document.getElementById('closeAlert').addEventListener('click', function () {
  document.getElementById('successAlert').style.display = 'none';
  resetForm();
});



document.getElementById('registerBtn').addEventListener('click', async function () {
  if (!validateForm()) return;

  const gender   = document.querySelector('input[name="gender"]:checked').value;
  const dob      = parseFormattedDate(document.getElementById('dateOfBirth').value);
  const campDate = parseFormattedDate(document.getElementById('dateOfJoiningCamp').value);

  const payload = {
    firstName        : document.getElementById('firstName').value.trim(),
    lastName         : document.getElementById('lastName').value.trim(),
    dateOfBirth      : dob.toISOString().split('T')[0],
    placeOfBirth     : document.getElementById('placeOfBirth').value.trim(),
    gender           : gender,
    nationality      : document.getElementById('nationality').value,
    maritalStatus    : document.getElementById('maritalStatus').value,
    settlementCamp   : document.getElementById('settlementCamp').value,
    dateOfJoiningCamp: campDate.toISOString().split('T')[0]
  };

  try {
    const response = await fetch(API_URL, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok && data.success) {
      resetForm();
      showSuccessAlert();
    } else {
      const fieldMap = {
        firstName        : ['firstName',         'firstNameErr'],
        lastName         : ['lastName',          'lastNameErr'],
        dateOfBirth      : ['dateOfBirth',        'dateOfBirthErr'],
        placeOfBirth     : ['placeOfBirth',       'placeOfBirthErr'],
        nationality      : ['nationality',        'nationalityErr'],
        maritalStatus    : ['maritalStatus',      'maritalStatusErr'],
        settlementCamp   : ['settlementCamp',     'settlementCampErr'],
        dateOfJoiningCamp: ['dateOfJoiningCamp',  'dateOfJoiningCampErr']
      };

      if (data.errors) {
        Object.entries(data.errors).forEach(function ([key, msg]) {
          if (fieldMap[key]) setInvalid(fieldMap[key][0], fieldMap[key][1], msg);
        });
      } else {
        alert('Registration failed: ' + (data.message || 'Unknown error'));
      }
    }

  } catch (error) {
    console.error('Network error:', error);
    alert('Cannot connect to the server.\nMake sure the backend is running on port 5000.');
  }
});