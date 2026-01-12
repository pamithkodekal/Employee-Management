function checkIn() {
    const name = document.getElementById("Empname").value.trim();
    const empId = document.querySelector(".EmpID").value.trim();
    const date = document.querySelector(".Date").value;
    const checkInTime = document.querySelector(".Checkin").value;

    if (!name || !empId || !date || !checkInTime) {
        alert("All fields required");
        return;
    }

    let employee = employees.find(e => e.empId === empId);

    if (!employee) {
        employee = {
            empId: empId,
            name: name,
            attendance: []
        };
        employees.push(employee);
    }

    if (employee.attendance.some(a => a.date === date)) {
        alert("Attendance already marked");
        return;
    }

    employee.attendance.push({
        date,
        checkIn: checkInTime,
        checkOut: null,
        hours: 0,
        salary: 0
    });

    saveData();
    alert("Check-In Successful ✅");
}
