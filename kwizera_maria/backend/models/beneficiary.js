function validateBeneficiary(payload) {
  const errors = [];

  if (!payload.firstName || payload.firstName.trim().length < 2) {
    errors.push('First name must be at least 2 characters.');
  }
  if (!payload.lastName || payload.lastName.trim().length < 2) {
    errors.push('Last name must be at least 2 characters.');
  }
  if (!payload.placeOfBirth || payload.placeOfBirth.trim().length < 2) {
    errors.push('Place of birth must be at least 2 characters.');
  }
  if (!payload.dateOfBirth) {
    errors.push('Date of birth is required.');
  }
  if (!payload.dateOfJoining) {
    errors.push('Date of joining is required.');
  }
  if (payload.dateOfBirth) {
    const dob = new Date(payload.dateOfBirth);
    if (Number.isNaN(dob.getTime())) {
      errors.push('Date of birth is invalid.');
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (dob >= today) {
        errors.push('Date of birth must be before today.');
      }
    }
  }
  if (payload.dateOfJoining) {
    const doj = new Date(payload.dateOfJoining);
    if (Number.isNaN(doj.getTime())) {
      errors.push('Date of joining is invalid.');
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (doj <= today) {
        errors.push('Date of joining must be after today.');
      }
    }
  }

  return errors;
}

module.exports = {
  validateBeneficiary
};
