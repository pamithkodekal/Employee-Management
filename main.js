let Name, empid, intime, outtime, empDay; // declare globally

function Submit() {
    Name = document.getElementById("Empname").value;
    empid = document.getElementsByClassName("EmpID")[0].value;
    empDate = document.getElementsByClassName("Date")[0].value;
    intime = document.getElementsByClassName("Checkin")[0].value;
    outtime = document.getElementsByClassName("Checkout")[0].value;

    console.log(name, empid, empDate, intime, outtime);
}

function calculateSalary() {
    if (!intime || !outtime) {
        alert("Please submit the form first!");
        return;
    }

    let salary = 0;

    const [inH, inM] = intime.split(":").map(Number);
    const [outH, outM] = outtime.split(":").map(Number);

    const inMinutes = inH * 60 + inM;
    const outMinutes = outH * 60 + outM;

    const totalTime = outMinutes >= inMinutes
        ? outMinutes - inMinutes
        : (1440 - inMinutes) + outMinutes;

    console.log("Total hours:", totalTime / 60);

    const totalHours = totalTime / 60;

    if (totalHours > 7.45 && totalHours <= 10) {
        salary = 500;
    } else if (totalHours > 1 && totalHours <= 7) {
        salary = 150;
    } else if (totalHours <= 1) {
        salary = 10;
    }


    console.log(salary);

    const dateStr = empDay;
    const dateObj = new Date(dateStr);

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = days[dateObj.getDay()];

    if (dayName == "Sunday") {
        salary += 500;
    }
    else {
        salary += 100;
    }

    const rsala = document.getElementById("Salary");
    rsala.innerText = `Employee:${Name} | Total Hour worked ${totalTime.toFixed(2)}| Total Salary = ${salary}`;
    console.log(salary);

}
