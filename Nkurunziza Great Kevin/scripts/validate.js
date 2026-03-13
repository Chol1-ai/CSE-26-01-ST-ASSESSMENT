const API_URL = "http://localhost:3000";


const formRegister = document.querySelector(".form-section");

// Select fields
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const dateOfBirth = document.querySelector("#dateOfBirth");
const placeOfBirth = document.querySelector("#placeOfBirth");
const nationality = document.querySelector("#nationality");
const maritalStatus = document.querySelector("#maritalStatus"); 
const settlementCamp = document.querySelector("#settlementCamp");
const dateOfJoing = document.querySelector("#dateOfJoing");


formRegister.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {
        firstName: firstName.value,
        lastName: lastName.value,
        dateOfBirth: dateOfBirth.value,
        placeOfBirth: placeOfBirth.value,
        nationality: nationality.value,
        maritalStatus: maritalStatus.value,
        settlementCamp: settlementCamp.value,
        dateOfJoining: dateOfJoing.value,
    };

    console.log("Success!", formData);
});

async function regester() { 
    try {

    } catch (error) {

    }
}