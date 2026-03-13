const form = document.getElementById("registrationForm");

form.addEventListener("submit", async function(e){

e.preventDefault();

const firstName = document.getElementById("firstName").value;
const lastName = document.getElementById("lastName").value;
const placeOfBirth = document.getElementById("placeOfBirth").value;

const dateOfBirth = new Date(document.getElementById("dateOfBirth").value);
const regDate = new Date(document.getElementById("registrationDate").value);
const joinDate = new Date(document.getElementById("joinDate").value);

if(firstName.length < 3 || lastName.length < 3 || placeOfBirth.length < 3){
alert("Names must have at least 3 characters");
return;
}

if(dateOfBirth >= regDate){
alert("Date of birth must be before registration date");
return;
}

if(joinDate <= regDate){
alert("Joining date must be after registration date");
return;
}

const data = {
firstName,
lastName,
placeOfBirth,
dateOfBirth: dateOfBirth,
dateOfRegistration: regDate,
dateOfJoiningCamp: joinDate
};

const response = await fetch("http://localhost:5000/api/register",{

method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(data)

});

if(response.ok){

document.getElementById("successAlert").classList.remove("hidden");
form.reset();

}

});

function closeAlert(){

document.getElementById("successAlert").classList.add("hidden");
document.getElementById("registrationForm").reset();

}

