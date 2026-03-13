document.getElementById("form").addEventListener("submit", function(event) {
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let dob = document.getElementById("dob").value;
    let nationality = document.getElementById("nationality").value;
    let maritalStatus = document.getElementById("maritalStatus").value;
    let settlementCamp = document.getElementById("settlementCamp").value;
    let joiningDate = document.getElementById("joiningDate").value;
    if(fname === ""){
        alert("first name is required");
        event.preventDefault();
       return;
    }
    if(lname === ""){
        alert("last name is required");
        event.preventDefault();
       return;
    }else{
        alert("first name and last name are valid");
    }
    if(dob === ""){
        alert("date of birth is required");
        event.preventDefault();
       return;
    }else{
        alert("date of birth is valid");
    }
    if(nationality === ""){
        alert("nationality is required");
        event.preventDefault();
       return;
    }else{
        alert("nationality is valid");
    }
    if(maritalStatus === ""){
        alert("marital status is required");
        event.preventDefault();
       return;
    }else{
        alert("marital status is valid");
    }
    if(settlementCamp === ""){
        alert("settlement camp is required");
        event.preventDefault();
       return;
    }else{
        alert("settlement camp is valid");
    }
    if(joiningDate === ""){
        alert("joining date is required");
        event.preventDefault();
       return;
    }else{
        alert("joining date is valid");
    }
    alert("form submitted successfully");
});
const open = document.querySelector("button");
open.addEventListener("click", function() {
    window.open("form.html");
});