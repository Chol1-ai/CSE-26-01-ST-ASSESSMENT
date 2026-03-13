const formRegister = document.getElementById("form-register")
const fullName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const dateofbirth = document.getElementById("dateofbirth")
const placeofbirth = document.getElementById("placeofbirth")
const gender = document.getElementById("gender")
const nationality = document.getElementById("nationality")
const maritalStatus = document.getElementById("maritalStatus")
const settlementCamp = document.getElementById("settlementCamp")
const dateOfjoiningSettlement = document.getElementById("dateOfjoiningSettlement")

formRegister.addEventListener("submit",(e)=>{

    e.preventDefault()

    const registerUser = {
        fullname:fullName.value,
        lastName:lastName.value,
        dateofbirth:dateofbirth.value,
        placeofbirth:placeofbirth.value,
        gender:gender.value,
        nationality:nationality.value,
        maritalStatus:maritalStatus.value,
        settlementCamp:settlementCamp.value,
        dateOfjoiningSettlement:dateOfjoiningSettlement.value,
    }
})

