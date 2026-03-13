<script setup>
import { ref } from 'vue'
import logo from '../assets/fca-logo.jpg'

// Form state
const form = ref({
  firstName: '',
  lastName: '',
  dob: '',
  placeOfBirth: '',
  gender: '',
  nationality: '',
  maritalStatus: '',
  settlementDate: '',
  dateOfJoining: '',
  settlementCamp: '',
})

// Error state
const errors = ref({})

// Validation function
const validateForm = () => {
  errors.value = {}

  if (!form.value.firstName) errors.value.firstName = 'First name is required'
  if (!form.value.lastName) errors.value.lastName = 'Last name is required'
  if (!form.value.dob) errors.value.dob = 'Date of birth is required'
  if (!form.value.placeOfBirth) errors.value.placeOfBirth = 'Place of birth is required'
  if (!form.value.gender) errors.value.gender = 'Gender is required'
  if (!form.value.nationality) errors.value.nationality = 'Nationality is required'
  if (!form.value.maritalStatus) errors.value.maritalStatus = 'Marital status is required'
  if (!form.value.settlementDate) errors.value.settlementDate = 'Settlement date is required'
  if (!form.value.dateOfJoining) errors.value.dateOfJoining = 'Date of joining is required'
  if (!form.value.settlementCamp) errors.value.settlementCamp = 'Settlement camp is required'

  return Object.keys(errors.value).length === 0
}

// Form submission
const submitForm = async () => {
  if (!validateForm()) return

  try {
    const response = await fetch("http://localhost:5000/api/beneficiaries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form.value),
    })
    const data = await response.json()
    console.log("Server response:", data)
    alert("Beneficiary registered successfully!")

    // Reset form
    Object.keys(form.value).forEach(key => form.value[key] = '')
  } catch (error) {
    console.error("Error:", error)
    alert("Failed to register beneficiary.")
  }
}

// Options
const nationalities = ['Ugandan', 'Rwandan', 'Congolese', 'Burundian', 'Other']
const settlementCamps = ['Kampala', 'Nakivale', 'Oruchinga', 'Kyaka II', 'Palabek']
</script>

