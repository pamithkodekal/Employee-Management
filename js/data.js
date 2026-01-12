let employees = JSON.parse(localStorage.getItem("employees")) || [];

function saveData() {
    localStorage.setItem("employees", JSON.stringify(employees));
}
