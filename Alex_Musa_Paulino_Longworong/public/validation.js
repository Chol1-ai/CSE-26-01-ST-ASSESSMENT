
const form = document.getElementById("registerForm");

const today = new Date();

function setError(input, message, errorId) {

    input.classList.add("invalid");
    document.getElementById(errorId).textContent = message;

}

function clearError(input, errorId) {

    input.classList.remove("invalid");
    document.getElementById(errorId).textContent = "";

}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    let valid = true;

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const placeOfBirth = document.getElementById("placeOfBirth");
    const dob = document.getElementById("dateOfBirth");
    const joining = document.getElementById("dateOfJoining");

    const nationality = document.getElementById("nationality");
    const maritalStatus = document.getElementById("maritalStatus");
    const settlement = document.getElementById("settlement");


    // FIRST NAME

    if (firstName.value.trim() === "") {

        setError(firstName, "This field is required", "firstNameError");
        valid = false;

    } else if (firstName.value.trim().length < 2) {

        setError(firstName, "Invalid field", "firstNameError");
        valid = false;

    } else {

        clearError(firstName, "firstNameError");

    }


    // LAST NAME

    if (lastName.value.trim() === "") {

        setError(lastName, "This field is required", "lastNameError");
        valid = false;

    } else if (lastName.value.trim().length < 2) {

        setError(lastName, "Invalid field", "lastNameError");
        valid = false;

    } else {

        clearError(lastName, "lastNameError");

    }


    // PLACE OF BIRTH

    if (placeOfBirth.value.trim() === "") {

        setError(placeOfBirth, "This field is required", "placeError");
        valid = false;

    } else if (placeOfBirth.value.trim().length < 2) {

        setError(placeOfBirth, "Invalid field", "placeError");
        valid = false;

    } else {

        clearError(placeOfBirth, "placeError");

    }


    // DATE OF BIRTH

    if (dob.value === "") {

        setError(dob, "This field is required", "dobError");
        valid = false;

    } else if (new Date(dob.value) >= today) {

        setError(dob, "Invalid field", "dobError");
        valid = false;

    } else {

        clearError(dob, "dobError");

    }


    // DATE OF JOINING

    if (joining.value === "") {

        setError(joining, "This field is required", "joiningError");
        valid = false;

    } else if (new Date(joining.value) > today) {
        
        setError(joining, "Invalid field", "joiningError");
        valid = false;

    } else {

        clearError(joining, "joiningError");

    }


    // SELECT FIELDS

    if (nationality.value === "") {

        setError(nationality, "This field is required", "nationalityError");
        valid = false;

    } else {

        clearError(nationality, "nationalityError");

    }

    if (maritalStatus.value === "") {

        setError(maritalStatus, "This field is required", "maritalError");
        valid = false;

    } else {

        clearError(maritalStatus, "maritalError");

    }

    if (settlement.value === "") {

        setError(settlement, "This field is required", "settlementError");
        valid = false;

    } else {

        clearError(settlement, "settlementError");

    }


    // STOP IF INVALID

    if (!valid) return;


    // SUBMIT DATA

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {

        const res = await fetch("/api/beneficiaries/register", {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)

        });

        if (res.ok) {

            document.getElementById("successAlert").style.display = "block";

        }

    } catch (err) {

        console.log(err);

    }

});


// CLOSE SUCCESS ALERT

document.getElementById("closeAlert").addEventListener("click", () => {

    form.reset();

    document.querySelectorAll(".invalid").forEach(el => {
        el.classList.remove("invalid");
    });

    document.querySelectorAll(".error-message").forEach(el => {
        el.textContent = "";
    });

    document.getElementById("successAlert").style.display = "none";

});