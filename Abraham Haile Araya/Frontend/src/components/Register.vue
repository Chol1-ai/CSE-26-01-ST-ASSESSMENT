<template>
  <div class="registration-container">
    <div class="sidebar">
      <div class="logo-section">
        <div class="logo-circle">
          <div class="logo-text">FCA</div>
        </div>
        <p class="program-title">Refugee Support Program</p>
      </div>
    </div>

    <div class="form-section">
      <h2 class="form-title">BENEFICIARY REGISTRATION FORM</h2>

      <Transition name="fade">
        <div v-if="successMessage" class="success-banner">
          <span>Beneficiary registered successfully</span>
          <button @click="closeSuccess" class="close-banner">&times;</button>
        </div>
      </Transition>

      <form @submit.prevent="handleRegister" class="beneficiary-form">
        <div class="form-group row">
          <div class="input-half">
            <label>First Name <span class="required">*</span></label>
            <input
              type="text"
              v-model="form.firstName"
              :class="getFieldClasses('firstName')"
              placeholder="Enter your First name"
            />
            <span v-if="getErrorMessage('firstName')" class="error-text">{{
              getErrorMessage("firstName")
            }}</span>
          </div>
          <div class="input-half">
            <label>Last name <span class="required">*</span></label>
            <input
              type="text"
              v-model="form.lastName"
              :class="getFieldClasses('lastName')"
              placeholder="Enter your Last name"
            />
            <span v-if="getErrorMessage('lastName')" class="error-text">{{
              getErrorMessage("lastName")
            }}</span>
          </div>
        </div>

        <div class="form-group row">
          <div class="input-half">
            <label>Date of birth <span class="required">*</span></label>
            <input
              type="text"
              v-model="form.dob"
              :class="getFieldClasses('dob')"
              placeholder="YYYY / MM / DD"
            />
            <span v-if="getErrorMessage('dob')" class="error-text">{{
              getErrorMessage("dob")
            }}</span>
          </div>
          <div class="input-half">
            <label>Place of Birth <span class="required">*</span></label>
            <input
              type="text"
              v-model="form.pob"
              :class="getFieldClasses('pob')"
              placeholder="Enter your place of residence"
            />
            <span v-if="getErrorMessage('pob')" class="error-text">{{
              getErrorMessage("pob")
            }}</span>
          </div>
        </div>

        <div class="form-group gender-group">
          <label>Gender</label>
          <div class="gender-radio">
            <label
              ><input type="radio" v-model="form.gender" value="male" />
              Male</label
            >
            <label
              ><input type="radio" v-model="form.gender" value="female" />
              Female</label
            >
          </div>
        </div>

        <div class="form-group row">
          <div class="input-half">
            <label>Nationality <span class="required">*</span></label>
            <select
              v-model="form.nationality"
              :class="getFieldClasses('nationality')"
            >
              <option value="">-- Select Nationality --</option>
              <option value="Ugandan">Ugandan</option>
            </select>
            <span v-if="getErrorMessage('nationality')" class="error-text">{{
              getErrorMessage("nationality")
            }}</span>
          </div>
          <div class="input-half">
            <label>Marital status <span class="required">*</span></label>
            <select
              v-model="form.maritalStatus"
              :class="getFieldClasses('maritalStatus')"
            >
              <option value="">-- Select Marital status --</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
            <span v-if="getErrorMessage('maritalStatus')" class="error-text">{{
              getErrorMessage("maritalStatus")
            }}</span>
          </div>
        </div>

        <div class="form-group row">
          <div class="input-half">
            <label>Settlement camp <span class="required">*</span></label>
            <select v-model="form.camp" :class="getFieldClasses('camp')">
              <option value="">-- Select settlement camp --</option>
              <option value="Arua">Arua Settlement camp</option>
            </select>
            <span v-if="getErrorMessage('camp')" class="error-text">{{
              getErrorMessage("camp")
            }}</span>
          </div>
          <div class="input-half">
            <label
              >Date of joining Settlement camp
              <span class="required">*</span></label
            >
            <input
              type="text"
              v-model="form.joinDate"
              :class="getFieldClasses('joinDate')"
              placeholder="YYYY / MM / DD"
            />
            <span v-if="getErrorMessage('joinDate')" class="error-text">{{
              getErrorMessage("joinDate")
            }}</span>
          </div>
        </div>

        <button type="submit" class="register-button">Register</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const submitted = ref(false);
