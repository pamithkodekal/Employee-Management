function checkOutAndCalculate() {
    const empId = document.querySelector(".EmpID").value.trim();
    const date = document.querySelector(".Date").value;
    const checkOutTime = document.querySelector(".Checkout").value;

    if (!empId || !date || !checkOutTime) {
        alert("All fields are required");
        return;
    }

    // Find employee
    let employee = employees.find(e => e.empId === empId);
    if (!employee) {
        alert("Employee not found");
        return;
    }

    // Find attendance record
    let record = employee.attendance.find(a => a.date === date);
    if (!record) {
        alert("No check-in found for this date");
        return;
    }

    if (record.checkOut) {
        alert("Check-out already done");
        return;
    }

    record.checkOut = checkOutTime;

    // ----- TIME CALCULATION -----
    const [inH, inM] = record.checkIn.split(":").map(Number);
    const [outH, outM] = checkOutTime.split(":").map(Number);

    const totalMinutes = (outH * 60 + outM) - (inH * 60 + inM);
    if (totalMinutes <= 0) {
        alert("Invalid checkout time");
        record.checkOut = null;
        return;
    }

    const hours = totalMinutes / 60;
    record.hours = hours;

    // ----- DAILY SALARY -----
    let dailySalary = 0;
    if (hours > 7.45) dailySalary = 500;
    else if (hours > 1) dailySalary = 150;
    else dailySalary = 10;

    // Sunday/weekday bonus
    dailySalary += new Date(date).getDay() === 0 ? 500 : 100;
    record.salary = dailySalary;

    // ----- MONTHLY SALARY -----
    const month = new Date(date).getMonth();
    const year = new Date(date).getFullYear();

    const workingDays = employee.attendance.filter(a => {
        const d = new Date(a.date);
        return (
            d.getMonth() === month &&
            d.getFullYear() === year &&
            a.checkIn &&
            a.checkOut
        );
    });

    // Sum all salaries for worked days
    let totalSalary = workingDays.reduce((sum, day) => sum + day.salary, 0);

    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    // Apply bonus logic
    if (workingDays.length > 24) {
        totalSalary += 1000; // +1000 for >24 days
    }
    if (workingDays.length === totalDaysInMonth) {
        totalSalary += 2000; // +2000 if worked full month
    }

    saveData();

    showResult(
        `Check-out successful ✅
Employee: ${employee.name}
Hours Worked Today: ${hours.toFixed(2)}
Total Salary This Month: ₹${totalSalary}`
    );
}