<template>
  <div class="register-container">
    <!-- Left Column -->
    <div class="left-column">
      <div class="overlay"></div>
      <img :src="logo" alt="FCA Logo" />
      <h1>Refugee Support Program</h1>
    </div>

    <!-- Right Column -->
    <div class="right-column">
      <form @submit.prevent="submitForm" class="registration-form">
        <h2 class="text-center mb-4">Beneficiary Registration Form</h2>

        <div class="row g-3">
          <!-- First Name -->
          <div class="col-md-6">
            <label class="form-label">First Name</label>
            <input v-model="form.firstName" type="text" class="form-control green-input" placeholder="Enter first name" />
            <small class="text-danger" v-if="errors.firstName">{{ errors.firstName }}</small>
          </div>

          <!-- Last Name -->
          <div class="col-md-6">
            <label class="form-label">Last Name</label>
            <input v-model="form.lastName" type="text" class="form-control green-input" placeholder="Enter last name" />
            <small class="text-danger" v-if="errors.lastName">{{ errors.lastName }}</small>
          </div>

          <!-- Date of Birth -->
          <div class="col-md-6">
            <label class="form-label">Date of Birth</label>
            <input v-model="form.dob" type="date" class="form-control green-input" />
            <small class="text-danger" v-if="errors.dob">{{ errors.dob }}</small>
          </div>

          <!-- Place of Birth -->
          <div class="col-md-6">
            <label class="form-label">Place of Birth</label>
            <input v-model="form.placeOfBirth" type="text" class="form-control green-input" placeholder="Enter place of birth" />
            <small class="text-danger" v-if="errors.placeOfBirth">{{ errors.placeOfBirth }}</small>
          </div>

          <!-- Gender (Radio Buttons) -->
          <div class="col-md-6">
            <label class="form-label d-block">Gender</label>
            <div class="form-check form-check-inline" v-for="option in ['Male', 'Female', 'Other']" :key="option">
              <input class="form-check-input" type="radio" :value="option" v-model="form.gender" />
              <label class="form-check-label">{{ option }}</label>
            </div>
            <small class="text-danger" v-if="errors.gender">{{ errors.gender }}</small>
          </div>

          <!-- Nationality (Select Dropdown) -->
          <div class="col-md-6">
            <label class="form-label">Nationality</label>
            <select v-model="form.nationality" class="form-select green-input">
              <option disabled value="">Select nationality</option>
              <option v-for="nation in nationalities" :key="nation">{{ nation }}</option>
            </select>
            <small class="text-danger" v-if="errors.nationality">{{ errors.nationality }}</small>
          </div>

          <!-- Marital Status -->
          <div class="col-md-6">
            <label class="form-label">Marital Status</label>
            <select v-model="form.maritalStatus" class="form-select green-input">
              <option disabled value="">Select status</option>
              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>
              <option>Widowed</option>
            </select>
            <small class="text-danger" v-if="errors.maritalStatus">{{ errors.maritalStatus }}</small>
          </div>

          <!-- Settlement Date -->
          <div class="col-md-6">
            <label class="form-label">Settlement Date</label>
            <input v-model="form.settlementDate" type="date" class="form-control green-input" />
            <small class="text-danger" v-if="errors.settlementDate">{{ errors.settlementDate }}</small>
          </div>

          <!-- Date of Joining -->
          <div class="col-md-6">
            <label class="form-label">Date of Joining</label>
            <input v-model="form.dateOfJoining" type="date" class="form-control green-input" />
            <small class="text-danger" v-if="errors.dateOfJoining">{{ errors.dateOfJoining }}</small>
          </div>

          <!-- Settlement Camp (Select Dropdown) -->
          <div class="col-md-6">
            <label class="form-label">Settlement Camp</label>
            <select v-model="form.settlementCamp" class="form-select green-input">
              <option disabled value="">Select camp</option>
              <option v-for="camp in settlementCamps" :key="camp">{{ camp }}</option>
            </select>
            <small class="text-danger" v-if="errors.settlementCamp">{{ errors.settlementCamp }}</small>
          </div>

          <!-- Submit Button -->
          <div class="col-12 mt-3">
            <button type="submit" class="btn btn-green w-100">Register</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Container */
.register-container {
  display: flex;
  min-height: 100vh;
  font-family: sans-serif;
}

/* Left column */
.left-column {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  background-color: rgb(153, 204, 50);
  padding: 2rem;
}

.left-column .overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(34, 139, 34, 0.5); 
}

.left-column img {
  width: 150px;
  height: 150px;
  z-index: 1;
  position: relative;
  margin-bottom: 1rem;
}

.left-column h1 {
  z-index: 1;
  position: relative;
}

/* Right column */
.right-column {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: #f8f9fa;
}

/* Form styling */
.registration-form {
  width: 100%;
  max-width: 500px;
}

/* Green themed inputs and selects */
.green-input {
  border: 2px solid rgb(153, 204, 50);
  box-shadow: 0 0 10px rgba(34, 139, 34, 0.3);
  border-radius: 5px;
}

.green-input:focus {
  border-color: #006400;
  box-shadow: 0 0 8px rgba(0, 100, 0, 0.5);
  outline: none;
}

/* Green button */
.btn-green {
  background-color: rgb(153, 204, 50);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(34, 139, 34, 0.5);
  transition: background 0.3s, box-shadow 0.3s;
}

.btn-green:hover {
  background-color: #006400;
  box-shadow: 0 6px 8px rgba(0, 100, 0, 0.7);
}

/* Error text */
.text-danger {
  font-size: 0.875rem;
}

.form-label{
color:rgb(56, 87, 35);
}
</style>