const successMessage = ref(false);

const initialState = {
  firstName: "",
  lastName: "",
  dob: "",
  pob: "",
  gender: "male",
  nationality: "",
  maritalStatus: "",
  camp: "",
  joinDate: "",
};

const form = reactive({ ...initialState });

// Validation helper
const getErrorMessage = (field) => {
  if (!submitted.value || successMessage.value) return null;
  const val = form[field];
  if (!val || val.trim() === "") return "This field is required";
  if (val.length === 1) return "Invalid field";
  return null;
};

// Dynamic Class handler to match your state transitions
const getFieldClasses = (field) => {
  // If registration was successful, remove all highlight borders
  if (successMessage.value) return "";

  const error = getErrorMessage(field);
  if (submitted.value && error) return "error-border";
  if (form[field] && form[field].length > 1) return "valid-border";

  return "";
};

const handleRegister = () => {
  const allFieldsFilled = Object.keys(form).every(
    (key) => form[key].length > 1,
  );

  if (allFieldsFilled) {
    successMessage.value = true;
    submitted.value = false;
  } else {
    submitted.value = true;
    successMessage.value = false;
  }
};

const closeSuccess = () => {
  successMessage.value = false;
  // Reset all fields to empty
  Object.assign(form, initialState);
  submitted.value = false;
};
</script>

<style scoped>
.registration-container {
  display: flex;
  height: 100vh;
  font-family: "Arial", sans-serif;
}

/* Sidebar */
.sidebar {
  width: 44%;
  background-color: #99cc33;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.logo-circle {
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.logo-text {
  background-color: #99cc33;
  color: white;
  font-size: 55px;
  font-weight: 900;
  padding: 15px 35px;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
}
.program-title {
  color: white;
  font-size: 32px;
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
}

/* Form Section */
.form-section {
  width: 56%;
  padding: 40px 60px;
  overflow-y: auto;
}
.form-title {
  font-family: "Courier New", Courier, monospace;
  font-size: 34px;
  color: #2e5d32;
  text-align: center;
  margin-bottom: 30px;
}

/* Success Banner */
.success-banner {
  background-color: #00a65a;
  color: white;
  padding: 12px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
}
.close-banner {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

/* Layout Grid */
.form-group {
  margin-bottom: 20px;
}
.row {
  display: flex;
  gap: 20px;
}
.input-half {
  width: 50%;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 5px;
}
.required {
  color: red;
}

input,
select {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 2px;
  font-size: 14px;
  outline: none;
}
.register-button {
  /* Colors */
  background-color: #99cc33; /* The main lime green */
  color: white;
  
  /* Typography */
  font-size: 24px;
  font-weight: 500;
  
  /* Sizing & Layout */
  width: 100%;
  padding: 14px 0;
  margin-top: 25px;
  
  /* Borders & Shape */
  border: none;
  border-radius: 8px; /* Smooth rounded corners */
  
  /* Shadow - This gives it the "lifted" look from your image */
  box-shadow: 0px 4px 0px 0px #76a028; /* Darker green bottom border/shadow */
  
  /* Interaction */
  cursor: pointer;
  transition: all 0.1s ease;
  display: block;
}

/* Hover effect */
.register-button:hover {
  background-color: #a4d641;
}

/* When clicked, it "pushes down" */
.register-button:active {
  box-shadow: 0px 0px 0px 0px #76a028;
  transform: translateY(4px);
}

/* Border States */
.error-border {
  border: 1.5px solid red !important;
}
.valid-border {
  border: 1.5px solid #a4c639 !important;
}
.error-text {
  color: red;
  font-size: 12px;
  text-align: right;
  margin-top: 4px;
}

.gender-radio {
  display: flex;
  gap: 140px;
  border: 1px solid #ccc;
  padding: 12px;
}

.register-button {
  background-color: #99cc33;
  color: white;
  border: none;
  padding: 15px;
  width: 100%;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
