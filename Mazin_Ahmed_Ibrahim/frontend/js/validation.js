const form=document.getElementById("form")
const globalError=document.getElementById("globalError")
const success=document.getElementById("successMessage")

const fields=[
"firstName",
"lastName",
"dob",
"placeOfBirth",
"nationality",
"maritalStatus",
"camp",
"joinDate"
]

function showError(input,message){

input.classList.add("input-error")
input.parentElement.querySelector(".error-message").textContent=message

}

function clearError(input){

input.classList.remove("input-error")
input.parentElement.querySelector(".error-message").textContent=""

}

form.addEventListener("submit",async function(e){

e.preventDefault()

let valid=true

globalError.style.display="none"
success.style.display="none"

fields.forEach(id=>{

const input=document.getElementById(id)

if(input.value.trim()===""){

showError(input,"This field is required")
valid=false

}else{

clearError(input)

}

})

if(!valid){

globalError.style.display="block"
return

}

const data={

firstName:firstName.value,
lastName:lastName.value,
placeOfBirth:placeOfBirth.value,
dateOfBirth:dob.value,
dateOfRegistration:new Date(),
nationality:nationality.value,
maritalStatus:maritalStatus.value,
settlementCamp:camp.value,
joinSettlementDate:joinDate.value

}

await fetch("http://localhost:5000/api/beneficiaries",{

method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)

})

success.style.display="block"

form.reset()

})