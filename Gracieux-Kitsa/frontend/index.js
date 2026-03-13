const regForm = document.getElementById("regForm");

regForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    let valid = true;

    function showError(id, msg) {

        const field = document.getElementById(id);
        const error = document.getElementById(id + "Error");

        field.classList.remove("success");
        field.classList.add("error");

        error.textContent = msg;

        valid = false;
    }

    function showSuccess(id) {

        const field = document.getElementById(id);
        const error = document.getElementById(id + "Error");

        field.classList.remove("error");
        field.classList.add("success");

        error.textContent = "";
    }

    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();
    const dob = document.getElementById("dateofbirth").value;
    const pob = document.getElementById("pofbirth").value.trim();
    const nationality = document.getElementById("nationality").value;
    const marital = document.getElementById("maritalstatus").value;
    const settlement = document.getElementById("settlement").value;
    const joining = document.getElementById("dateofjoining").value;

    const genderElement = document.querySelector('input[name="gender"]:checked');
    const gender = genderElement ? genderElement.value : "";

    if (!fname || fname.length < 2) showError("fname", "First name must be at least 2 characters"); else showSuccess("fname");
    if (!lname || lname.length < 2) showError("lname", "Last name must be at least 2 characters"); else showSuccess("lname");
    if (!dob) showError("dateofbirth", "Date of birth required"); else showSuccess("dateofbirth");
    if (!pob || pob.length < 2) showError("pofbirth", "Place of birth must be at least 2 characters"); else showSuccess("pofbirth");
    if (!nationality) showError("nationality", "Select nationality"); else showSuccess("nationality");
    if (!marital) showError("maritalstatus", "Select marital status"); else showSuccess("maritalstatus");
    if (!settlement) showError("settlement", "Select settlement"); else showSuccess("settlement");
    if (!joining) showError("dateofjoining", "Joining date required"); else showSuccess("dateofjoining");

    if (!gender) {
        document.getElementById("genderError").textContent = "Select gender";
        valid = false;
    } else {
        document.getElementById("genderError").textContent = "";
    }

    const now = new Date();
    const dobDate = dob ? new Date(dob) : null;
    const joiningDate = joining ? new Date(joining) : null;

    if (dobDate && !(dobDate.getTime() < now.getTime())) {
        showError("dateofbirth", "Date of birth must be before date of registration");
    }
    if (joiningDate && !(joiningDate.getTime() > now.getTime())) {
        showError("dateofjoining", "Date of joining must be after date of registration");
    }

    if (!valid) return;

    const formData = {
        fname,
        lname,
        dob,
        pob,
        gender,
        nationality,
        marital,
        settlement,
        joining
    };

    try {

        const response = await fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        const successAlert = document.getElementById("successAlert");
        const closeAlert = document.getElementById("closeAlert");

        if (response.ok) {
            successAlert.classList.remove("hidden");
            regForm.reset();
            ["fname","lname","dateofbirth","pofbirth","nationality","maritalstatus","settlement","dateofjoining"].forEach(id=>{
                const el = document.getElementById(id);
                el.classList.remove("error");
                el.classList.remove("success");
            });
        } else {
            const msg = data && data.message ? data.message : "Submission failed";
            alert(msg);
        }

        closeAlert.onclick = function(){
            successAlert.classList.add("hidden");
            regForm.reset();
            ["fname","lname","dateofbirth","pofbirth","nationality","maritalstatus","settlement","dateofjoining"].forEach(id=>{
                const el = document.getElementById(id);
                el.classList.remove("error");
                el.classList.remove("success");
            });
            ["fnameError","lnameError","dateofbirthError","pofbirthError","genderError","nationalityError","maritalstatusError","settlementError","dateofjoiningError"].forEach(id=>{
                const el = document.getElementById(id);
                if (el) el.textContent = "";
            });
        }

    } catch (error) {

        console.error(error);
        alert("Server error");

    }

});
