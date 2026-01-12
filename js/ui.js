function showSalary() {
    const empId = document.querySelector(".EmpID").value;
    const date = document.querySelector(".Date").value;

    let employee = employees.find(e => e.empId === empId);
    if (!employee) {
        alert("Employee not found");
        return;
    }

    let record = employee.attendance.find(a => a.date === date);
    if (!record || !record.checkOut) {
        alert("No completed attendance found");
        return;
    }

    // Monthly calculation
    const month = new Date(date).getMonth();
    const year = new Date(date).getFullYear();

    const workingDays = employee.attendance.filter(a => {
        const d = new Date(a.date);
        return d.getMonth() === month && d.getFullYear() === year && a.checkIn && a.checkOut;
    });

    let totalSalary = workingDays.reduce((sum, day) => sum + day.salary, 0);
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    if (workingDays.length > 24) totalSalary += 1000;
    if (workingDays.length === totalDaysInMonth) totalSalary += 2000;

    document.getElementById("Salary").innerText =
        `Employee: ${employee.name}
Date: ${record.date}
Hours Worked Today: ${record.hours.toFixed(2)}
Daily Salary: ₹${record.salary}
Total Salary This Month: ₹${totalSalary}`;

let bonusNote = "";
if (workingDays.length > 24) bonusNote += "+₹1000 (Worked >24 days)\n";
if (workingDays.length === totalDaysInMonth) bonusNote += "+₹2000 (Full month)\n";


}
